import os
import shutil
import json
import hashlib

# Source and Destination
SOURCE_DIR = "/Users/wangyujie/Desktop/花型"
DEST_BASE_DIR = "/Users/wangyujie/Desktop/xctextile/assets/img/products"
PROJECT_ROOT = "/Users/wangyujie/Desktop/xctextile"
GALLERY_JS_PATH = os.path.join(PROJECT_ROOT, "gallery.js")

# Category Mapping
CATEGORY_MAP = {
    "双层毯": "double-ply",
    "舒棉绒": "sherpa",
    "舒棉绒毯子": "sherpa",
    "法兰绒": "flannel",
    "法兰绒毯子": "flannel",
    "珊瑚绒": "coral-fleece",
    "珊瑚绒毯子": "coral-fleece",
    "数码毯": "digital-printing",
    "摇粒绒": "polar-fleece",
    "双面绒": "fleece",
    "野餐垫": "picnic",
    "浴巾": "bath-towel",
    "口罩": "face-mask",
    "电视毯": "tv-blanket",
    "缝制毯": "sewn-blanket",
    "围裙": "apron",
    "靠垫": "cushion",
    "披肩": "shawl",
    "发光毯": "glow-in-the-dark",
    "夜光毯": "glow-in-the-dark",
    "泡泡绒": "bubble-fleece",
    "提花羊羔绒": "jacquard-sherpa",
    "提花摇粒绒": "jacquard-polar-fleece",
    "复合毯": "composite-blanket",
}


def clean_filename(filename):
    """Generates a clean, safe filename."""
    name, ext = os.path.splitext(filename)
    # Use MD5 of the original filename for uniqueness and safety, keeping the extension
    hash_object = hashlib.md5(filename.encode())
    return f"{hash_object.hexdigest()}{ext.lower()}"


def main():
    gallery_data = []

    if not os.path.exists(SOURCE_DIR):
        print(f"Error: Source directory {SOURCE_DIR} does not exist.")
        return

    # Iterate over years
    for item in os.listdir(SOURCE_DIR):
        if not item.endswith("年花型"):
            continue

        try:
            year = int(item.replace("年花型", ""))
        except ValueError:
            print(f"Skipping invalid year directory: {item}")
            continue

        year_path = os.path.join(SOURCE_DIR, item)
        if not os.path.isdir(year_path):
            continue

        print(f"Processing Year: {year}")

        # Iterate over categories in that year
        for cat_name_cn in os.listdir(year_path):
            if cat_name_cn.startswith("."):
                continue

            cat_path = os.path.join(year_path, cat_name_cn)
            if not os.path.isdir(cat_path):
                continue

            # Determine English Category ID
            cat_id = CATEGORY_MAP.get(cat_name_cn, "others")
            if cat_id == "others":
                print(f"  Warning: Unmapped category '{cat_name_cn}', using 'others'")

            # Prepare Destination Directory
            dest_dir = os.path.join(DEST_BASE_DIR, str(year), cat_id)
            os.makedirs(dest_dir, exist_ok=True)

            # Process Images
            for img_file in os.listdir(cat_path):
                if img_file.startswith(".") or not img_file.lower().endswith(
                    (".jpg", ".jpeg", ".png", ".webp")
                ):
                    continue

                src_file_path = os.path.join(cat_path, img_file)
                new_filename = clean_filename(img_file)
                dest_file_path = os.path.join(dest_dir, new_filename)

                # Copy file
                shutil.copy2(src_file_path, dest_file_path)

                # Add to Gallery Data
                # Path relative to project root (Assumed served from root)
                rel_path = os.path.join(
                    "assets/img/products", str(year), cat_id, new_filename
                )

                gallery_item = {
                    "src": rel_path,
                    "title": img_file,  # Keep original filename as title for now
                    "category": cat_id,
                    "year": year,
                }
                gallery_data.append(gallery_item)
                # print(f"    Copied {img_file} -> {rel_path}")

    # Write gallery.js
    js_content = f"window.__GALLERY__ = {json.dumps(gallery_data, indent=2, ensure_ascii=False)};"
    with open(GALLERY_JS_PATH, "w") as f:
        f.write(js_content)

    print(f"Successfully generated gallery.js with {len(gallery_data)} items.")


if __name__ == "__main__":
    main()
