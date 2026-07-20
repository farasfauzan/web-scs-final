import urllib.request
import http.cookiejar
import json
import sys

BASE_URL = 'http://localhost:3000/api'

# Setup CookieJar untuk mempertahankan sesi (Session persistence)
cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))

def api_request(endpoint: str, method: str = 'GET', payload: dict = None) -> dict:
    """
    Fungsi helper sentral untuk melakukan HTTP request.
    Mengurus header, parsing JSON, dan error handling dasar.
    """
    url = f"{BASE_URL}{endpoint}"
    data = json.dumps(payload).encode('utf-8') if payload else None
    headers = {'Content-Type': 'application/json'} if payload else {}
    
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    
    try:
        response = opener.open(req)
        # Jika ada respon konten, coba parse sebagai JSON
        if response.length and response.length > 0:
            return json.loads(response.read().decode('utf-8'))
        return {}
    except Exception as e:
        print(f"❌ Error API [{method}] {endpoint}: {e}")
        sys.exit(1)

def main():
    # 1. Autentikasi
    print("Mengautentikasi admin...")
    api_request('/auth/login', method='POST', payload={'username': 'admin', 'password': 'admin123'})

    # 2. Hapus Data Lama
    print("Menghapus data feedback lama...")
    api_request('/chatbot/feedback?all=true', method='DELETE')

    # 3. Data Injeksi (Seeding)
    feedbacks = [
        {'type': 'emoji_rating', 'detail': '\U0001f44e'}, # 👎
        {'type': 'negative_suggestion', 'detail': 'jawaban chatbot terlalu panjang, mohon diringkas'},
        {'type': 'emoji_rating', 'detail': '\U0001f44e'}, # 👎
        {'type': 'negative_suggestion', 'detail': 'sertifikasi perusahaan tidak disebutkan'},
        {'type': 'negative_suggestion', 'detail': 'lokasi kantor perlu ditambahkan di profil'},
        {'type': 'negative_suggestion', 'detail': 'informasi tentang proyek kurang detail'},
    ]

    print(f"Menginjeksi {len(feedbacks)} data negative feedback...")
    for fb in feedbacks:
        api_request('/chatbot/feedback', method='POST', payload=fb)

    # 4. Verifikasi Hasil
    print("\nMelakukan verifikasi data...")
    result = api_request('/chatbot/feedback')
    items = result.get('evaluations', [])
    
    print(f"Total di API: {len(items)} entri")
    for item in items:
        detail_clean = item['detail'].encode('utf-8', errors='replace').decode('utf-8')
        print(f"  → ID:{item['id']} | Type: {item['type']} | Detail: {detail_clean}")

    # 5. Validasi Filter Negatif
    negative_only = [e for e in items if e['type'] == 'negative_suggestion' or (e['type'] == 'emoji_rating' and e['detail'] == '\U0001f44e')]
    if len(negative_only) == len(items):
        print("\n✅ Verifikasi Sukses: Semua data ter-seed adalah feedback negatif.")
    else:
        print("\n⚠️ PERINGATAN: Filter gagal! Ditemukan data positif.")

if __name__ == '__main__':
    main()