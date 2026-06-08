#!/usr/bin/env python3
"""
Replace all image assets with WebP only.

Default behavior:
- Scans src/assets and public recursively
- Converts png/jpg/jpeg/bmp/tif/tiff to .webp
- Deletes the original file after successful conversion
- Re-optimizes existing .webp files
- Uses lossless WebP by default
"""

from __future__ import annotations

import argparse
import logging
import os
import sys
import tempfile
from dataclasses import dataclass
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError as exc:
    raise SystemExit(
        "Pillow is required. Install it with: python3 -m pip install Pillow"
    ) from exc


CONVERT_EXTENSIONS = {".png", ".jpg", ".jpeg", ".bmp", ".tif", ".tiff"}
WEBP_EXTENSION = ".webp"
SUPPORTED_EXTENSIONS = CONVERT_EXTENSIONS | {WEBP_EXTENSION}


@dataclass
class RunStats:
    scanned: int = 0
    converted: int = 0
    deleted_originals: int = 0
    optimized_webp: int = 0
    skipped_webp: int = 0
    failed: int = 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Convert all images to WebP and delete original formats."
    )
    parser.add_argument(
        "--roots",
        type=Path,
        nargs="+",
        default=[Path("src/assets"), Path("public")],
        help="Folders to scan. Default: src/assets public",
    )
    parser.add_argument(
        "--allow-lossy",
        action="store_true",
        help="Use lossy WebP instead of lossless WebP.",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=92,
        help="Quality for lossy WebP. Default: 92",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would happen without changing files.",
    )
    return parser


def configure_logging() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(message)s",
        datefmt="%H:%M:%S",
    )


def format_bytes(size: int) -> str:
    units = ["B", "KB", "MB", "GB"]
    value = float(size)

    for unit in units:
        if value < 1024 or unit == units[-1]:
            return f"{value:.1f}{unit}"
        value /= 1024

    return f"{size}B"


def webp_save_kwargs(*, allow_lossy: bool, quality: int) -> dict[str, object]:
    kwargs: dict[str, object] = {
        "format": "WEBP",
        "method": 6,
        "exact": True,
    }

    if allow_lossy:
        kwargs["quality"] = quality
    else:
        kwargs["lossless"] = True
        kwargs["quality"] = 100

    return kwargs


def open_normalized_image(source: Path) -> Image.Image:
    with Image.open(source) as image:
        normalized = ImageOps.exif_transpose(image)

        if normalized.mode not in {"RGB", "RGBA"}:
            if "A" in normalized.getbands():
                normalized = normalized.convert("RGBA")
            else:
                normalized = normalized.convert("RGB")

        return normalized.copy()


def write_webp_atomic(
    source: Path,
    target: Path,
    *,
    allow_lossy: bool,
    quality: int,
) -> int:
    target.parent.mkdir(parents=True, exist_ok=True)

    with tempfile.NamedTemporaryFile(
        suffix=".webp",
        dir=target.parent,
        delete=False,
    ) as tmp:
        temp_path = Path(tmp.name)

    try:
        image = open_normalized_image(source)
        image.save(
            temp_path,
            **webp_save_kwargs(allow_lossy=allow_lossy, quality=quality),
        )

        new_size = temp_path.stat().st_size
        os.replace(temp_path, target)

        return new_size

    finally:
        temp_path.unlink(missing_ok=True)


def iter_images(roots: list[Path]) -> list[Path]:
    files: set[Path] = set()

    for root in roots:
        if not root.exists():
            logging.warning("Skipping missing root: %s", root)
            continue

        if not root.is_dir():
            logging.warning("Skipping non-directory root: %s", root)
            continue

        for path in root.rglob("*"):
            if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS:
                files.add(path)

    return sorted(files)


