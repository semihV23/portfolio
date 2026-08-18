import os
import json
from colorthief import ColorThief

# Klasör yolları (script'in olduğu yerden projenin root'una doğru 3 kademe geri)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
IMG_DIR = os.path.join(BASE_DIR, 'public', 'img')
OUTPUT_FILE = os.path.join(BASE_DIR, 'python', 'color_extractor', 'dominant_colors.json')

def rgb_to_hex(rgb):
    """RGB tuple formatını HEX koduna çevirir"""
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])

def main():
    if not os.path.exists(IMG_DIR):
        print(f"Hata: Resim klasörü bulunamadı -> {IMG_DIR}")
        return

    colors_dict = {}
    valid_extensions = ('.jpg', '.jpeg', '.png', '.webp')

    print(f"Görseller taranıyor: {IMG_DIR}")
    
    # img klasöründeki dosyaları oku
    for filename in os.listdir(IMG_DIR):
        if filename.lower().endswith(valid_extensions):
            filepath = os.path.join(IMG_DIR, filename)
            try:
                # ColorThief ile görselin baskın rengini çıkart
                color_thief = ColorThief(filepath)
                # quality=1 en yüksek kalite/hassasiyet anlamına gelir
                dominant_color_rgb = color_thief.get_color(quality=1)
                
                # RGB'yi CSS'te kullanılabilecek HEX string'e çevir
                hex_color = rgb_to_hex(dominant_color_rgb)
                
                # Sadece görsel adını anahtar (key) olarak kaydet
                colors_dict[filename] = hex_color
                
                print(f"Başarılı: {filename} -> {hex_color}")
            except Exception as e:
                print(f"Hata: {filename} işlenemedi -> {e}")

    # Sonucu JSON olarak kaydet
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(colors_dict, f, indent=2, ensure_ascii=False)
        
    print(f"\nİşlem tamamlandı! Sonuçlar '{OUTPUT_FILE}' dosyasına kaydedildi.")

if __name__ == "__main__":
    main()