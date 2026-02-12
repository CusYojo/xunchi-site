#!/usr/bin/env python3
"""
Upload product images to Cloudflare R2
Preserves directory structure from assets/img/products/
"""

import os
import sys
import boto3
from pathlib import Path
from botocore.client import Config

# R2 Configuration
ACCOUNT_ID = "9a17635b931e5c17043064352cba4121"  # Cloudflare Account ID
ACCESS_KEY_ID = "cd8c1b6162eff441f77b280e5d2c7bbf"
SECRET_ACCESS_KEY = "64f5644134c09e0e9b1c9c34c1635770993389112fd590948dc7f8e7baa41cee"
BUCKET_NAME = "xunchi-image"
ENDPOINT_URL = f"https://{ACCOUNT_ID}.r2.cloudflarestorage.com"

# Local paths
LOCAL_IMAGE_DIR = Path("assets/img/products")
BASE_PREFIX = "assets/img/products"  # Preserve this path structure in R2


def create_r2_client():
    """Create and return an S3-compatible client for R2"""
    return boto3.client(
        "s3",
        endpoint_url=ENDPOINT_URL,
        aws_access_key_id=ACCESS_KEY_ID,
        aws_secret_access_key=SECRET_ACCESS_KEY,
        config=Config(signature_version="s3v4"),
        region_name="auto",  # R2 uses 'auto' region
    )


def upload_images(dry_run=False):
    """Upload all images to R2 preserving directory structure"""

    if ACCOUNT_ID == "YOUR_ACCOUNT_ID_HERE":
        print("ERROR: Please set your Cloudflare Account ID in the script")
        sys.exit(1)

    if not LOCAL_IMAGE_DIR.exists():
        print(f"ERROR: Directory {LOCAL_IMAGE_DIR} not found")
        sys.exit(1)

    # Create R2 client
    try:
        s3 = create_r2_client()
        print(f"✓ Connected to R2 bucket: {BUCKET_NAME}")
    except Exception as e:
        print(f"✗ Failed to connect to R2: {e}")
        sys.exit(1)

    # Find all image files
    image_extensions = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
    image_files = []

    for ext in image_extensions:
        image_files.extend(LOCAL_IMAGE_DIR.rglob(f"*{ext}"))
        image_files.extend(LOCAL_IMAGE_DIR.rglob(f"*{ext.upper()}"))

    print(f"\n✓ Found {len(image_files)} images to upload")

    # Upload each file
    uploaded = 0
    failed = 0
    skipped = 0

    for local_path in sorted(image_files):
        # Calculate R2 key (preserve directory structure)
        relative_path = local_path.relative_to(LOCAL_IMAGE_DIR.parent.parent)
        r2_key = str(relative_path).replace("\\", "/")  # Ensure forward slashes

        print(f"\n  {relative_path}")

        if dry_run:
            print(f"    [DRY RUN] Would upload to: {r2_key}")
            skipped += 1
            continue

        try:
            # Check if file already exists
            try:
                s3.head_object(Bucket=BUCKET_NAME, Key=r2_key)
                print(f"    ⊘ Already exists, skipping")
                skipped += 1
                continue
            except:
                pass  # File doesn't exist, proceed with upload

            # Upload with proper content type
            content_type = get_content_type(local_path.suffix.lower())

            s3.upload_file(
                str(local_path),
                BUCKET_NAME,
                r2_key,
                ExtraArgs={
                    "ContentType": content_type,
                    "CacheControl": "public, max-age=31536000",  # Cache for 1 year
                },
            )

            print(f"    ✓ Uploaded ({local_path.stat().st_size / 1024:.1f} KB)")
            uploaded += 1

        except Exception as e:
            print(f"    ✗ Failed: {e}")
            failed += 1

    # Summary
    print(f"\n{'=' * 60}")
    print(f"Upload Summary:")
    print(f"  Uploaded: {uploaded}")
    print(f"  Skipped:  {skipped}")
    print(f"  Failed:   {failed}")
    print(f"  Total:    {len(image_files)}")
    print(f"{'=' * 60}\n")

    if dry_run:
        print("This was a DRY RUN. Run with --upload to actually upload files.")

    return uploaded, skipped, failed


def get_content_type(extension):
    """Return proper MIME type for image extension"""
    types = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".webp": "image/webp",
    }
    return types.get(extension, "application/octet-stream")


def verify_upload():
    """Verify a random sample of uploaded images"""
    s3 = create_r2_client()

    print("\nVerifying uploads...")

    try:
        # List some objects to verify
        response = s3.list_objects_v2(
            Bucket=BUCKET_NAME, Prefix=BASE_PREFIX, MaxKeys=10
        )

        if "Contents" in response:
            print(f"✓ Found {len(response['Contents'])} objects in bucket")
            for obj in response["Contents"][:5]:
                print(f"  - {obj['Key']} ({obj['Size']} bytes)")
        else:
            print("✗ No objects found in bucket")

    except Exception as e:
        print(f"✗ Verification failed: {e}")


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Upload images to Cloudflare R2")
    parser.add_argument(
        "--upload",
        action="store_true",
        help="Actually upload files (default is dry-run)",
    )
    parser.add_argument("--verify", action="store_true", help="Verify uploaded files")

    args = parser.parse_args()

    if args.verify:
        verify_upload()
    else:
        dry_run = not args.upload
        upload_images(dry_run=dry_run)
