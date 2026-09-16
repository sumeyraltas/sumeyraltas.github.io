/**
 * Sümeyra Altaş — Kişisel Portföy & Mühendislik Arşivi
 * GitHub Pages Uyumlu — Saf (Vanilla) JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. TEMA YÖNETİMİ (Koyu / Açık Tema)
  // Varsayılan: Koyu Tema (Görsel ile Birebir Uyumlu)
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  const initialTheme = savedTheme || 'dark';
  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      showToast(newTheme === 'dark' ? '🌙 Koyu tema aktif' : '☀️ Açık tema aktif');
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç');
      themeToggleBtn.innerHTML = theme === 'dark'
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`;
    }
  }

  // ==========================================
  // 2. MOBİL MENÜ YÖNETİMİ
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==========================================
  // 3. AKTİF MENÜ İZLEME (ScrollSpy)
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links .nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // ==========================================
  // 4. HIZLI PAYLAŞ & BAĞLANTI KOPYALA
  // ==========================================
  const quickShareBtn = document.getElementById('quick-share-btn');
  if (quickShareBtn) {
    quickShareBtn.addEventListener('click', async () => {
      const url = window.location.href || 'https://sumeyraltas.github.io';
      try {
        await navigator.clipboard.writeText(url);
        showToast('📋 Portfolyo bağlantısı kopyalandı!');
      } catch {
        showToast('🌐 sumeyraltas.github.io');
      }
    });
  }

  // ==========================================
  // 5. PROJE DETAYLARI MODALI
  // ==========================================
  const projectDetails = {
    'student-management': {
      title: 'Student Management System',
      category: 'WEB & FULL STACK',
      tags: ['JavaScript (ES6+)', 'HTML5', 'CSS Grid/Flexbox', 'Local State Engine'],
      description: 'Öğrencilerin ders kayıtlarını, sınav notlarını, devam durumlarını ve başarı ortalamalarını dinamik olarak hesaplayan kurumsal ölçekli bir ön yüz uygulaması.',
      architecture: [
        'Modüler JavaScript mimarisi ile bileşen bazlı UI tasarımı',
        'Local Storage tabanlı veri kalıcılığı ve anlık senkronizasyon',
        'Dinamik filtreleme, sıralama ve arama fonksiyonları',
        'Duyarlı (Responsive) CSS Grid ve modern Flexbox arayüzü'
      ],
      github: 'https://github.com/sumeyraltas'
    },
    'tedorm': {
      title: 'TEDORM Backend',
      category: 'ENTERPRISE BACKEND',
      tags: ['Java', 'Spring Boot', 'REST API', 'PostgreSQL', 'JPA / Hibernate'],
      description: 'Yurt ve öğrenci konaklama merkezleri için tasarlanmış kurumsal düzeyde RESTful yönetim mimarisi. Oda atamaları, aidat takibi ve yetkilendirme katmanları içerir.',
      architecture: [
        'Spring Boot ile çok katmanlı Clean Architecture (Controller, Service, Repository)',
        'Hibernate / JPA ve PostgreSQL ile ACID uyumlu veri tabanı tasarımı',
        'JWT tabanlı rol ve kullanıcı güvenliği yönetimi',
        'Postman ile test edilmiş kapsamlı RESTful API uç noktaları'
      ],
      github: 'https://github.com/sumeyraltas'
    },
    'online-shopping': {
      title: 'Online Shopping System Database',
      category: 'DATABASE ARCHITECTURE',
      tags: ['PL/pgSQL', 'PostgreSQL', 'ACID Transactions', 'Triggers & Indexing'],
      description: 'Geniş ürün katalogları, anlık stok değişimleri ve sepet yönetimini yüksek hızda ve tutarlı biçimde yürüten ilişkisel veritabanı altyapısı.',
      architecture: [
        'PL/pgSQL saklı yordamları (Stored Procedures) ve fonksiyonlar',
        'Stok takibi ve sipariş kontrolü için otomatik tetikleyiciler (Triggers)',
        'EXPLAIN ANALYZE ve B-Tree/GIN indeksleme ile sorgu optimizasyonu',
        'Yüksek eşzamanlılıkta (concurrency) veri tutarlılığı güvencesi'
      ],
      github: 'https://github.com/sumeyraltas'
    },
    'sudoku': {
      title: 'SUDOKU Project',
      category: 'ALGORITHMS & TEAMWORK',
      tags: ['Java', 'Backtracking Algorithm', 'Java Swing / GUI', 'Git Collaboration'],
      description: '4 kişilik yazılım geliştirme ekibiyle ortaklaşa inşa edilen, algoritma optimizasyonu ve grafiksel kullanıcı arayüzünü birleştiren Sudoku oyunu.',
      architecture: [
        'Özyinelemeli (Recursive) Backtracking algoritmasıyla anlık çözümleme',
        'Java Swing bileşenleriyle etkileşimli ve akıcı masaüstü arayüzü',
        'Çok oyunculu modlar ve zorluk derecesi üretim mekanizması',
        'Git ve GitHub üzerinden dal (branch) yönetimi ve kod inceleme süreçleri'
      ],
      github: 'https://github.com/sumeyraltas'
    },
    'rolldice': {
      title: 'RollDiceApp',
      category: 'MOBILE APP (iOS)',
      tags: ['Swift', 'iOS SDK', 'UIKit', 'Core Animation'],
      description: 'iOS işletim sistemi için Swift diliyle native olarak geliştirilen, fizik tabanlı zar atma animasyonlarına ve dokunsal geri bildirimlere sahip mobil uygulama.',
      architecture: [
        'UIKit ve AutoLayout ile farklı iPhone ekran boyutlarına kusursuz uyum',
        'Core Animation ile 60 FPS akıcı zar dönüş ve düşüş animasyonları',
        'Cihaz ivmeölçeri (Accelerometer) ile telefonu sallayarak zar atma desteği',
        'MVC (Model-View-Controller) mimari şablonuna tam bağlılık'
      ],
      github: 'https://github.com/sumeyraltas'
    },
    'password-checker': {
      title: 'Password Checker',
      category: 'SECURITY & WEB',
      tags: ['JavaScript', 'HTML5', 'RegEx Logic', 'Client-side Security'],
      description: 'Kullanıcı şifrelerinin entropi seviyesini, sözlük saldırılarına direncini ve karakter karmaşıklığını anlık olarak değerlendiren güvenlik aracı.',
      architecture: [
        'Shannon Entropi hesaplama formülü ile matematiksel güvenlik puanlama',
        'Regex (Düzenli İfadeler) tabanlı karakter seti ve desen eşleme denetimleri',
        'Kullanıcı verisini asla sunucuya iletmeyen sıfır sızıntılı istemci taraflı mantık',
        'Görsel şifre gücü çubuğu ve anlık geri bildirim önerileri'
      ],
      github: 'https://github.com/sumeyraltas'
    }
  };

  const projectModal = document.getElementById('project-modal');
  const projectModalTitle = document.getElementById('project-modal-title');
  const projectModalBody = document.getElementById('project-modal-body');
  const projectModalCloseBtn = document.getElementById('project-modal-close-btn');

  document.querySelectorAll('.btn-proj-detail').forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-project');
      const data = projectDetails[projId];
      if (!data || !projectModal) return;

      projectModalTitle.textContent = data.title;
      projectModalBody.innerHTML = `
        <div style="margin-bottom: 1.25rem;">
          <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom: 0.85rem;">
            <span class="project-cat-badge">${data.category}</span>
          </div>
          <p style="font-size: 1.05rem; color: var(--text-main); margin-bottom: 1.25rem; line-height: 1.65;">
            ${data.description}
          </p>

          <h4 style="font-size: 0.85rem; font-family: var(--font-mono); font-weight:700; color: var(--text-muted); text-transform:uppercase; margin-bottom: 0.75rem; letter-spacing:0.05em;">
            MİMARİ &amp; TEKNİK DETAYLAR
          </h4>
          <ul style="padding-left: 1.25rem; margin-bottom: 1.5rem; color: var(--text-main); font-size: 0.95rem;">
            ${data.architecture.map(item => `<li style="margin-bottom: 0.4rem;">${item}</li>`).join('')}
          </ul>

          <h4 style="font-size: 0.85rem; font-family: var(--font-mono); font-weight:700; color: var(--text-muted); text-transform:uppercase; margin-bottom: 0.6rem; letter-spacing:0.05em;">
            KULLANILAN TEKNOLOJİLER
          </h4>
          <div style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom: 1.75rem;">
            ${data.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>

          <div style="display:flex; gap:0.75rem; border-top: 1px solid var(--border-color); padding-top: 1.25rem;">
            <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="font-size:0.88rem; padding: 0.6rem 1.25rem;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              <span>GitHub Kodlarını İncele</span>
            </a>
          </div>
        </div>
      `;

      openOverlay(projectModal);
    });
  });

  if (projectModalCloseBtn && projectModal) {
    projectModalCloseBtn.addEventListener('click', () => closeOverlay(projectModal));
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeOverlay(projectModal);
    });
  }

  // ==========================================
  // 6. TEKNİK MAKALELER & MARKDOWN ENTEGRASYONU
  // ==========================================
  const blogModal = document.getElementById('blog-modal');
  const modalPostTitle = document.getElementById('modal-post-title');
  const modalPostBody = document.getElementById('modal-post-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const articleFiles = {
    'github-pages-ucretsiz-ve-hizli-portfolyo-yayini': 'posts/github-pages-ucretsiz-ve-hizli-portfolyo-yayini.md',
    'postgresql-karmasik-sorgu-optimizasyonu-ve-indeksleme': 'posts/postgresql-karmasik-sorgu-optimizasyonu-ve-indeksleme.md',
    'java-clean-architecture-backend-gelistirme': 'posts/java-clean-architecture-backend-gelistirme.md'
  };

  const articleFallbacks = {
    'github-pages-ucretsiz-ve-hizli-portfolyo-yayini': {
      title: 'GitHub Pages ile Ücretsiz ve Hızlı Portfolyo Yayını',
      content: `
# GitHub Pages ile Ücretsiz ve Hızlı Portfolyo Yayını

*12 Mart 2025 • 4 dk okuma • #DevOps #GitHubPages*

Kişisel bir geliştirici portfolyosunu veya teknik bloğu yayına almak için karmaşık bulut sunucularına veya aylık abonelik ücretlerine gerek yoktur. GitHub Pages, doğrudan GitHub deponuzdaki statik dosyaları (HTML, CSS, JS) global CDN üzerinden yüksek hızla ve sıfır sunucu maliyetiyle yayınlamanızı sağlar.

## Neden GitHub Pages?

1. **Sıfır Maliyet**: Herhangi bir hosting veya sunucu faturası ödemezsiniz.
2. **Özel Alan Adı (Custom Domain)**: \`sumeyraltas.github.io\` adresine istediğiniz zaman özel bir domain bağlayabilirsiniz.
3. **Ücretsiz SSL/TLS Sertifikası**: HTTPS desteği GitHub tarafından otomatik olarak sağlanır.
4. **Git Tabanlı Sürüm Kontrolü**: Her \`git push\` komutu doğrudan canlı ortama dağıtılır.

## Yayın Adımları

1. GitHub'da \`kullaniciadi.github.io\` adında bir depo açın.
2. Proje dosyalarını depoya push edin.
3. **Settings → Pages** sekmesine gidin.
4. Branch olarak \`main\` ve klasör olarak \`/(root)\` seçip kaydedin.
5. 1-2 dakika içinde siteniz tüm dünyada yayına girecektir.

\`\`\`bash
git remote add origin https://github.com/sumeyraltas/sumeyraltas.github.io.git
git branch -M main
git push -u origin main
\`\`\`
      `
    },
    'postgresql-karmasik-sorgu-optimizasyonu-ve-indeksleme': {
      title: "PostgreSQL'de Karmaşık Sorgu Optimizasyonu ve İndeksleme",
      content: `
# PostgreSQL'de Karmaşık Sorgu Optimizasyonu ve İndeksleme

*28 Şubat 2025 • 6 dk okuma • #Veritabanı #PostgreSQL*

Yüksek hacimli veri tablolarında saniyede binlerce işlem gerçekleşirken yanlış kurgulanmış sorgular ve eksik indeksler sistemi hızla kilitleyebilir. Bu yazıda, PostgreSQL veritabanlarında performans darboğazlarını analiz etme ve giderme adımlarını inceliyoruz.

## 1. EXPLAIN ANALYZE ile Yürütme Planını Okuma

Bir sorgunun neden yavaş çalıştığını anlamanın ilk adımı PostgreSQL sorgu planlayıcısının (query planner) nasıl bir yol izlediğini görmektir:

\`\`\`sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT u.id, u.username, COUNT(o.id) AS total_orders
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.created_at >= NOW() - INTERVAL '30 days'
GROUP BY u.id, u.username
ORDER BY total_orders DESC
LIMIT 50;
\`\`\`

## 2. Doğru İndeksleme Stratejileri

- **B-Tree**: Eşitlik (\`=\`) ve aralık sorguları için standart seçimdir.
- **Partial Indexes (Kısmi İndeksler)**: Sadece belirli koşulları sağlayan satırları indeksleyin:
\`\`\`sql
CREATE INDEX idx_active_orders ON orders (user_id) WHERE status = 'PENDING';
\`\`\`
- **GIN İndeksleri**: JSONB ve tam metin arama alanları için vazgeçilmezdir.
      `
    },
    'java-clean-architecture-backend-gelistirme': {
      title: 'Java & Clean Architecture İlkeleriyle Backend Geliştirme',
      content: `
# Java & Clean Architecture İlkeleriyle Backend Geliştirme

*15 Ocak 2025 • 5 dk okuma • #Java #Architecture*

Kurumsal ölçekteki backend projelerinde zamanla artan karmaşıklık, katı bağımlılıklar ve spagetti kod yapıları bakım maliyetlerini hızla artırır. Robert C. Martin (Uncle Bob) tarafından popülerleştirilen Clean Architecture, iş kurallarını (Business Logic) dış etkenlerden izole etmeyi hedefler.

## Bağımlılık Kuralı (The Dependency Rule)

Clean Architecture'ın en temel kuralı: **İç çemberler dış çemberler hakkında hiçbir şey bilmemelidir.**

1. **Entities**: Kurumsal temel iş kuralları ve domain modelleri.
2. **Use Cases**: Uygulama senaryoları ve orkestrasyon katmanı.
3. **Interface Adapters**: Dış dünya ile iç dünya arasındaki veri çeviriciler.
4. **Frameworks & Drivers**: Spring Boot, PostgreSQL ve harici sistemler.

## Dependency Inversion ile Uygulama

Domain katmanını Spring bağımlılıklarından arındırmak için port-adapter yaklaşımı kullanılır:

\`\`\`java
public interface UserRepository {
    Optional<User> findById(UserId id);
    void save(User user);
}
\`\`\`
      `
    }
  };

  document.querySelectorAll('.article-read-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const postId = btn.getAttribute('data-post-id');
      if (!blogModal || !modalPostTitle || !modalPostBody) return;

      modalPostTitle.textContent = 'Yazı Yükleniyor...';
      modalPostBody.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem;">
          <p style="color: var(--text-muted); font-size: 0.95rem;">Makale içeriği getiriliyor...</p>
        </div>
      `;

      openOverlay(blogModal);

      const filePath = articleFiles[postId];
      let markdownText = '';

      try {
        if (filePath) {
          const res = await fetch(filePath);
          if (res.ok) {
            markdownText = await res.text();
          }
        }
      } catch {
        // Fallback'e geç
      }

      if (!markdownText && articleFallbacks[postId]) {
        markdownText = articleFallbacks[postId].content;
      }

      if (markdownText) {
        modalPostTitle.textContent = (articleFallbacks[postId] && articleFallbacks[postId].title) || 'Teknik Makale';
        modalPostBody.innerHTML = `<div class="markdown-article">${renderMarkdown(markdownText)}</div>`;
      }
    });
  });

  function renderMarkdown(md) {
    if (!md) return '';
    return md
      .replace(/```([\s\S]*?)```/g, (match, p1) => `<pre><code>${escapeHtml(p1.trim())}</code></pre>`)
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^---$/gim, '<hr style="border:0; height:1px; background:var(--border-color); margin: 1.5rem 0;" />')
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:var(--primary-accent);text-decoration:underline;">$1</a>')
      .replace(/^\s*[-*]\s+(.*$)/gim, '<li>$1</li>')
      .split('\n\n')
      .map(block => {
        block = block.trim();
        if (!block) return '';
        if (block.startsWith('<h') || block.startsWith('<pre') || block.startsWith('<hr')) return block;
        if (block.includes('<li>')) return `<ul style="padding-left: 1.5rem; margin-bottom: 1.25rem;">${block}</ul>`;
        return `<p>${block}</p>`;
      })
      .join('\n');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function openOverlay(modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeOverlay(modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn && blogModal) {
    modalCloseBtn.addEventListener('click', () => closeOverlay(blogModal));
    blogModal.addEventListener('click', (e) => {
      if (e.target === blogModal) closeOverlay(blogModal);
    });
  }

  // ESC ile modal kapatma
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (blogModal && blogModal.classList.contains('open')) closeOverlay(blogModal);
      if (projectModal && projectModal.classList.contains('open')) closeOverlay(projectModal);
    }
  });

  // ==========================================
  // 7. İLETİŞİM FORMU (Formspree Entegrasyonu)
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('#form-submit-btn');
      const originalHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>İletiliyor...</span>`;

      const formData = new FormData(contactForm);

      try {
        const actionUrl = contactForm.getAttribute('action');
        if (actionUrl && !actionUrl.includes('YOUR_FORMSPREE_ID')) {
          const res = await fetch(actionUrl, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
          });
          if (res.ok) {
            contactForm.reset();
            displayFormStatus('success', 'Mesajınız başarıyla iletildi. En kısa sürede geri döneceğim.');
            showToast('✅ Mesajınız gönderildi!');
          } else {
            throw new Error('Form error');
          }
        } else {
          // Geliştirme/Önizleme simülasyonu
          await new Promise(r => setTimeout(r, 600));
          contactForm.reset();
          displayFormStatus('success', 'Mesajınız kaydedildi. sumeyraltas@gmail.com adresinden de doğrudan bana ulaşabilirsiniz.');
          showToast('✅ Mesajınız başarıyla iletildi!');
        }
      } catch {
        displayFormStatus('error', 'Mesaj iletilemedi. Lütfen doğrudan sumeyraltas@gmail.com adresine yazınız.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;
      }
    });
  }

  function displayFormStatus(type, msg) {
    if (!formStatus) return;
    formStatus.style.display = 'block';
    if (type === 'success') {
      formStatus.style.backgroundColor = 'rgba(16, 185, 129, 0.12)';
      formStatus.style.color = '#10b981';
      formStatus.style.border = '1px solid rgba(16, 185, 129, 0.3)';
    } else {
      formStatus.style.backgroundColor = 'rgba(239, 68, 68, 0.12)';
      formStatus.style.color = '#ef4444';
      formStatus.style.border = '1px solid rgba(239, 68, 68, 0.3)';
    }
    formStatus.textContent = msg;
    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 6000);
  }

  // ==========================================
  // 8. TOAST BİLDİRİMİ
  // ==========================================
  function showToast(message) {
    let toast = document.getElementById('site-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'site-toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
});
