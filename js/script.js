(() => {
  'use strict';

  const PREFERS_REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     1. DATA
     ============================================================
     image: path ke foto kompetisi (taruh file-nya di assets/images/).
     guideLink / registerLink: isi dengan URL asli per cabang lomba
     (Google Form, Linktree, PDF guidebook, dll). Biarkan '#' kalau
     link belum tersedia — tombol otomatis menampilkan toast
     "segera tersedia" selama nilainya masih '#'.
     ============================================================ */
  const COMPETITIONS = [
    { id: 'futsal',   title: 'futsal',   badges: ['SMA', 'Putra', 'Beregu'],                image: 'assets/images/Futsal.png',   guideLink: '#', registerLink: 'https://docs.google.com/forms/d/1NYAzoVr3Y3KIzko4cFVP427HqxuG1IcuzATRBFXQ5S8/preview?edit_requested=true' },
    { id: 'basket',   title: 'basket',   badges: ['SMA', 'Putra', 'Beregu'],                image: 'assets/images/Basket.png',   guideLink: '#', registerLink: 'https://docs.google.com/forms/d/1OFeVYzD7bTWgM_vgFPjqmfqxt6ErytbjEzI3cg2iyJY/preview?edit_requested=true' },
    { id: 'ldbi',     title: 'LDBI',     badges: ['SMA', 'Putra', 'Beregu'],                image: 'assets/images/LDBI.png',     guideLink: '#', registerLink: 'https://docs.google.com/forms/d/1NTlOBKmNqxT19zi9dHdm9gc3zcYv_Wf2Z5tvM3VkIHs/preview?edit_requested=true' },
    { id: 'lccu',     title: 'LCCU',     badges: ['SMA', 'Putra', 'Beregu'],                image: 'assets/images/LCCU.png',     guideLink: '#', registerLink: 'https://docs.google.com/forms/d/1UgVlWMcf20rIiU_qgx2Xvp-2OPFQ7zpRvRSZjqE3Y0A/preview?edit_requested=true' },
    { id: 'khitobah', title: 'khitobah', badges: ['SMP/SMA Sederajat', 'Putra', 'Individu'], image: 'assets/images/KHITOBAH.png', guideLink: '#', registerLink: 'https://docs.google.com/forms/d/1JPKjfCeBFNi0EmxGbw5itHodeWLeu-odnQRUuttjrf0/preview?edit_requested=true' },
    { id: 'speech',   title: 'speech',   badges: ['SMP/SMA Sederajat', 'Putra', 'Individu'], image: 'assets/images/SPEECH.png',   guideLink: '#', registerLink: 'https://docs.google.com/forms/d/1xjPXqN6peCoDyd-HFGCfCHKPRpCDmTxUrPTTnw1is20/preview?edit_requested=true' },
    { id: 'mhq',      title: 'mhq',      badges: ['SMP/SMA Sederajat', 'Putra', 'Individu'], image: 'assets/images/MHQ.png',      guideLink: '#', registerLink: 'https://docs.google.com/forms/d/1dEIyLsfUu1VZ4L5_jccIZNKYzoWwJK2tiaMi0IFYlWU/preview?edit_requested=true' },
  ];

  const BRACKETS = {
    futsal: {
      teams: ['Tim 1', 'Tim 2', 'Tim 3', 'Tim 4', 'Tim 5', 'Tim 6', 'Tim 7', 'Tim 8'],
    },
    basket: {
      teams: ['Tim A', 'Tim B', 'Tim C', 'Tim D', 'Tim E', 'Tim F', 'Tim G', 'Tim H'],
    },
    ldbi: {
      teams: ['Regu 1', 'Regu 2', 'Regu 3', 'Regu 4', 'Regu 5', 'Regu 6', 'Regu 7', 'Regu 8'],
    },
    lccu: {
      teams: ['Regu 1', 'Regu 2', 'Regu 3', 'Regu 4', 'Regu 5', 'Regu 6', 'Regu 7', 'Regu 8'],
    },
  };

  const FAQS = [
    {
      q: 'Siapa penyelenggara ZAD SERIES?',
      a: 'ZAD SERIES diselenggarakan secara mandiri oleh SMA ZAD International Quranic Boarding School (SMA ZAD IQBS) Cianjur, melibatkan seluruh elemen siswa dan sekolah.',
    },
    {
      q: 'Di mana lokasi pelaksanaan zad series?',
      a: 'Seluruh rangkaian acara ZAD SERIES 2.0 dilaksanakan di lingkungan kampus SMA ZAD International Quranic Boarding School, Cianjur, Jawa Barat.',
    },
    {
      q: 'Kapan pelaksanaan nya?',
      a: 'Jadwal lengkap pelaksanaan akan diumumkan melalui akun Instagram resmi ZAD SERIES dan papan pengumuman sekolah menjelang hari pelaksanaan.',
    },
    {
      q: 'Ada kegiatan apa aja?',
      a: 'ZAD SERIES 2.0 menghadirkan kompetisi futsal dan basket (Piala Mudir), lomba kreatif LDBI, LCCU, khitobah, speech, dan MHQ, talkshow inspiratif Zad Talk, serta area Bazaar kolaboratif.',
    },
  ];

  /* ============================================================
     2. RENDER: COMPETITION CARDS
     ============================================================ */
  function renderCards() {
    const grid = document.getElementById('cards-grid');
    if (!grid) return;

    const html = COMPETITIONS.map((comp) => {
      const isRealLink = (url) => url && url !== '#';
      const guideAttrs = isRealLink(comp.guideLink) ? 'target="_blank" rel="noopener"' : '';
      const registerAttrs = isRealLink(comp.registerLink) ? 'target="_blank" rel="noopener"' : '';
      return `
      <article class="card reveal" data-reveal="up">
        <div class="card__image">
          <img src="${comp.image}" alt="Gambar kompetisi ${comp.title}" loading="lazy"
               onerror="this.closest('.card__image').classList.add('card__image--empty'); this.remove();">
        </div>
        <h3 class="card__title font-display">${comp.title}</h3>
        <div class="card__badges">
          ${comp.badges.map((b) => `<span class="badge">${b}</span>`).join('')}
        </div>
        <div class="card__actions">
          <a class="btn btn--guide" href="${comp.guideLink}" ${guideAttrs} data-comp="${comp.id}" data-action="guidebook">Guidebook</a>
          <a class="btn btn--register" href="${comp.registerLink}" ${registerAttrs} data-comp="${comp.id}" data-action="registration">Registration</a>
        </div>
      </article>
    `;
    }).join('');

    grid.innerHTML = html;
  }

  /* ============================================================
     2b. TOAST UTILITY
     ============================================================ */
  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }

  function initCardActions() {
    const grid = document.getElementById('cards-grid');
    if (!grid) return;
    grid.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-action]');
      if (!link) return;
      const href = link.getAttribute('href');
      // Only intercept placeholder links; real URLs (once wired up) work normally.
      if (!href || href === '#') {
        e.preventDefault();
        const comp = link.dataset.comp || '';
        const label = link.dataset.action === 'guidebook' ? 'Guidebook' : 'Formulir registrasi';
        showToast(`${label} untuk ${comp} akan segera tersedia ✨`);
      }
    });
  }

  /* ============================================================
     3. RENDER: BRACKET TREE
     ============================================================ */
  function renderBracket(category) {
    const tree = document.getElementById('bracket-tree');
    if (!tree) return;
    const data = BRACKETS[category] || BRACKETS.futsal;
    const teams = data.teams;

    const leftTeams = teams.slice(0, 4);
    const rightTeams = teams.slice(4, 8);

    const teamSlots = (arr) => arr.map((t) => `<div class="slot">${t}</div>`).join('');
    const scoreSlots = (n) => Array.from({ length: n }, () => `<div class="slot slot--placeholder">-</div>`).join('');

    tree.innerHTML = `
      <div class="bracket__col bracket__col--r0">${teamSlots(leftTeams)}</div>
      <div class="bracket__col bracket__col--r1">${scoreSlots(2)}</div>
      <div class="bracket__col bracket__col--final">${scoreSlots(1)}</div>
      <div class="bracket__col bracket__col--r1">${scoreSlots(2)}</div>
      <div class="bracket__col bracket__col--r0">${teamSlots(rightTeams)}</div>
    `;
  }

  function initBracketTabs() {
    const tabs = document.getElementById('bracket-tabs');
    if (!tabs) return;
    tabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-pill');
      if (!btn) return;
      tabs.querySelectorAll('.tab-pill').forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      renderBracket(btn.dataset.cat);
    });
  }

  function initBracketDragScroll() {
    const scroller = document.getElementById('bracket-scroll');
    const hint = document.getElementById('bracket-hint');
    if (!scroller) return;

    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    const hideHint = () => hint && hint.classList.add('is-hidden');

    scroller.addEventListener('pointerdown', (e) => {
      isDown = true;
      scroller.classList.add('is-dragging');
      startX = e.clientX;
      startScroll = scroller.scrollLeft;
      scroller.setPointerCapture(e.pointerId);
    });
    scroller.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      scroller.scrollLeft = startScroll - (e.clientX - startX);
    });
    const endDrag = () => { isDown = false; scroller.classList.remove('is-dragging'); };
    scroller.addEventListener('pointerup', endDrag);
    scroller.addEventListener('pointerleave', endDrag);
    scroller.addEventListener('scroll', hideHint, { passive: true, once: true });
  }

  /* ============================================================
     4. RENDER: FAQ ACCORDION
     ============================================================ */
  function renderAccordion() {
    const wrap = document.getElementById('accordion');
    if (!wrap) return;

    wrap.innerHTML = FAQS.map((item, i) => `
      <div class="accordion-item" data-index="${i}">
        <button class="accordion-trigger" id="faq-trigger-${i}" aria-expanded="false" aria-controls="faq-panel-${i}">
          <span>${item.q}</span>
          <svg class="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="accordion-panel" id="faq-panel-${i}" role="region" aria-labelledby="faq-trigger-${i}">
          <div class="accordion-panel__inner">
            <p>${item.a}</p>
          </div>
        </div>
      </div>
    `).join('');

    wrap.addEventListener('click', (e) => {
      const trigger = e.target.closest('.accordion-trigger');
      if (!trigger) return;
      const item = trigger.closest('.accordion-item');
      const wasOpen = item.classList.contains('is-open');

      wrap.querySelectorAll('.accordion-item.is-open').forEach((openItem) => {
        openItem.classList.remove('is-open');
        openItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
      });

      if (!wasOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    // keyboard: allow arrow up/down between triggers
    const triggers = () => Array.from(wrap.querySelectorAll('.accordion-trigger'));
    wrap.addEventListener('keydown', (e) => {
      if (!['ArrowDown', 'ArrowUp'].includes(e.key)) return;
      const list = triggers();
      const idx = list.indexOf(document.activeElement);
      if (idx === -1) return;
      e.preventDefault();
      const next = e.key === 'ArrowDown' ? (idx + 1) % list.length : (idx - 1 + list.length) % list.length;
      list[next].focus();
    });
  }

  /* ============================================================
     5. NAVBAR: mobile menu + hide-on-scroll
     ============================================================ */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const burger = document.getElementById('burger');
    const nav = document.getElementById('primary-nav');
    if (!navbar || !burger || !nav) return;

    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    nav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    let lastY = window.scrollY;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > lastY && y > 140 && !nav.classList.contains('is-open')) {
          navbar.classList.add('is-hidden');
        } else {
          navbar.classList.remove('is-hidden');
        }
        lastY = y;
        ticking = false;
      });
    }, { passive: true });
  }

  /* ============================================================
     6. SCROLL REVEAL via IntersectionObserver
     ============================================================ */
  function initReveal() {
    const targets = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || targets.length === 0) {
      targets.forEach((t) => t.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    targets.forEach((t) => observer.observe(t));
  }

  /* ============================================================
     7. SCROLL PROGRESS BAR
     ============================================================ */
  function initScrollProgress() {
    const bar = document.querySelector('#scroll-progress span');
    if (!bar) return;
    let ticking = false;
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (scrolled / max) * 100 : 0;
      bar.style.width = pct + '%';
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  /* ============================================================
     8. SCROLLSPY — highlight active nav link
     ============================================================ */
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');
    if (!sections.length || !links.length || !('IntersectionObserver' in window)) return;

    const linkFor = (id) => Array.from(links).find((l) => l.getAttribute('href') === `#${id}`);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = linkFor(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    }, { threshold: 0.35, rootMargin: '-90px 0px -40% 0px' });

    sections.forEach((s) => observer.observe(s));
  }

  /* ============================================================
     9. BACK TO TOP
     ============================================================ */
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('is-visible', window.scrollY > 480);
    }, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: PREFERS_REDUCED_MOTION ? 'auto' : 'smooth' });
    });
  }

  /* ============================================================
     10. COUNTDOWN TIMER
     ============================================================ */
  function initCountdown() {
    const el = document.getElementById('countdown');
    if (!el) return;
    const target = new Date(el.dataset.target).getTime();
    if (Number.isNaN(target)) return;

    const nums = {
      days: el.querySelector('[data-unit="days"]'),
      hours: el.querySelector('[data-unit="hours"]'),
      minutes: el.querySelector('[data-unit="minutes"]'),
      seconds: el.querySelector('[data-unit="seconds"]'),
    };
    const pad = (n) => String(Math.max(n, 0)).padStart(2, '0');

    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        Object.values(nums).forEach((n) => n && (n.textContent = '00'));
        el.querySelector('.countdown__label').textContent = 'ZAD Series 2.0 sedang berlangsung!';
        clearInterval(timer);
        return;
      }
      const s = Math.floor(diff / 1000);
      nums.days.textContent = pad(Math.floor(s / 86400));
      nums.hours.textContent = pad(Math.floor((s % 86400) / 3600));
      nums.minutes.textContent = pad(Math.floor((s % 3600) / 60));
      nums.seconds.textContent = pad(s % 60);
    }
    tick();
    const timer = setInterval(tick, 1000);
  }

  /* ============================================================
     11. STAT COUNTER (count-up on scroll into view)
     ============================================================ */
  function initStatCounters() {
    const stats = document.querySelectorAll('.stat__num');
    if (!stats.length) return;

    const animateStat = (node) => {
      const target = parseInt(node.dataset.count, 10) || 0;
      const suffix = node.dataset.suffix || '';
      if (PREFERS_REDUCED_MOTION) {
        node.textContent = target + suffix;
        return;
      }
      const duration = 1200;
      const start = performance.now();
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else node.classList.add('is-counting');
      }
      requestAnimationFrame(step);
    };

    if (!('IntersectionObserver' in window)) {
      stats.forEach(animateStat);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStat(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    stats.forEach((s) => observer.observe(s));
  }

  /* ============================================================
     12. HERO AMBIENT PARTICLES
     ============================================================ */
  function initHeroParticles() {
    if (PREFERS_REDUCED_MOTION) return;
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const count = 14;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'hero__particle';
      const size = 3 + Math.random() * 6;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.bottom = `-${Math.random() * 20}px`;
      p.style.animationDuration = `${8 + Math.random() * 10}s`;
      p.style.animationDelay = `${Math.random() * 8}s`;
      hero.appendChild(p);
    }
  }

  /* ============================================================
     13. CARD TILT (subtle 3D hover)
     ============================================================ */
  function initCardTilt() {
    if (PREFERS_REDUCED_MOTION || matchMedia('(pointer: coarse)').matches) return;
    const grid = document.getElementById('cards-grid');
    if (!grid) return;

    grid.addEventListener('pointermove', (e) => {
      const card = e.target.closest('.card');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
    });
    grid.addEventListener('pointerleave', (e) => {
      const card = e.target.closest('.card');
      if (card) card.style.transform = '';
    }, true);
  }

  /* ============================================================
     INIT
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    renderCards();
    renderBracket('futsal');
    renderAccordion();
    initBracketTabs();
    initNavbar();
    initReveal(); // re-run after dynamic content is in the DOM
  });
})();