def convert_and_delete_original(
    path: Path,
    *,
    allow_lossy: bool,
    quality: int,
    dry_run: bool,
    stats: RunStats,
) -> None:
    target = path.with_suffix(".webp")
    before_size = path.stat().st_size

    logging.info("Converting %s -> %s", path, target)

    if dry_run:
        logging.info("Dry run: would convert and delete %s", path)
        return

    after_size = write_webp_atomic(
        path,
        target,
        allow_lossy=allow_lossy,
        quality=quality,
    )

    path.unlink()

    stats.converted += 1
    stats.deleted_originals += 1

    logging.info(
        "Converted and deleted original: %s -> %s (%s -> %s)",
        path,
        target,
        format_bytes(before_size),
        format_bytes(after_size),
    )


def optimize_existing_webp(
    path: Path,
    *,
    allow_lossy: bool,
    quality: int,
    dry_run: bool,
    stats: RunStats,
) -> None:
    before_size = path.stat().st_size

    logging.info("Optimizing existing WebP: %s", path)

    if dry_run:
        logging.info("Dry run: would optimize %s", path)
        return

    with tempfile.NamedTemporaryFile(
        suffix=".webp",
        dir=path.parent,
        delete=False,
    ) as tmp:
        temp_path = Path(tmp.name)

    try:
        image = open_normalized_image(path)
        image.save(
            temp_path,
            **webp_save_kwargs(allow_lossy=allow_lossy, quality=quality),
        )

        after_size = temp_path.stat().st_size

        if after_size >= before_size:
            stats.skipped_webp += 1
            logging.info(
                "Kept existing WebP because optimized file was not smaller: %s (%s <= %s)",
                path,
                format_bytes(before_size),
                format_bytes(after_size),
            )
            return

        os.replace(temp_path, path)
        stats.optimized_webp += 1

        logging.info(
            "Optimized WebP: %s (%s -> %s)",
            path,
            format_bytes(before_size),
            format_bytes(after_size),
        )

    finally:
        temp_path.unlink(missing_ok=True)


def process_file(path: Path, args: argparse.Namespace, stats: RunStats) -> None:
    stats.scanned += 1

    try:
        suffix = path.suffix.lower()

        if suffix in CONVERT_EXTENSIONS:
            convert_and_delete_original(
                path,
                allow_lossy=args.allow_lossy,
                quality=args.quality,
                dry_run=args.dry_run,
                stats=stats,
            )
            return

        if suffix == WEBP_EXTENSION:
            optimize_existing_webp(
                path,
                allow_lossy=args.allow_lossy,
                quality=args.quality,
                dry_run=args.dry_run,
                stats=stats,
            )
            return

    except Exception as exc:
        stats.failed += 1
        logging.exception("Failed processing %s: %s", path, exc)


def log_summary(stats: RunStats) -> None:
    logging.info("Done")
    logging.info("Scanned files: %s", stats.scanned)
    logging.info("Converted to WebP: %s", stats.converted)
    logging.info("Deleted originals: %s", stats.deleted_originals)
    logging.info("Optimized existing WebP: %s", stats.optimized_webp)
    logging.info("Skipped existing WebP: %s", stats.skipped_webp)
    logging.info("Failed files: %s", stats.failed)


def main() -> int:
    configure_logging()
    args = build_parser().parse_args()

    if args.quality < 0 or args.quality > 100:
        logging.error("--quality must be between 0 and 100")
        return 2

    roots = [root.resolve() for root in args.roots]

    logging.info("Starting WebP-only replacement")
    logging.info("Roots: %s", ", ".join(str(root) for root in roots))
    logging.info("Mode: %s", "lossy WebP" if args.allow_lossy else "lossless WebP")
    logging.info("Dry run: %s", args.dry_run)

    files = iter_images(roots)
    logging.info("Found %s image files", len(files))

    stats = RunStats()

    for file_path in files:
        process_file(file_path, args, stats)

    log_summary(stats)

    return 1 if stats.failed else 0


if __name__ == "__main__":
    sys.exit(main())