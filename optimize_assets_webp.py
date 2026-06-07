#!/usr/bin/env python3
"""
Recursively convert image assets to WebP with step-by-step logging.

Default behavior:
- Walks `src/assets` and `public` recursively
- Converts `.png`, `.jpg`, `.jpeg`, `.bmp`, `.tif`, `.tiff` into `.webp`
- Re-optimizes existing `.webp` files
- Preserves source files unless `--delete-originals` is passed
- Uses lossless WebP by default
- Only keeps generated/optimized WebP files when they are smaller

Examples:
  python3 optimize_assets_webp.py
  python3 optimize_assets_webp.py --roots src/assets public
  python3 optimize_assets_webp.py --delete-originals
  python3 optimize_assets_webp.py --allow-lossy --quality 92
  python3 optimize_assets_webp.py --dry-run
"""

from __future__ import annotations

import argparse
import logging
import shutil
import sys
import tempfile
from dataclasses import dataclass
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError as exc:
    raise SystemExit(
        "Pillow is required. Install it with `python3 -m pip install Pillow`."
    ) from exc


SUPPORTED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".bmp", ".tif", ".tiff", ".webp"}


@dataclass
class RunStats:
    scanned: int = 0
    eligible: int = 0
    converted: int = 0
    optimized: int = 0
    skipped: int = 0
    failed: int = 0
    bytes_before: int = 0
    bytes_after: int = 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Convert and optimize images into WebP."
    )
    parser.add_argument(
        "--roots",
        type=Path,
        nargs="+",
        default=[Path("src/assets"), Path("public")],
        help="Root directories to scan recursively. Default: src/assets public",
    )
    parser.add_argument(
        "--delete-originals",
        action="store_true",
        help="Delete original non-WebP files after successful conversion.",
    )
    parser.add_argument(
        "--allow-lossy",
        action="store_true",
        help="Use lossy WebP for stronger compression. Default is lossless.",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=92,
        help="Lossy WebP quality when --allow-lossy is enabled. Default: 92",
    )
    parser.add_argument(
        "--min-bytes-saved",
        type=int,
        default=1,
        help="Only replace/create WebP when it saves at least this many bytes. Default: 1",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Log planned work without writing any files.",
    )
    return parser


def configure_logging() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(message)s",
        datefmt="%H:%M:%S",
    )


def format_bytes(num_bytes: int) -> str:
    units = ["B", "KB", "MB", "GB"]
    size = float(num_bytes)

    for unit in units:
        if size < 1024 or unit == units[-1]:
            return f"{size:.1f}{unit}"
        size /= 1024

    return f"{num_bytes}B"


def iter_image_files(roots: list[Path]) -> list[Path]:
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


def write_webp(source: Path, target: Path, *, allow_lossy: bool, quality: int) -> None:
    image = open_normalized_image(source)
    target.parent.mkdir(parents=True, exist_ok=True)
    image.save(target, **webp_save_kwargs(allow_lossy=allow_lossy, quality=quality))


def write_temp_webp(source: Path, *, allow_lossy: bool, quality: int) -> Path:
    with tempfile.NamedTemporaryFile(suffix=".webp", delete=False) as tmp:
        temp_path = Path(tmp.name)

    write_webp(source, temp_path, allow_lossy=allow_lossy, quality=quality)
    return temp_path


def process_existing_webp(
    path: Path,
    *,
    allow_lossy: bool,
    quality: int,
    min_bytes_saved: int,
    dry_run: bool,
    stats: RunStats,
) -> None:
    stats.eligible += 1

    before_size = path.stat().st_size
    stats.bytes_before += before_size

    logging.info("Optimizing existing WebP: %s", path)

    if dry_run:
        stats.skipped += 1
        stats.bytes_after += before_size
        logging.info("Dry run: would optimize %s", path)
        return

    temp_path: Path | None = None

    try:
        temp_path = write_temp_webp(path, allow_lossy=allow_lossy, quality=quality)
        after_size = temp_path.stat().st_size
        savings = before_size - after_size

        if savings < min_bytes_saved:
            stats.skipped += 1
            stats.bytes_after += before_size
            logging.info(
                "Keeping existing file: %s (current=%s, new=%s, saved=%s)",
                path,
                format_bytes(before_size),
                format_bytes(after_size),
                format_bytes(savings),
            )
            return

        shutil.move(str(temp_path), str(path))
        stats.optimized += 1
        stats.bytes_after += after_size

        logging.info(
            "Optimized %s (%s -> %s, saved %s)",
            path,
            format_bytes(before_size),
            format_bytes(after_size),
            format_bytes(savings),
        )

    finally:
        if temp_path is not None:
            temp_path.unlink(missing_ok=True)


