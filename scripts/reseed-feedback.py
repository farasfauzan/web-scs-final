import urllib.request
import http.cookiejar
import json

cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))

# Login
login_data = json.dumps({'username': 'admin', 'password': 'admin123'}).encode('utf-8')
req = urllib.request.Request('http://localhost:3000/api/auth/login', data=login_data, headers={'Content-Type': 'application/json'})
opener.open(req)

# Delete all old data
req_del = urllib.request.Request('http://localhost:3000/api/chatbot/feedback?all=true', method='DELETE')
opener.open(req_del)
print('Deleted all old data')

# Seed ONLY negative feedback
# Using unicode escapes ensures correct encoding
feedbacks = [
    ('emoji_rating', '\U0001f44e'),           # 👎
    ('negative_suggestion', 'jawaban chatbot terlalu panjang, mohon diringkas'),
    ('emoji_rating', '\U0001f44e'),           # 👎
    ('negative_suggestion', 'sertifikasi perusahaan tidak disebutkan'),
    ('negative_suggestion', 'lokasi kantor perlu ditambahkan di profil'),
    ('negative_suggestion', 'informasi tentang proyek kurang detail'),
]

for ftype, fdetail in feedbacks:
    data = json.dumps({'type': ftype, 'detail': fdetail}).encode('utf-8')
    req = urllib.request.Request(
        'http://localhost:3000/api/chatbot/feedback',
        data=data,
        headers={'Content-Type': 'application/json'}
    )
    opener.open(req)

print(f'Seeded {len(feedbacks)} negative feedback entries')

# Verify
req_get = urllib.request.Request('http://localhost:3000/api/chatbot/feedback')
resp = opener.open(req_get)
d = json.loads(resp.read().decode('utf-8'))
items = d.get('evaluations', [])

print(f'\nTotal in API: {len(items)} entries')
for e in items:
    detail_clean = e['detail'].encode('utf-8', errors='replace')
    print(f'  ID:{e["id"]} type:{e["type"]}')

# Verify filter logic
negative_only = [
    e for e in items
    if e['type'] == 'negative_suggestion' or (e['type'] == 'emoji_rating' and e['detail'] == '\U0001f44e')
]
print(f'\nAfter negative filter: {len(negative_only)} out of {len(items)}')
print('All positive data successfully removed' if len(negative_only) == len(items) else 'WARNING: Some data may still be positive!')
