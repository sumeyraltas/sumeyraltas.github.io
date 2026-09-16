# Java & Clean Architecture İlkeleriyle Backend Geliştirme

*15 Ocak 2025 • 5 dk okuma • #Java #Architecture*

Kurumsal ölçekteki backend projelerinde zamanla artan karmaşıklık, katı bağımlılıklar ve spagetti kod yapıları bakım maliyetlerini hızla artırır. Robert C. Martin (Uncle Bob) tarafından popülerleştirilen Clean Architecture, iş kurallarını (Business Logic) dış etkenlerden (veritabanı, web framework, harici servisler) izole etmeyi hedefler.

## Bağımlılık Kuralı (The Dependency Rule)

Clean Architecture'ın en temel kuralı: **İç çemberler dış çemberler hakkında hiçbir şey bilmemelidir.**

1. **Entities**: Kurumsal temel iş kuralları ve domain modelleri.
2. **Use Cases**: Uygulama senaryoları ve orkestrasyon katmanı.
3. **Interface Adapters (Controllers, Gateways, Presenters)**: Dış dünya ile iç dünya arasındaki veri çeviriciler.
4. **Frameworks & Drivers (Spring Boot, PostgreSQL, Web)**: En dış katmandaki detaylar.

## Dependency Inversion ile Uygulama

Spring Boot projelerinde Domain katmanını Spring bağımlılıklarından arındırmak için port-adapter yaklaşımı kullanılır:

```java
public interface UserRepository {
    Optional<User> findById(UserId id);
    void save(User user);
}
```

Bu sayede veritabanını PostgreSQL'den MongoDB'ye taşısanız bile Domain ve Use Case katmanlarında tek bir satır dahi kod değiştirmeniz gerekmez.

## Özet

Clean Architecture başlangıçta daha fazla dosya ve arayüz (interface) gerektirse de, uzun vadede yüksek test edilebilirlik, modülerlik ve teknik borçsuz bir mimari sunar.
