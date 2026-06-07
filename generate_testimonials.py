from __future__ import annotations

import argparse
import random
import shutil
from dataclasses import dataclass
from pathlib import Path


ASSET_DIR = Path("src/assets/testimonials")
GENERATED_DIR = ASSET_DIR / "generated"
OUTPUT_TS_FILE = Path("src/constants/testimonials.const.ts")

SUPPORTED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}


@dataclass(frozen=True)
class TestimonialImage:
    source_path: Path
    source: str


def get_testimonial_source(path: Path) -> str:
    """
    Classify testimonials from the filename.

    Any file containing 'whop_' is treated as Whop.
    Everything else is treated as Discord.
    """
    normalized_name = path.name.strip().lower()

    if "whop_" in normalized_name:
        return "Whop"

    return "Discord"


def collect_testimonial_images() -> list[TestimonialImage]:
    if not ASSET_DIR.exists():
        raise FileNotFoundError(f"Missing testimonials directory: {ASSET_DIR}")

    images: list[TestimonialImage] = []

    for path in ASSET_DIR.iterdir():
        if path.is_dir():
            continue

        if path.suffix.lower() not in SUPPORTED_EXTENSIONS:
            continue

        images.append(
            TestimonialImage(
                source_path=path,
                source=get_testimonial_source(path),
            )
        )

    if not images:
        raise RuntimeError(f"No testimonial images found in {ASSET_DIR}")

    return images


def prepare_generated_directory() -> None:
    GENERATED_DIR.mkdir(parents=True, exist_ok=True)

    for path in GENERATED_DIR.iterdir():
        if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS:
            path.unlink()


def copy_randomized_images(
    images: list[TestimonialImage],
) -> list[tuple[TestimonialImage, Path]]:
    prepare_generated_directory()

    total = len(images)
    number_width = max(2, len(str(total)))

    generated: list[tuple[TestimonialImage, Path]] = []

    for index, image in enumerate(images, start=1):
        source_slug = image.source.lower()
        extension = image.source_path.suffix.lower()
        output_name = f"{index:0{number_width}d}_{source_slug}{extension}"
        output_path = GENERATED_DIR / output_name

        shutil.copy2(image.source_path, output_path)
        generated.append((image, output_path))

    return generated


def to_import_name(index: int) -> str:
    return f"testimonial{index:03d}"


def build_typescript_content(
    generated_images: list[tuple[TestimonialImage, Path]],
) -> str:
    lines: list[str] = []

    lines.append('import type { Testimonial } from "@/types/testimonial";')

    for index, (_, generated_path) in enumerate(generated_images, start=1):
        import_name = to_import_name(index)
        import_path = generated_path.as_posix().replace("src/", "@/")
        lines.append(f'import {import_name} from "{import_path}";')

    lines.append("")
    lines.append("export const TESTIMONIALS: Testimonial[] = [")

    for index, (image, _) in enumerate(generated_images, start=1):
        import_name = to_import_name(index)
        source = image.source

        alt = (
            "AmasPFT Whop testimonial screenshot from a trading community member"
            if source == "Whop"
            else "AmasPFT Discord testimonial screenshot from a trading community member"
        )

        lines.append("  {")
        lines.append(f'    id: "testimonial-{index:03d}",')
        lines.append(f'    source: "{source}",')
        lines.append(f"    imageSrc: {import_name},")
        lines.append(f'    alt: "{alt}",')
        lines.append("  },")

    lines.append("];")
    lines.append("")

    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Randomize AmasPFT testimonial images and generate the TypeScript constant."
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
        help="Write directly to src/constants/testimonials.const.ts instead of only printing.",
    )

    args = parser.parse_args()

    images = collect_testimonial_images()

    rng = random.Random(args.seed)
    rng.shuffle(images)

    generated_images = copy_randomized_images(images)
    typescript_content = build_typescript_content(generated_images)

    print("\nGenerated testimonial images:")
    for index, (image, generated_path) in enumerate(generated_images, start=1):
        print(f"{index:02d}. {image.source:<7} {image.source_path.name} -> {generated_path}")

    print("\nTypeScript content:\n")
    print(typescript_content)

    if args.write:
        OUTPUT_TS_FILE.write_text(typescript_content, encoding="utf-8")
        print(f"\nUpdated {OUTPUT_TS_FILE}")


if __name__ == "__main__":
    main()
