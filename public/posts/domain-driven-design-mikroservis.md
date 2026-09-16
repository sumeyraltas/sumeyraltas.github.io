# Domain-Driven Design (DDD) ile Ölçeklenebilir Mikroservisler

*Yazar: Sümeyra Altaş | Tarih: 12 Kasım 2023 | Kategori: Yazılım Mimarisi*

Mikroservis mimarisine geçiş yapan pek çok organizasyon, başlangıçta monolitik yapının getirdiği hantallıktan kurtulmayı hedefler. Ancak net iş alanı (domain) sınırları belirlenmeden bölünen sistemler kısa sürede "dağıtık monolit" (distributed monolith) kabusuna dönüşür. 

TÜBİTAK BİLGEM'de kurumsal muhasebe ve yönetim sistemleri geliştirirken tecrübe ettiğimiz üzere, **Domain-Driven Design (DDD)** felsefesi mikroservis sınırlarını çizmek için en güçlü rehberdir.

---

### Bounded Context: Sınırları Doğru Belirlemek

DDD'nin stratejik tasarım ayağında yer alan **Bounded Context**, bir kavramın veya iş modelinin geçerli olduğu anlam sınırını tanımlar. Örneğin:
- Bir *Kullanıcı* nesnesi "Kimlik Doğrulama" servisinde yalnızca e-posta, parola hash'i ve rollerden ibarettir.
- Aynı kişi "Fatura/Muhasebe" servisinde vergi kimlik numarası, fatura adresi ve cari bakiye ile anlam kazanır.

Bu iki farklı dünyayı tek bir devasa "User" entity'sine sıkıştırmak yerine bağımsız domain modellerine ayırmak servisler arasındaki bağımlılıkları ortadan kaldırır.

---

### Taktiksel DDD Elemanları

1. **Entities & Value Objects:**
   - **Entity:** Kimliği (ID) olan ve yaşam döngüsü boyunca durumu değişebilen nesneler (örn. `Invoice`, `Account`).
   - **Value Object:** Değişmez (immutable), kimliksiz ve sadece taşıdığı değerlerle tanımlanan nesneler (örn. `Money`, `Currency`, `Address`).
2. **Aggregate Root:**
   İş kurallarının (invariants) tutarlılığını garanti eden ana giriş kapısıdır. Dış servisler aggregate içindeki alt elemanlara doğrudan erişemez, sadece Aggregate Root üzerinden işlem yapar.

```java
// Spring Boot / Java örneği: Value Object ve Aggregate Root
public record Money(BigDecimal amount, String currency) {
    public Money {
        if (amount.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Tutar negatif olamaz");
        }
    }
}

public class Account {
    private final AccountId id;
    private Money balance;

    public void withdraw(Money amount) {
        // İş kuralı aggregate içinde korunur
        if (this.balance.amount().compareTo(amount.amount()) < 0) {
            throw new InsufficientBalanceException();
        }
        this.balance = new Money(this.balance.amount().subtract(amount.amount()), this.balance.currency());
    }
}
```

---

### Asenkron İletişim ve Olay Güdümlü (Event-Driven) Yaklaşım

Mikroservisler arasında senkron REST çağrıları yapmak yerine, **Apache Kafka** gibi dağıtık mesajlaşma kuyrukları ile **Domain Events** (Alan Olayları) yayınlamak sistemin esnekliğini ve dayanıklılığını (fault tolerance) artırır:

- Fatura kesildiğinde: `InvoiceIssuedEvent` yayınlanır.
- Muhasebe, Bildirim ve Raporlama servisleri bu olayı asenkron olarak tüketir. Bir servis geçici olarak kapalı olsa bile kuyruktaki mesaj kaybolmaz.

---

### Özet

Doğru kurgulanmış bir Domain-Driven Design yaklaşımı; kodun okunabilirliğini artırır, teknik borcu (technical debt) azaltır ve ekiplerin birbirine bağımlı olmadan bağımsız hızda geliştirme yapabilmesini sağlar.
