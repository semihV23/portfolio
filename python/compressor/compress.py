import os
import subprocess

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ORIGINAL_DIR = os.path.join(BASE_DIR, 'original')
COMPRESSED_DIR = os.path.join(BASE_DIR, 'compressed')

def compress_images():
    valid_extensions = ('.jpg', '.jpeg', '.png', '.webp')
    
    # Klasörlerin var olduğundan emin ol
    os.makedirs(ORIGINAL_DIR, exist_ok=True)
    os.makedirs(COMPRESSED_DIR, exist_ok=True)

    files = [f for f in os.listdir(ORIGINAL_DIR) if f.lower().endswith(valid_extensions)]
    
    if not files:
        print(f"Bilgi: '{ORIGINAL_DIR}' klasöründe işlenecek görsel bulunamadı.")
        print("Lütfen orijinal fotoğrafları bu klasöre koyup tekrar çalıştırın.")
        return

    print(f"Toplam {len(files)} görsel sıkıştırılacak...\n")

    for filename in files:
        name, ext = os.path.splitext(filename)
        input_path = os.path.join(ORIGINAL_DIR, filename)
        output_filename = f"{name}_c{ext}"
        output_path = os.path.join(COMPRESSED_DIR, output_filename)
        
        # FFMPEG komutu
        # -vf scale='min(1920,iw)':-1 -> Genişliği maksimum 1920px yapar, küçükse orijinal bırakır. Orantıyı korur.
        # -q:v 5 -> Kalite ayarı (1-31 arasıdır, 2-5 web için çok idealdir, boyut oldukça düşer).
        cmd = [
            'ffmpeg', '-y', '-i', input_path,
            '-vf', "scale='min(1920,iw)':-1",
            '-q:v', '5',
            output_path
        ]
        
        try:
            print(f"Sıkıştırılıyor: {filename} -> {output_filename}")
            # subprocess.run ile FFmpeg'i çağır, konsolu kirletmemek için çıktıları gizle
            subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        except FileNotFoundError:
            print("\nHATA: FFmpeg bilgisayarınızda yüklü değil veya PATH'e eklenmemiş!")
            print("Lütfen FFmpeg yükleyin: https://ffmpeg.org/download.html")
            break
        except subprocess.CalledProcessError as e:
            print(f"HATA: {filename} sıkıştırılırken bir sorun oluştu.")

    print("\nİşlem tamamlandı! Sıkıştırılmış fotoğrafları 'compressed' klasöründe bulabilirsiniz.")

if __name__ == '__main__':
    compress_images()