def process_convertible(
    path: Path,
    *,
    delete_originals: bool,
    allow_lossy: bool,
    quality: int,
    min_bytes_saved: int,
    dry_run: bool,
    stats: RunStats,
) -> None:
    stats.eligible += 1

    before_size = path.stat().st_size
    stats.bytes_before += before_size

    target = path.with_suffix(".webp")

    logging.info("Converting %s -> %s", path, target)

    if dry_run:
        stats.skipped += 1
        stats.bytes_after += before_size
        logging.info("Dry run: would convert %s", path)
        return

    temp_path: Path | None = None

    try:
        temp_path = write_temp_webp(path, allow_lossy=allow_lossy, quality=quality)
        new_size = temp_path.stat().st_size

        compare_size = target.stat().st_size if target.exists() else before_size
        savings = compare_size - new_size

        if savings < min_bytes_saved:
            stats.skipped += 1
            stats.bytes_after += compare_size
            logging.info(
                "Skipping %s because WebP is not smaller enough (compare=%s, new=%s, saved=%s)",
                path,
                format_bytes(compare_size),
                format_bytes(new_size),
                format_bytes(savings),
            )
            return

        shutil.move(str(temp_path), str(target))
        stats.converted += 1
        stats.bytes_after += new_size

        logging.info(
            "Wrote %s (%s -> %s, saved %s)",
            target,
            format_bytes(compare_size),
            format_bytes(new_size),
            format_bytes(savings),
        )

        if delete_originals:
            path.unlink()
            logging.info("Deleted original %s", path)

    finally:
        if temp_path is not None:
            temp_path.unlink(missing_ok=True)


def process_file(path: Path, args: argparse.Namespace, stats: RunStats) -> None:
    stats.scanned += 1

    try:
        if path.suffix.lower() == ".webp":
            process_existing_webp(
                path,
                allow_lossy=args.allow_lossy,
                quality=args.quality,
                min_bytes_saved=args.min_bytes_saved,
                dry_run=args.dry_run,
                stats=stats,
            )
        else:
            process_convertible(
                path,
                delete_originals=args.delete_originals,
                allow_lossy=args.allow_lossy,
                quality=args.quality,
                min_bytes_saved=args.min_bytes_saved,
                dry_run=args.dry_run,
                stats=stats,
            )

    except Exception as exc:
        stats.failed += 1
        logging.exception("Failed processing %s: %s", path, exc)


def log_summary(stats: RunStats) -> None:
    delta = stats.bytes_before - stats.bytes_after

    logging.info("Completed asset optimization")
    logging.info("Scanned files: %s", stats.scanned)
    logging.info("Eligible images: %s", stats.eligible)
    logging.info("Converted files: %s", stats.converted)
    logging.info("Optimized existing WebP: %s", stats.optimized)
    logging.info("Skipped files: %s", stats.skipped)
    logging.info("Failed files: %s", stats.failed)
    logging.info("Bytes before: %s", format_bytes(stats.bytes_before))
    logging.info("Bytes after: %s", format_bytes(stats.bytes_after))
    logging.info("Net savings: %s", format_bytes(delta))


def main() -> int:
    configure_logging()
    args = build_parser().parse_args()

    if args.quality < 0 or args.quality > 100:
        logging.error("--quality must be between 0 and 100")
        return 2

    roots = [root.resolve() for root in args.roots]

    logging.info("Starting recursive asset optimization")
    logging.info("Roots: %s", ", ".join(str(root) for root in roots))
    logging.info("Mode: %s", "lossy WebP" if args.allow_lossy else "lossless WebP")
    logging.info("Delete originals: %s", args.delete_originals)
    logging.info("Dry run: %s", args.dry_run)

    files = iter_image_files(roots)
    logging.info("Discovered %s supported image files", len(files))

    stats = RunStats()

    for file_path in files:
        process_file(file_path, args, stats)

    log_summary(stats)

    return 1 if stats.failed else 0


if __name__ == "__main__":
    sys.exit(main())