from __future__ import annotations

import argparse
import random
import shutil
from dataclasses import dataclass
from pathlib import Path


PAYOUT_DIR = Path("src/assets/payouts")
OUTPUT_TS_FILE = Path("src/constants/payouts.const.ts")

SUPPORTED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}

PRESERVED_FILES = {
    "lifetime.webp",
    "list_pays.webp",
}

AMOUNT_BY_ORIGINAL_STEM = {
    "pay1": "$12,000",
    "pay1_live": "$860",
    "pay2": "$15,000",
    "pay2_live": "$2,300",
    "pay3": "$15,000",
    "pay3_liv": "$1,390",
    "pay4": "$10,467",
    "pay5": "$3,000",
    "pay6": "$3,000",
    "pay7": "$12,445",
    "pay8": "$9,444",
}


@dataclass(frozen=True)
class PayoutImage:
    source_path: Path
    payout_type: str
    amount: str


def is_generated_payout(path: Path) -> bool:
    stem = path.stem.lower()
    parts = stem.split("_")

    if len(parts) != 2:
        return False

    number, payout_type = parts

    return number.isdigit() and payout_type in {"live", "prop"}


def is_payout_source_file(path: Path) -> bool:
    if path.is_dir():
        return False

    if path.suffix.lower() not in SUPPORTED_EXTENSIONS:
        return False

    if path.name in PRESERVED_FILES:
        return False

    if is_generated_payout(path):
        return False

    return path.stem.lower().startswith("pay")


def get_payout_type(path: Path) -> str:
    normalized_stem = path.stem.lower()

    if "live" in normalized_stem or "liv" in normalized_stem:
        return "live"

    return "prop"


def get_payout_label(payout_type: str) -> str:
    return "Live" if payout_type == "live" else "Prop Firm"


def get_amount(path: Path) -> str:
    return AMOUNT_BY_ORIGINAL_STEM.get(path.stem.lower(), "$TODO")


def collect_payout_images() -> list[PayoutImage]:
    if not PAYOUT_DIR.exists():
        raise FileNotFoundError(f"Missing payout directory: {PAYOUT_DIR}")

    payouts: list[PayoutImage] = []

    for path in PAYOUT_DIR.iterdir():
        if not is_payout_source_file(path):
            continue

        payout_type = get_payout_type(path)

        payouts.append(
            PayoutImage(
                source_path=path,
                payout_type=payout_type,
                amount=get_amount(path),
            )
        )

    if not payouts:
        raise RuntimeError(
            f"No payout source images found in {PAYOUT_DIR}. "
            "Expected files like pay1.webp, pay1_live.webp, pay2.webp, etc."
        )

    return payouts


def cleanup_old_generated_files() -> None:
    for path in PAYOUT_DIR.iterdir():
        if path.is_file() and is_generated_payout(path):
            path.unlink()


def rewrite_payout_files(payouts: list[PayoutImage]) -> list[tuple[PayoutImage, Path]]:
    temp_dir = PAYOUT_DIR / ".payout_tmp"

    if temp_dir.exists():
        shutil.rmtree(temp_dir)

    temp_dir.mkdir(parents=True)

    generated: list[tuple[PayoutImage, Path]] = []
    number_width = max(2, len(str(len(payouts))))

    try:
        for index, payout in enumerate(payouts, start=1):
            extension = payout.source_path.suffix.lower()
            output_name = f"{index:0{number_width}d}_{payout.payout_type}{extension}"
            temp_output_path = temp_dir / output_name

            shutil.copy2(payout.source_path, temp_output_path)
            generated.append((payout, PAYOUT_DIR / output_name))

        for payout in payouts:
            payout.source_path.unlink()

        cleanup_old_generated_files()

        for temp_file in temp_dir.iterdir():
            shutil.copy2(temp_file, PAYOUT_DIR / temp_file.name)

    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)

    return generated


def to_import_name(index: int) -> str:
    return f"payout{index:03d}"


def build_alt_text(payout: PayoutImage) -> str:
    label = get_payout_label(payout.payout_type)

    return f"AmasPFT {label} screenshot showing a {payout.amount} withdrawal"


def build_typescript_content(generated_payouts: list[tuple[PayoutImage, Path]]) -> str:
    lines: list[str] = []

    lines.append('import type { Payout } from "@/types/payout";')

    for index, (_, generated_path) in enumerate(generated_payouts, start=1):
        import_name = to_import_name(index)
        import_path = generated_path.as_posix().replace("src/", "@/")
        lines.append(f'import {import_name} from "{import_path}";')

    lines.append("")
    lines.append("export const PAYOUTS: Payout[] = [")

    for index, (payout, _) in enumerate(generated_payouts, start=1):
        import_name = to_import_name(index)

        lines.append("  {")
        lines.append(f'    id: "payout-{index:03d}",')
        lines.append(f'    amount: "{payout.amount}",')
        lines.append(f"    imageSrc: {import_name},")
        lines.append(f'    alt: "{build_alt_text(payout)}",')

        if payout.payout_type == "live":
            lines.append("    live: true,")

        lines.append("  },")

    lines.append("];")
    lines.append("")

    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Randomize AmasPFT payout images and generate the TypeScript constant."
    )

    parser.add_argument(
        "--seed",
        type=int,
        default=None,
        help="Optional seed for repeatable random order.",
    )

    parser.add_argument(
        "--write",
        action="store_true",
        help="Write directly to src/constants/payouts.const.ts instead of only printing.",
    )

    args = parser.parse_args()

    payouts = collect_payout_images()

    rng = random.Random(args.seed)
    rng.shuffle(payouts)

    generated_payouts = rewrite_payout_files(payouts)
    typescript_content = build_typescript_content(generated_payouts)

    print("\nGenerated payout images:")

    for index, (payout, generated_path) in enumerate(generated_payouts, start=1):
        label = get_payout_label(payout.payout_type)

        print(
            f"{index:02d}. {label:<9} "
            f"{payout.amount:<8} "
            f"{payout.source_path.name} -> {generated_path.name}"
        )

    print("\nTypeScript content:\n")
    print(typescript_content)

    if args.write:
        OUTPUT_TS_FILE.write_text(typescript_content, encoding="utf-8")
        print(f"\nUpdated {OUTPUT_TS_FILE}")


if __name__ == "__main__":
    main()
