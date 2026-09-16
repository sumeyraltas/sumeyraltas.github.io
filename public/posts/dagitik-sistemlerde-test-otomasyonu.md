# Büyük Ölçekli Sistemlerde Test Otomasyonu ve Regresyon Önleme

*Yazar: Sümeyra Altaş | Tarih: 20 Ağustos 2023 | Kategori: Test & Kalite Güvencesi*

Büyük ölçekli açık kaynak projeler veya kritik kurumsal sistemlerde yeni bir özellik eklemek kadar, mevcut fonksiyonların bozulmadığını (regresyon yaşanmadığını) garanti etmek de hayati önem taşır.

Test otomasyonu, yalnızca "kodun çalışıp çalışmadığını" kontrol eden bir mekanizma değil; geliştiriciye cesaret veren ve refactoring yapmayı güvenli kılan bir emniyet ağıdır.

---

### Test Piramidini Doğru Uygulamak

1. **Birim (Unit) Testler:**
   Piramidin tabanını oluşturur. Hızlı çalışır, dış bağımlılıklardan (veritabanı, ağ) mock'lar aracılığıyla arındırılmıştır. Java dünyasında JUnit 5 ve Mockito standarttır.
2. **Entegrasyon (Integration) Testleri:**
   Mikroservislerin veritabanı (PostgreSQL) veya mesaj kuyruğu (Kafka) ile uyumunu sınar. `Testcontainers` kütüphanesi sayesinde Docker üzerinde gerçek servis ayağa kaldırılarak %100'e yakın gerçekçi test ortamı sağlanır.
3. **Uçtan Uca (E2E) ve Sistem Testleri:**
   Sistemin dışarıdan bir kullanıcı gibi çağrılarak tüm akışın baştan sona doğrulandığı aşamadır.

---

### Açık Kaynak Projelerde Test Disiplini (Örn. Apache Spark)

Huawei bünyesinde Apache Spark katkıları sırasında edindiğim en değerli tecrübe, devasa bir kod tabanında yüzlerce pull request'in nasıl yönetildiğini gözlemlemek oldu:
- Her yeni özellik veya hata düzeltmesi (bug fix), mutlak surette ilgili testiyle birlikte commit edilir.
- Dağıtık ortamdaki eşzamanlılık (concurrency), race condition ve memory leak ihtimalleri stres testleri altında incelenir.
- Maven ve Jenkins tabanlı CI/CD pipeline'ları yüzlerce modülü otomatik derleyerek regresyonları henüz PR aşamasında yakalar.

---

### Özet Tavsiyeler

- Test kodunu üretim kodu (production code) kadar temiz ve okunabilir tutun.
- "Flaky" (bazen geçen, bazen kalan) testleri hemen tespit edip düzeltin; güvenilmeyen testler zamanla göz ardı edilmeye başlanır.
- Pipeline'ı sürekli yeşil tutmak projenin hızını düşürmez, aksine uzun vadede hata ayıklama süresini minimuma indirir.
