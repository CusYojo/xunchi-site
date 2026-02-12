(() => {
  const gallery = Array.isArray(window.__GALLERY__) ? window.__GALLERY__ : [];
  const grid = document.getElementById('grid');
  const searchInput = document.getElementById('search-input');

  // State for filters
  let activeFilters = new Set(['all']);
  let activeYear = 'all';
  let searchTerm = '';

  const CATEGORY_NAMES = {
    'double-ply': 'Double Ply Blanket',
    'sherpa': 'Sherpa Blanket',
    'flannel': 'Flannel Blanket',
    'coral-fleece': 'Coral Fleece Blanket',
    'polar-fleece': 'Polar Fleece Blanket',
    'fleece': 'Fleece Blanket',
    'digital-printing': 'Digital Print Blanket',
    'picnic': 'Picnic Mat',
    'jacquard-sherpa': 'Jacquard Sherpa Blanket',
    'jacquard-polar-fleece': 'Jacquard Polar Fleece Blanket',
    'bubble-fleece': 'Bubble Fleece Blanket',
    'glow-in-the-dark': 'Glow-in-the-Dark Blanket',
    'composite-blanket': 'Composite Blanket',
    'tv-blanket': 'TV Blanket',
    'sewn-blanket': 'Sewn Blanket',
    'bath-towel': 'Bath Towel',
    'face-mask': 'Face Mask',
    'apron': 'Apron',
    'cushion': 'Cushion',
    'shawl': 'Shawl',
    'others': 'Other Textile'
  };

  const getCategoryLabel = (cat) => {
    return CATEGORY_NAMES[cat] || cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
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

    // 2. Year Check
    if (activeYear !== 'all') {
      if (String(item.year) !== activeYear) {
        return false;
      }
    }

    // 3. Category Check
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
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-light);">
        <p style="font-size: 18px; margin-bottom: 16px;">Due to copyright protection, some exclusive designs are not displayed publicly.</p>
        <a href="#contact" class="btn btn-primary">Contact us for full catalog</a>
      </div>`;
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
          <span>${item.year || ''}</span>
        </div>
      `;

      // Pass the CURRENT filtered list to the lightbox
      el.addEventListener('click', () => openLightbox(displayItems, idx));
      grid.appendChild(el);
    });

    // hook new tiles into reveal observer
    revealObserve();
  };

  const CATEGORY_PRIORITY = [
    'double-ply',
    'sherpa',
    'flannel',
    'coral-fleece',
    'polar-fleece',
    'fleece',
    'digital-printing',
    'picnic',
    'jacquard-sherpa',
    'jacquard-polar-fleece',
    'bubble-fleece',
    'glow-in-the-dark',
    'composite-blanket',
    'tv-blanket',
    'sewn-blanket',
    'bath-towel',
    'face-mask',
    'apron',
    'cushion',
    'shawl',
    'others'
  ];

  // Sort helper:
  // If "All" years/categories: Group by Category Priority, then Year Desc.
  // Else: Just Year Desc.
  const sortItems = (items) => {
    return items.sort((a, b) => {
      // 1. If "All Categories" is active, prioritize by Category Order
      if (activeFilters.has('all')) {
        const idxA = CATEGORY_PRIORITY.indexOf(a.category);
        const idxB = CATEGORY_PRIORITY.indexOf(b.category);
        // Put unknown items at the end
        const safeIdxA = idxA === -1 ? 999 : idxA;
        const safeIdxB = idxB === -1 ? 999 : idxB;

        if (safeIdxA !== safeIdxB) {
          return safeIdxA - safeIdxB;
        }
      }

      // 2. Secondary Sort: Year Descending
      const yearA = parseInt(a.year) || 0;
      const yearB = parseInt(b.year) || 0;
      return yearB - yearA;
    });
  };

  const updateGrid = () => {
    // ----- Fallback Logic -----
    let effectiveYear = activeYear;

    // If searching by year (and not 'all'), check if we have results
    if (activeYear !== 'all') {
      // Get all items matching CURRENT CATEGORY (ignore year for a moment)
      const categoryMatches = gallery.filter(item => {
        if (searchTerm) {
          const lowerTitle = (item.title || '').toLowerCase();
          if (!lowerTitle.includes(searchTerm)) return false;
        }
        if (activeFilters.has('all')) return true;
        return activeFilters.has(item.category || 'others');
      });

      // Check if any match the requested year
      const hasStrictMatch = categoryMatches.some(item => String(item.year) === activeYear);

      if (!hasStrictMatch && categoryMatches.length > 0) {
        // No match for this year? Find previous available year
        // Get all unique years available for this category
        const availableYears = [...new Set(categoryMatches.map(i => parseInt(i.year) || 0))].sort((a, b) => b - a);
        const targetYearInt = parseInt(activeYear);

        // Find first year SMALLER than target
        const fallback = availableYears.find(y => y < targetYearInt);

        if (fallback) {
          effectiveYear = String(fallback);
          console.log(`Fallback: No items for ${activeYear}, showing ${effectiveYear}`);
          // Optional: Update UI to show we fell back?
          // For now, silent fallback as requested ("User just sees photos")
        } else {
          // If no previous year (e.g. we are at oldest), maybe show *any* newest?
          // Or just let it be empty. Requirement said "Show previous", if undefined, maybe Show Newest?
          // Let's stick to "Previous". If none, maybe keep activeYear (empty) or show availableYears[0]?
          // Let's fallback to the *closest available* if previous fails? 
          // Requirement: "Show previous available".
          if (availableYears.length > 0) {
            effectiveYear = String(availableYears[0]); // Just show *something* (Newest available) if we can't find older?
            // Or stick to strict "Previous". If I select 2020 and only 2025 exists, "Previous" is impossible.
            // Let's assume they want to see *some* data. I'll default to the newest available if strictly previous fails.
          }
        }
      }
    }

    // Now filter using effectiveYear
    const filtered = gallery.filter(item => {
      // Search
      if (searchTerm) {
        const lowerTitle = (item.title || '').toLowerCase();
        if (!lowerTitle.includes(searchTerm)) return false;
      }

      // Year (Effective)
      if (effectiveYear !== 'all') {
        if (String(item.year) !== effectiveYear) return false;
      }

      // Category
      if (activeFilters.has('all')) return true;
      return activeFilters.has(item.category || 'others');
    });

    const sorted = sortItems(filtered);
    buildTiles(sorted);
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

  // ----- Filters (Multi-select Category & Single-select Year) -----
  const categoryChips = Array.from(document.querySelectorAll('#category-filters .chip'));
  const yearChips = Array.from(document.querySelectorAll('#year-filters .chip'));

  // Category Filter Handler
  const handleCategoryClick = (clickedChip) => {
    const filter = clickedChip.dataset.filter;

    if (filter === 'all') {
      activeFilters.clear();
      activeFilters.add('all');
    } else {
      activeFilters.delete('all');
      if (activeFilters.has(filter)) {
        activeFilters.delete(filter);
      } else {
        activeFilters.add(filter);
      }
      if (activeFilters.size === 0) {
        activeFilters.add('all');
      }
    }
    updateCategoryUI();
    updateGrid();
  };

  const updateCategoryUI = () => {
    categoryChips.forEach(c => {
      const f = c.dataset.filter;
      const isActive = activeFilters.has(f);
      c.classList.toggle('is-active', isActive);
    });
  };

  categoryChips.forEach(c => c.addEventListener('click', () => handleCategoryClick(c)));

  // Year Filter Handler
  const handleYearClick = (clickedChip) => {
    const year = clickedChip.dataset.year;
    activeYear = year;
    updateYearUI();
    updateGrid();
  };

  const updateYearUI = () => {
    yearChips.forEach(c => {
      const y = c.dataset.year;
      const isActive = (y === activeYear);
      c.classList.toggle('is-active', isActive);
    });
  };

  yearChips.forEach(c => c.addEventListener('click', () => handleYearClick(c)));

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
  // Sort gallery initially
  gallery.sort((a, b) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0));
  buildTiles(gallery); // Initial build with full gallery
  revealObserve();

  // ----- Homepage Rotation Logic -----
  // Check if we are on the homepage showcase (has data-limit)
  const isShowcase = grid && grid.dataset.limit;
  if (isShowcase) {
    let showcaseInterval;

    // Function to refresh showcase products
    const refreshShowcase = () => {
      const shuffled = [...gallery].sort(() => 0.5 - Math.random());
      buildTiles(shuffled);

      // Slow down animation for showcase tiles
      const tiles = grid.querySelectorAll('.tile');
      tiles.forEach(t => {
        t.style.transition = 'all 1.5s ease-in-out';
      });
    };

    const startRotation = () => {
      showcaseInterval = setInterval(refreshShowcase, 9000); // 9s interval
    };

    // Start rotation
    startRotation();

    // Manual refresh button
    const refreshBtn = document.getElementById('refresh-showcase');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        // Clear existing interval
        clearInterval(showcaseInterval);
        // Immediately refresh
        refreshShowcase();
        // Restart rotation timer
        startRotation();
      });
    }

    // Optional: Pause on hover? User didn't ask, but good UX.
    // grid.addEventListener('mouseenter', () => clearInterval(showcaseInterval));
    // grid.addEventListener('mouseleave', startRotation);
  }

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
