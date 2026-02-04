(() => {
  const gallery = Array.isArray(window.__GALLERY__) ? window.__GALLERY__ : [];
  const grid = document.getElementById('grid');
  const searchInput = document.getElementById('search-input');

  // State for filters
  let activeFilters = new Set(['all']);
  let searchTerm = '';

  const getCategoryLabel = (cat) => {
    return 'Blanket';
  };

  const classify = (item) => {
    return item.category || 'others';
  };

  // Check if an item matches current filters
  const matchesFilter = (item) => {
    // 1. Search Check
    if (searchTerm) {
      const lowerTitle = (item.title || '').toLowerCase();
      if (!lowerTitle.includes(searchTerm)) {
        return false;
      }
    }

    // 2. Category Check
    if (activeFilters.has('all')) return true;
    const cat = classify(item);
    return activeFilters.has(cat);
  };

  const buildTiles = (items) => {
    if (!grid) return;
    grid.innerHTML = '';

    // Check for data-limit attribute (for Homepage Showcase)
    const limit = grid.dataset.limit ? parseInt(grid.dataset.limit, 10) : null;
    let displayItems = items;

    if (limit && limit > 0) {
      displayItems = items.slice(0, limit);
    }

    // If empty
    if (displayItems.length === 0) {
      grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">No products found matching your criteria.</div>';
      return;
    }

    displayItems.forEach((item, idx) => {
      // Find original index in full gallery for lightbox to work correctly with full list?
      // Actually, for lightbox, we usually want to scroll through the *filtered* list.
      // So let's pass the 'displayItems' to the lightbox, but we need to know WHICH item index in 'displayItems' was clicked.

      const type = classify(item);
      const el = document.createElement('button');
      el.className = 'tile reveal';
      el.type = 'button';
      el.setAttribute('data-idx', String(idx));
      el.setAttribute('data-type', type);

      el.innerHTML = `
        <span class="badge">${getCategoryLabel(type)}</span>
        <img src="${item.src}" alt="${item.title || 'Product'}" loading="lazy" />
        <div class="meta">
          <strong>${item.title || 'Product'}</strong>
          <span>Click to view</span>
        </div>
      `;

      // Pass the CURRENT filtered list to the lightbox
      el.addEventListener('click', () => openLightbox(displayItems, idx));
      grid.appendChild(el);
    });

    // hook new tiles into reveal observer
    revealObserve();
  };

  const updateGrid = () => {
    const filtered = gallery.filter(matchesFilter);
    buildTiles(filtered);
  };

  // ----- Lightbox -----
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCap = document.getElementById('lightbox-cap');
  const dl = document.getElementById('download');
  const zoomBtn = document.getElementById('zoom');

  let currentList = [];
  let currentIndex = 0;

  const setImage = (list, index) => {
    currentList = list;
    currentIndex = (index + list.length) % list.length;
    const item = list[currentIndex];

    if (!item) return;

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

  if (lb) {
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
  }

  // ----- Filters (Multi-select) -----
  const chips = Array.from(document.querySelectorAll('.chip'));

  const handleFilterClick = (clickedChip) => {
    const filter = clickedChip.dataset.filter;

    if (filter === 'all') {
      // If "All" is clicked, clear others and set All
      activeFilters.clear();
      activeFilters.add('all');
    } else {
      // If specific category is clicked
      activeFilters.delete('all'); // Remove 'all' first

      if (activeFilters.has(filter)) {
        activeFilters.delete(filter);
      } else {
        activeFilters.add(filter);
      }

      // If nothing left, revert to All
      if (activeFilters.size === 0) {
        activeFilters.add('all');
      }
    }

    // Update UI classes
    updateFilterUI();
    // Update Grid
    updateGrid();
  };

  const updateFilterUI = () => {
    chips.forEach(c => {
      const f = c.dataset.filter;
      const isActive = activeFilters.has(f);
      c.classList.toggle('is-active', isActive);
    });
  };

  chips.forEach(c => c.addEventListener('click', () => handleFilterClick(c)));

  // ----- Search -----
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      updateGrid();
    });
  }

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
  if (toggle && header) {
    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
      header.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // init
  buildTiles(gallery); // Initial build with full gallery
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
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) copyText(textToCopy, btn);
    });
  });
})();
