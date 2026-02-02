(() => {
  const gallery = Array.isArray(window.__GALLERY__) ? window.__GALLERY__ : [];
  const grid = document.getElementById('grid');

  const classify = (item) => {
    return item.category || 'others';
  };

  const getCategoryLabel = (cat) => {
    // Optional: Map short keys to nicer labels for the badge, or just return the key
    // For now, let's just capitalize/format or return a generic "Product"
    // or return the category name if it's short enough.
    // Given the long names, maybe just "Blanket"?
    return 'Blanket';
  };

  const buildTiles = (items) => {
    grid.innerHTML = '';
    items.forEach((item, idx) => {
      const type = classify(item);
      const el = document.createElement('button');
      el.className = 'tile reveal';
      el.type = 'button';
      el.setAttribute('data-idx', String(idx));
      el.setAttribute('data-type', type);

      el.innerHTML = `
        <span class="badge">${getCategoryLabel(type)}</span>
        <img src="${item.src}" alt="${item.title || 'Catalog page'}" loading="lazy" />
        <div class="meta">
          <strong>${item.title || 'Page'}</strong>
          <span>Click to view</span>
        </div>
      `;

      el.addEventListener('click', () => openLightbox(items, idx));
      grid.appendChild(el);
    });

    // hook new tiles into reveal observer
    revealObserve();
  };

  // ----- Lightbox -----
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCap = document.getElementById('lightbox-cap');
  const dl = document.getElementById('download');
  const zoomBtn = document.getElementById('zoom');

  let currentList = gallery;
  let currentIndex = 0;

  const setImage = (list, index) => {
    currentList = list;
    currentIndex = (index + list.length) % list.length;
    const item = list[currentIndex];

    lbImg.classList.remove('is-zoom');
    lbImg.src = item.src;
    lbImg.alt = item.title || 'Image';
    lbCap.textContent = item.title || '';
    dl.href = item.src;
  };

  const openLightbox = (list, index) => {
    setImage(list, index);
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
  };

  const prev = () => setImage(currentList, currentIndex - 1);
  const next = () => setImage(currentList, currentIndex + 1);

  lb.addEventListener('click', (e) => {
    const t = e.target;
    if (t && t.hasAttribute && t.hasAttribute('data-close')) closeLightbox();
  });
  document.querySelector('[data-prev]')?.addEventListener('click', prev);
  document.querySelector('[data-next]')?.addEventListener('click', next);

  zoomBtn?.addEventListener('click', () => lbImg.classList.toggle('is-zoom'));
  lbImg?.addEventListener('click', () => lbImg.classList.toggle('is-zoom'));

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // touch swipe
  let x0 = null;
  lbImg.addEventListener('touchstart', (e) => {
    x0 = e.touches?.[0]?.clientX ?? null;
  }, { passive: true });
  lbImg.addEventListener('touchend', (e) => {
    const x1 = e.changedTouches?.[0]?.clientX ?? null;
    if (x0 == null || x1 == null) return;
    const dx = x1 - x0;
    if (Math.abs(dx) > 40) (dx > 0 ? prev : next)();
    x0 = null;
  }, { passive: true });

  // ----- Filters -----
  const chips = Array.from(document.querySelectorAll('.chip'));
  const applyFilter = (mode) => {
    chips.forEach(c => c.classList.toggle('is-active', c.dataset.filter === mode));
    let items = gallery;
    if (mode !== 'all') {
      items = gallery.filter(g => classify(g) === mode);
    }
    buildTiles(items);
  };
  chips.forEach(c => c.addEventListener('click', () => applyFilter(c.dataset.filter)));

  // ----- Reveal animations -----
  let io;
  const revealObserve = () => {
    if (io) io.disconnect();
    const els = document.querySelectorAll('.reveal');
    io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) en.target.classList.add('is-in');
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    els.forEach(el => io.observe(el));
  };

  // ----- Mobile nav -----
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  toggle?.addEventListener('click', () => {
    const open = header.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
    header.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));

  // footer year
  document.getElementById('year').textContent = String(new Date().getFullYear());

  // init
  buildTiles(gallery);
  revealObserve();
  // ----- Copy to clipboard (Robust) -----
  const copyText = (text, btn) => {
    const originalIcon = btn.innerHTML;
    const showSuccess = () => {
      btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = originalIcon;
        btn.classList.remove('copied');
      }, 2000);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(showSuccess).catch(err => {
        console.error('Async copy failed', err);
        fallbackCopy(text, btn, showSuccess);
      });
    } else {
      fallbackCopy(text, btn, showSuccess);
    }
  };

  const fallbackCopy = (text, btn, onSuccess) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) onSuccess();
      else console.error('Fallback copy unsuccessful');
    } catch (err) {
      console.error('Fallback copy failed', err);
    }

    document.body.removeChild(textArea);
  };

  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // Stop bubbling
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) copyText(textToCopy, btn);
    });
  });
})();
