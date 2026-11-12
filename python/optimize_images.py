import os
import re
import json
import shutil
from PIL import Image, ImageOps

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(BASE_DIR, 'public', 'img')
BACKUP_DIR = os.path.join(BASE_DIR, 'public', 'img_backup')
ORDER_FILE = os.path.join(BASE_DIR, 'public', 'order.json')

TURKISH_MAP = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ı': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u',
}

def slugify(text):
    for tr, en in TURKISH_MAP.items():
        text = text.replace(tr, en)
    text = text.strip()
    text = re.sub(r'\s+', '-', text)
    return text.lower()

def optimize_images():
    os.makedirs(BACKUP_DIR, exist_ok=True)

    with open(ORDER_FILE, 'r', encoding='utf-8') as f:
        order_list = json.load(f)

    new_order_list = []

    files_in_dir = os.listdir(IMG_DIR)

    for old_name in order_list:
        name_part, ext = os.path.splitext(old_name)
        new_name = slugify(name_part) + '.webp'
        new_order_list.append(new_name)

        old_path = os.path.join(IMG_DIR, old_name)
        new_path = os.path.join(IMG_DIR, new_name)
        backup_path = os.path.join(BACKUP_DIR, old_name)

        if not os.path.exists(old_path):
            matched = False
            for f in files_in_dir:
                if f.lower() == old_name.lower():
                    old_path = os.path.join(IMG_DIR, f)
                    matched = True
                    break
            if not matched:
                print(f"Uyarı: {old_name} bulunamadı!")
                continue

        # Görseli aç, optimize et
        with Image.open(old_path) as img:
            try:
                img = ImageOps.exif_transpose(img)
            except Exception:
                pass

            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')

            # iOS WebKit bellek optimizasyonu için max kenar 1280px
            max_size = 1280
            w, h = img.size
            if max(w, h) > max_size:
                if w > h:
                    new_w = max_size
                    new_h = int(h * (max_size / w))
                else:
                    new_h = max_size
                    new_w = int(w * (max_size / h))
                img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)

            temp_output = new_path + '.tmp'
            img.save(temp_output, 'WEBP', quality=82, method=6)

        # Orijinal dosyayı silmek yerine backup klasörüne taşıyoruz
        shutil.move(old_path, backup_path)
        shutil.move(temp_output, new_path)
        print(f"Optimize edildi: {old_name} -> {new_name}")

    with open(ORDER_FILE, 'w', encoding='utf-8') as f:
        json.dump(new_order_list, f, ensure_ascii=False, indent=2)

    print("\nTüm fotoğraflar WebP formatına çevrildi ve optimize edildi!")

if __name__ == '__main__':
    optimize_images()
