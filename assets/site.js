/* HLA IMTX — hero animations. Dependencies load here; Webflow embeds stay unchanged. */
(() => {
  'use strict';
  if (window.HLAIMTX) return;
  const app = { version: '0.2.0', ready: false };
  window.HLAIMTX = app;
  const CDN = 'https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/';

  function loadScript(file, globalName) {
    if (window[globalName]) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      const timer = setTimeout(() => reject(new Error(`Timeout: ${file}`)), 10000);
      script.src = CDN + file;
      script.onload = () => {
        clearTimeout(timer);
        window[globalName] ? resolve() : reject(new Error(`Missing: ${globalName}`));
      };
      script.onerror = () => {
        clearTimeout(timer);
        reject(new Error(`Could not load: ${file}`));
      };
      document.head.append(script);
    });
  }

  // The Webflow image's original path and gradient, preserved as inline SVG.
  // Restrict replacement to this asset so future image changes remain intact.
  function inlineLine(image, index) {
    if (image.tagName !== 'IMG' || !image.src.includes('6aa7cdd35e1e0993e97e2c3f_')) return image;
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    const gradientId = `hla-hero-line-gradient-${index}`;
    for (const attr of image.attributes) {
      if (['class', 'style', 'id'].includes(attr.name)) svg.setAttribute(attr.name, attr.value);
    }
    svg.setAttribute('viewBox', '0 0 223 1222');
    svg.setAttribute('width', '223');
    svg.setAttribute('height', '1222');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.innerHTML = `<path d="M4.00006 0V32C4.00006 173.992 219 29.233 219 237C219 403.214 219 1165.3 219 1172.26V1222" stroke="url(#${gradientId})" stroke-width="8"/><defs><linearGradient id="${gradientId}" x1="111.5" y1="-67.3781" x2="111.5" y2="1773" gradientUnits="userSpaceOnUse"><stop offset="0.0307434" stop-color="#F80001" stop-opacity="0"/><stop offset="0.119061" stop-color="#F80001"/><stop offset="0.913585" stop-color="#F80001"/><stop offset="1" stop-color="#F80001" stop-opacity="0"/></linearGradient></defs>`;
    image.replaceWith(svg);
    return svg;
  }

  async function init() {
    const hero = document.querySelector('.hero');
    if (!hero || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      app.ready = true;
      return;
    }
    const hla = hero.querySelectorAll('.hero__hla');
    const texts = hero.querySelectorAll('.hero__text');
    const lineImages = document.querySelectorAll('.hero__line');
    const pending = [...hla, ...texts, ...lineImages];
    pending.forEach(el => el.classList.add('hla-hero-pending'));
    let failSafe = setTimeout(() => pending.forEach(el => el.classList.remove('hla-hero-pending')), 12000);
    try {
      await loadScript('gsap.min.js', 'gsap');
      await Promise.all([
        loadScript('ScrollTrigger.min.js', 'ScrollTrigger'),
        loadScript('SplitText.min.js', 'SplitText'),
        Promise.race([document.fonts?.ready, new Promise(resolve => setTimeout(resolve, 2000))]),
      ]);
      const { gsap, ScrollTrigger, SplitText } = window;
      gsap.registerPlugin(ScrollTrigger, SplitText);
      pending.forEach(el => el.classList.remove('hla-hero-pending'));
      clearTimeout(failSafe);
      const lines = [...lineImages].map(inlineLine);
      const media = gsap.matchMedia();
      app.media = media;
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const splits = [];
        const intro = gsap.timeline();
        if (hla.length) intro.from(hla, { opacity: 0, duration: 1.1, ease: 'power2.out' }, 0);
        texts.forEach(text => {
          splits.push(SplitText.create(text, {
            type: 'lines', mask: 'lines', autoSplit: true,
            linesClass: 'hla-text-line',
            onSplit(self) {
              // Returned tween lets SplitText preserve progress on font/width changes.
              return gsap.from(self.lines, {
                yPercent: 105, opacity: 0, duration: 0.85,
                stagger: 0.14, delay: 0.25, ease: 'power3.out',
              });
            },
          }));
        });
        lines.forEach(line => {
          const paths = line.querySelectorAll('path');
          if (paths.length) {
            paths.forEach(path => {
              const length = path.getTotalLength();
              intro.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, {
                strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut',
              }, 0.65);
            });
          } else {
            // If the asset changes, keep supporting top-to-bottom image reveal.
            intro.fromTo(line, { clipPath: 'inset(0 0 100% 0)' }, {
              clipPath: 'inset(0 0 0% 0)', duration: 1.8, ease: 'power2.inOut',
            }, 0.65);
          }
        });
        const orbs = hero.querySelectorAll('.hero__orbs');
        if (orbs.length) gsap.to(orbs, {
          x: () => -Math.min(innerWidth * 0.12, 180),
          y: () => Math.min(innerHeight * 0.22, 200),
          scale: 1.08, transformOrigin: 'center center', ease: 'none',
          scrollTrigger: {
            trigger: hero, start: 'top top', end: 'bottom top',
            scrub: 0.8, invalidateOnRefresh: true,
          },
        });
        return () => splits.forEach(split => split.revert());
      });
      ScrollTrigger.refresh();
      app.ready = true;
    } catch (error) {
      clearTimeout(failSafe);
      pending.forEach(el => el.classList.remove('hla-hero-pending'));
      app.media?.revert();
      app.ready = true;
      app.error = error.message;
      console.warn('[HLA IMTX] Animations unavailable; content remains visible.', error);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
