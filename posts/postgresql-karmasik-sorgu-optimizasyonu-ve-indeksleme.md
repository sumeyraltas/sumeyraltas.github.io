# PostgreSQL'de Karmaşık Sorgu Optimizasyonu ve İndeksleme

*28 Şubat 2025 • 6 dk okuma • #Veritabanı #PostgreSQL*

Yüksek hacimli veri tablolarında saniyede binlerce işlem gerçekleşirken yanlış kurgulanmış sorgular ve eksik indeksler sistemi hızla kilitleyebilir. Bu yazıda, PostgreSQL veritabanlarında performans darboğazlarını analiz etme ve giderme adımlarını inceliyoruz.

## 1. EXPLAIN ANALYZE ile Yürütme Planını Okuma

Bir sorgunun neden yavaş çalıştığını anlamanın ilk adımı PostgreSQL sorgu planlayıcısının (query planner) nasıl bir yol izlediğini görmektir:

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT u.id, u.username, COUNT(o.id) AS total_orders
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.created_at >= NOW() - INTERVAL '30 days'
GROUP BY u.id, u.username
ORDER BY total_orders DESC
LIMIT 50;
```

Çıktıda özellikle dikkat edilmesi gerekenler:
- **Seq Scan (Sequential Scan)**: Tablo büyükse tüm satırların tek tek okunması ciddi maliyettir.
- **Index Scan & Bitmap Index Scan**: Doğru indekslerin devreye girdiğini gösterir.
- **Buffers / Shared Read**: Diske gitmek yerine bellekten (buffer cache) okuma oranını takip edin.

## 2. Doğru İndeksleme Stratejileri

- **B-Tree**: Eşitlik (`=`) ve aralık (`<`, `<=`, `>`, `>=`) sorguları için standart seçimdir.
- **Partial Indexes (Kısmi İndeksler)**: Sadece belirli filtreleri kapsayan küçük ve hızlı indeksler oluşturun:
```sql
CREATE INDEX idx_active_orders ON orders (user_id) WHERE status = 'PENDING';
```
- **GIN İndeksleri**: JSONB ve tam metin arama (Full-Text Search) alanları için vazgeçilmezdir.

## Sonuç

Veritabanı seviyesinde yapılan doğru indekslemeler ve connection pooling optimizasyonu, uygulama katmanına ekstra sunucu maliyeti yüklemeden yanıt sürelerini 10 katına kadar hızlandırabilir.
