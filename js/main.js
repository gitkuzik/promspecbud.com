/**
 * ПРОМСПЕЦБУД КРЕМЕНЧУК — СУЧАСНИЙ КЛІЄНТСЬКИЙ СКРИПТ 2026
 * Без застарілого коду з DLE. Сучасний чистий JavaScript (ES6+).
 */

// ── EmailJS Configuration ──────────────────────────────────────────
// Зареєструйтесь на https://www.emailjs.com/ та заповніть ці значення:
const EMAILJS_PUBLIC_KEY = 'IW_0DYdGsjkx6XlSa';       // Dashboard → Account → Public Key
const EMAILJS_SERVICE_ID = 'service_x0cgzuh';       // Dashboard → Email Services → Service ID
const EMAILJS_TEMPLATE_ID = 'template_0ou2v68';     // Dashboard → Email Templates → Template ID
// ────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // 0. EmailJS Initialization
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
  // 1. Sticky Header Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle (right-side drawer, hamburger -> X)
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');

  const closeNav = () => {
    if (!mainNav) return;
    mainNav.classList.remove('active');
    mobileToggle?.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('active');
      mobileToggle.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close drawer when a real link is tapped (but keep dropdown toggles open)
    mainNav.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && !link.closest('.nav-dropdown > .nav-link')) {
        closeNav();
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !mobileToggle.contains(e.target) && mainNav.classList.contains('active')) {
        closeNav();
      }
    });
  }

  // Mobile dropdown toggle (drawer mode: < 1120px)
  const isMobileNav = () => window.matchMedia('(max-width: 1119px)').matches;
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(dd => {
    const link = dd.querySelector('.nav-link');
    if (link) {
      link.addEventListener('click', (e) => {
        if (!isMobileNav()) return;
        e.preventDefault();
        dd.classList.toggle('open');
      });
    }
  });

  // 3. Filter Tabs (Projects & Gallery)
  const setupFilterTabs = (containerSelector, itemSelector) => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const filterBtns = container.querySelectorAll('.filter-btn');
    const items = container.querySelectorAll(itemSelector);

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter') || 'all';

        items.forEach(item => {
          const category = item.getAttribute('data-category') || '';
          if (filter === 'all' || category.includes(filter)) {
            item.style.display = '';
            item.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  };

  setupFilterTabs('.projects-section', '.project-card');
  setupFilterTabs('.gallery-section', '.gallery-item');

  // 4. Lightbox Image Viewer
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentGalleryItems = [];
  let currentIndex = 0;

  const openLightbox = (items, index) => {
    if (!lightbox || !lightboxImg) return;
    currentGalleryItems = items;
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  const updateLightbox = () => {
    if (!currentGalleryItems[currentIndex]) return;
    const item = currentGalleryItems[currentIndex];
    const src = item.getAttribute('data-full') || item.querySelector('img')?.getAttribute('src') || '';
    const caption = item.getAttribute('data-caption') || item.querySelector('img')?.getAttribute('alt') || '';
    
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption;
  };

  // Bind gallery items
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item, .lightbox-trigger'));
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      // filter only currently visible items
      const visibleItems = galleryItems.filter(el => el.style.display !== 'none');
      const idx = visibleItems.indexOf(item);
      openLightbox(visibleItems, idx >= 0 ? idx : index);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length;
      updateLightbox();
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % currentGalleryItems.length;
      updateLightbox();
    });
  }

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
    if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
  });

  // 5. Back to Top Button
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 6. Interactive Contact / Calculation Form (EmailJS)
  // ── Helper: send via EmailJS and update UI ──
  const sendForm = (form, extraParams = {}) => {
    const name = form.querySelector('input[name="name"]')?.value.trim();
    const phone = form.querySelector('input[name="phone"]')?.value.trim();
    const email = form.querySelector('input[name="email"]')?.value.trim() || '—';
    const service = form.querySelector('select[name="service"]');
    const serviceText = service ? service.options[service.selectedIndex]?.text : '—';
    const message = form.querySelector('textarea[name="message"]')?.value.trim() || '—';

    if (!name || !phone) {
      alert((window.__psbT && window.__psbT('form.required')) || 'Будь ласка, вкажіть ваше ім\'я та контактний номер телефону.');
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const origText = btn.innerHTML;

    // Disable button while sending
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ' + ((window.__psbT && window.__psbT('form.sending')) || 'Надсилаємо…');

    const templateParams = {
      from_name: name,
      phone: phone,
      email: email,
      service: serviceText,
      message: message,
      page: document.title,
      ...extraParams,
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> ' + ((window.__psbT && window.__psbT('form.success')) || 'Заявку успішно надіслано!');
        btn.style.backgroundColor = '#10b981';
        btn.style.borderColor = '#10b981';
        btn.style.color = '#ffffff';

        setTimeout(() => {
          alert((window.__psbT && window.__psbT('form.successAlert', { name: name, phone: phone })) || `Дякуємо, ${name}! Ваша заявка прийнята. Інженер ТОВ "Промспецбуд" зв\'яжеться з вами протягом найближчого часу за номером ${phone}.`);
          form.reset();
          btn.innerHTML = origText;
          btn.style.backgroundColor = '';
          btn.style.borderColor = '';
          btn.style.color = '';
          btn.disabled = false;
        }, 600);
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ' + ((window.__psbT && window.__psbT('form.error')) || 'Помилка надсилання');
        btn.style.backgroundColor = '#ef4444';
        btn.style.borderColor = '#ef4444';
        btn.style.color = '#ffffff';

        setTimeout(() => {
          alert((window.__psbT && window.__psbT('form.errorAlert')) || 'На жаль, виникла помилка при відправці. Будь ласка, зателефонуйте нам або надішліть лист на promspecbud5@gmail.com.');
          btn.innerHTML = origText;
          btn.style.backgroundColor = '';
          btn.style.borderColor = '';
          btn.style.color = '';
          btn.disabled = false;
        }, 1500);
      });
  };

  // Form on the main page (index.html)
  const inquiryForm = document.getElementById('inquiry-form');
  if (inquiryForm?.tagName === 'FORM') {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendForm(inquiryForm);
    });
  }

  // Form on the contacts page (kontakty.html)
  const contactPageForm = document.getElementById('contact-page-form');
  if (contactPageForm) {
    contactPageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendForm(contactPageForm);
    });
  }

  // 7. Counter Animation for Hero Stats
  const statValues = document.querySelectorAll('.stat-value');
  let animated = false;

  const animateCounters = () => {
    if (animated) return;
    statValues.forEach(stat => {
      const targetText = stat.textContent.trim();
      // Animate only plain numbers with an optional trailing "+" (e.g. 5000, 500+, 20+).
      // Skip ranges like "3-4" so they are not mangled into "34".
      if (!/^\d+\+?$/.test(targetText)) return;
      const targetNum = parseInt(targetText, 10);
      const suffix = targetText.replace(/[\d\s]/g, '');
      if (isNaN(targetNum)) return;

      let current = 0;
      const step = Math.max(1, Math.floor(targetNum / 35));
      const timer = setInterval(() => {
        current += step;
        if (current >= targetNum) {
          stat.textContent = targetNum.toLocaleString('uk-UA') + (suffix ? ' ' + suffix : '');
          clearInterval(timer);
        } else {
          stat.textContent = current.toLocaleString('uk-UA') + (suffix ? ' ' + suffix : '');
        }
      }, 30);
    });
    animated = true;
  };

  // Run immediately or on view
  setTimeout(animateCounters, 200);
});
