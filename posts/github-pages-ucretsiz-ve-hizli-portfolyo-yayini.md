# GitHub Pages ile Ücretsiz ve Hızlı Portfolyo Yayını

*12 Mart 2025 • 4 dk okuma • #DevOps #GitHubPages*

Kişisel bir geliştirici portfolyosunu veya teknik bloğu yayına almak için karmaşık bulut sunucularına veya aylık abonelik ücretlerine gerek yoktur. GitHub Pages, doğrudan GitHub deponuzdaki statik dosyaları (HTML, CSS, JS) global CDN üzerinden yüksek hızla ve sıfır sunucu maliyetiyle yayınlamanızı sağlar.

## Neden GitHub Pages?

1. **Sıfır Maliyet**: Herhangi bir hosting veya sunucu faturası ödemezsiniz.
2. **Özel Alan Adı (Custom Domain)**: `sumeyraltas.github.io` adresine istediğiniz zaman özel bir domain bağlayabilirsiniz.
3. **Ücretsiz SSL/TLS Sertifikası**: HTTPS desteği GitHub tarafından otomatik olarak sağlanır.
4. **Git Tabanlı Sürüm Kontrolü**: Her `git push` komutu doğrudan canlı ortama dağıtılır.

## Yayın Adımları

1. GitHub'da `kullaniciadi.github.io` adında bir depo açın.
2. Proje dosyalarını depoya push edin.
3. **Settings → Pages** sekmesine gidin.
4. Branch olarak `main` ve klasör olarak `/(root)` seçip kaydedin.
5. 1-2 dakika içinde siteniz tüm dünyada yayına girecektir.

```bash
git remote add origin https://github.com/sumeyraltas/sumeyraltas.github.io.git
git branch -M main
git push -u origin main
```
