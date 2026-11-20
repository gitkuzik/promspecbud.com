/**
 * ПРОМСПЕЦБУД КРЕМЕНЧУК — СУЧАСНИЙ КЛІЄНТСЬКИЙ СКРИПТ 2026
 * Без застарілого коду з DLE. Сучасний чистий JavaScript (ES6+).
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking outside or on a link
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !mobileToggle.contains(e.target) && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      }
    });
  }

  // Mobile dropdown toggle
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(dd => {
    const link = dd.querySelector('.nav-link');
    if (link && window.innerWidth <= 768) {
      link.addEventListener('click', (e) => {
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

  // 6. Interactive Contact / Calculation Form
  const inquiryForm = document.getElementById('inquiry-form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = inquiryForm.querySelector('input[name="name"]')?.value.trim();
      const phone = inquiryForm.querySelector('input[name="phone"]')?.value.trim();
      const service = inquiryForm.querySelector('select[name="service"]')?.value;

      if (!name || !phone) {
        alert('Будь ласка, вкажіть ваше ім\'я та контактний номер телефону.');
        return;
      }

      // Show friendly confirmation
      const btn = inquiryForm.querySelector('button[type="submit"]');
      const origText = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Заявку успішно надіслано!';
      btn.style.backgroundColor = '#10b981';
      btn.style.borderColor = '#10b981';
      btn.style.color = '#ffffff';

      setTimeout(() => {
        alert(`Дякуємо, ${name}! Ваша заявка прийнята. Інженер ТОВ "Промспецбуд" зв\'яжеться з вами протягом найближчого часу за номером ${phone}.`);
        inquiryForm.reset();
        btn.innerHTML = origText;
        btn.style.backgroundColor = '';
        btn.style.borderColor = '';
        btn.style.color = '';
      }, 500);
    });
  }

  // 7. Counter Animation for Hero Stats
  const statValues = document.querySelectorAll('.stat-value');
  let animated = false;

  const animateCounters = () => {
    if (animated) return;
    statValues.forEach(stat => {
      const targetText = stat.textContent.trim();
      const targetNum = parseInt(targetText.replace(/\D/g, ''));
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
