/* HLA IMTX — hero and scroll animations. Dependencies load here; Webflow embeds stay unchanged. */
(() => {
  'use strict';
  if (window.HLAIMTX) return;
  const app = { version: '0.4.0', ready: false };
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


  const LINE_SELECTOR = '.line__red, .road__line, .road__line-red, .roadmap__line, .prame__line, .test__line-top, .test__line-down';
  const TEXT_SELECTOR = '.heading__big, .p__big, .stats, .substats, .heading__bxl, .p__medium, .sticky__title, .prame__text, .prame__stats-title, .p__medium-bis, .test__heading';
  const FADE_SELECTOR = '.number__wrapper, .hla__logo';
  // Verified original Webflow assets; no runtime SVG request or untrusted markup.
  const LINE_ASSETS = {"6aa916889d83bf115f3fa0a6_Line%2026.svg": "<svg width=\"1079\" height=\"810\" viewBox=\"0 0 1079 810\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M4.00009 810C4.00008 485.084 4.00011 235 4.00011 235C4.00011 185 32 173 75 173C118 173 946.999 173 1013 173C1079 173 1074 125 1074 95L1074 -3.78333e-09\" stroke=\"url(#paint0_linear_1056_7)\" stroke-width=\"8\"/>\n<defs>\n<linearGradient id=\"paint0_linear_1056_7\" x1=\"23.5004\" y1=\"1401.16\" x2=\"23.5004\" y2=\"1664\" gradientUnits=\"userSpaceOnUse\">\n<stop stop-color=\"#A2B3E2\"/>\n<stop offset=\"1\" stop-color=\"#A2B3E2\" stop-opacity=\"0\"/>\n</linearGradient>\n</defs>\n</svg>\n", "6aa915ba58305f81ee6a7822_lineline.svg": "<svg width=\"639\" height=\"810\" viewBox=\"0 0 639 810\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M4.00009 810C4.00008 485.084 4.00005 235 4.00005 235C4.00005 185 32 173 75 173C118 173 506.999 173 572.999 173C638.999 173 633.999 125 633.999 95L633.999 -3.78335e-09\" stroke=\"url(#paint0_linear_1056_7)\" stroke-width=\"8\"/>\n<defs>\n<linearGradient id=\"paint0_linear_1056_7\" x1=\"23.5004\" y1=\"1401.16\" x2=\"23.5004\" y2=\"1664\" gradientUnits=\"userSpaceOnUse\">\n<stop stop-color=\"#A2B3E2\"/>\n<stop offset=\"1\" stop-color=\"#A2B3E2\" stop-opacity=\"0\"/>\n</linearGradient>\n</defs>\n</svg>\n", "6aa91354731c1bcd53656990_67ee19b41f4b26ae667824850d5d4fb2_Line%2018.svg": "<svg width=\"8\" height=\"1179\" viewBox=\"0 0 8 1179\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<line x1=\"3.57636\" y1=\"-1.56328e-07\" x2=\"3.57641\" y2=\"1179\" stroke=\"url(#paint0_linear_1056_5)\" stroke-width=\"7.15272\"/>\n<defs>\n<linearGradient id=\"paint0_linear_1056_5\" x1=\"-0.499994\" y1=\"962.144\" x2=\"-0.499966\" y2=\"1179\" gradientUnits=\"userSpaceOnUse\">\n<stop stop-color=\"#A2B3E2\"/>\n<stop offset=\"1\" stop-color=\"#A2B3E2\" stop-opacity=\"0\"/>\n</linearGradient>\n</defs>\n</svg>\n", "6aa913541f1bf02a89904260_Vector%208.svg": "<svg width=\"223\" height=\"634\" viewBox=\"0 0 223 634\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M219 622.257C219 615.297 219 690.706 219 524.493C219 316.726 4 302.696 4 160.705V0\" stroke=\"url(#paint0_linear_1056_6)\" stroke-width=\"8\"/>\n<defs>\n<linearGradient id=\"paint0_linear_1056_6\" x1=\"111.5\" y1=\"-67.3781\" x2=\"111.5\" y2=\"633\" gradientUnits=\"userSpaceOnUse\">\n<stop offset=\"0.1\" stop-color=\"#F80001\" stop-opacity=\"0\"/>\n<stop offset=\"0.25\" stop-color=\"#F80001\"/>\n<stop offset=\"0.85\" stop-color=\"#F80001\"/>\n<stop offset=\"1\" stop-color=\"#F80001\" stop-opacity=\"0\"/>\n</linearGradient>\n</defs>\n</svg>\n", "6aa7cdd37c6fd66c86f97b11_Vector%206.svg": "<svg width=\"8\" height=\"372\" viewBox=\"0 0 8 372\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M4 0L3.99998 372\" stroke=\"url(#paint0_linear_1034_53)\" stroke-width=\"8\"/>\n<defs>\n<linearGradient id=\"paint0_linear_1034_53\" x1=\"-221.5\" y1=\"-16.3517\" x2=\"-221.5\" y2=\"372\" gradientUnits=\"userSpaceOnUse\">\n<stop offset=\"0.00411971\" stop-color=\"#F80001\" stop-opacity=\"0\"/>\n<stop offset=\"0.284211\" stop-color=\"#F80001\"/>\n<stop offset=\"0.768421\" stop-color=\"#F80001\"/>\n<stop offset=\"1\" stop-color=\"#F80001\" stop-opacity=\"0\"/>\n</linearGradient>\n</defs>\n</svg>\n", "6aa8f462ad74b0bd71f04c7f_80421202a09a858e74cb62a1f74d4f78_Vector%208.svg": "<svg width=\"9\" height=\"770\" viewBox=\"0 0 9 770\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M4.45312 0L4.45316 770\" stroke=\"url(#paint0_linear_1054_2)\" stroke-width=\"8.90572\"/>\n<defs>\n<linearGradient id=\"paint0_linear_1054_2\" x1=\"-221.047\" y1=\"-33.8461\" x2=\"-221.047\" y2=\"770\" gradientUnits=\"userSpaceOnUse\">\n<stop offset=\"0.00411971\" stop-color=\"#F80001\" stop-opacity=\"0\"/>\n<stop offset=\"0.284211\" stop-color=\"#F80001\"/>\n<stop offset=\"0.768421\" stop-color=\"#F80001\"/>\n<stop offset=\"1\" stop-color=\"#F80001\" stop-opacity=\"0\"/>\n</linearGradient>\n</defs>\n</svg>\n", "6aa7cdd314616b12a1c41548_Vector%209.svg": "<svg width=\"169\" height=\"456\" viewBox=\"0 0 169 456\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M4.00002 456C4.00002 441 4.00002 419.4 4.00002 397C4.00002 369 9.99997 341 59.0009 341C99.0009 341 26.999 341 91 341C165.001 341 165.001 286 165.001 262L165.001 -7.03759e-06\" stroke=\"url(#paint0_linear_1034_61)\" stroke-width=\"8\"/>\n<defs>\n<linearGradient id=\"paint0_linear_1034_61\" x1=\"272.5\" y1=\"0\" x2=\"272.5\" y2=\"456\" gradientUnits=\"userSpaceOnUse\">\n<stop stop-color=\"#F80001\" stop-opacity=\"0\"/>\n<stop offset=\"0.20614\" stop-color=\"#F80001\"/>\n<stop offset=\"0.872807\" stop-color=\"#F80001\"/>\n<stop offset=\"1\" stop-color=\"#F80001\" stop-opacity=\"0\"/>\n</linearGradient>\n</defs>\n</svg>\n"};

  function inlineScrollLine(image, index) {
    if (image.tagName !== 'IMG') return image;
    const source = LINE_ASSETS[image.src.split('/').pop()];
    if (!source) return image;
    const svg = new DOMParser().parseFromString(source, 'image/svg+xml').documentElement;
    // Let Webflow CSS and the viewBox set responsive dimensions, not SVG attributes.
    svg.removeAttribute('width');
    svg.removeAttribute('height');
    const ids = new Map();
    svg.querySelectorAll('[id]').forEach(el => {
      const oldId = el.id;
      const newId = `hla-scroll-${index}-${oldId}`;
      ids.set(oldId, newId);
      el.id = newId;
    });
    svg.querySelectorAll('*').forEach(el => {
      for (const attr of [...el.attributes]) {
        let value = attr.value;
        ids.forEach((next, previous) => { value = value.replaceAll(`url(#${previous})`, `url(#${next})`); });
        if (value !== attr.value) el.setAttribute(attr.name, value);
      }
    });
    for (const attr of image.attributes) {
      if (['class', 'style', 'id'].includes(attr.name)) svg.setAttribute(attr.name, attr.value);
    }
    svg.setAttribute('data-hla-scroll-svg', '');
    const box = svg.getAttribute('viewBox').split(/\s+/).map(Number);
    svg.style.aspectRatio = `${box[2]} / ${box[3]}`;
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    image.replaceWith(svg);
    return svg;
  }

  function scrollAnimations(gsap, SplitText, scrollLines, splits) {
    scrollLines.forEach(line => {
      const paths = [...line.querySelectorAll('path, line, polyline')].filter(path => !path.closest('defs'));
      const trigger = { trigger: line, start: 'top 100%', end: 'bottom 75%', scrub: 0.3, invalidateOnRefresh: true };
      if (!paths.length) {
        gsap.fromTo(line, { clipPath: 'inset(0 0 100% 0)' }, {
          clipPath: 'inset(0 0 0% 0)', ease: 'none', scrollTrigger: trigger,
        });
        return;
      }
      const timeline = gsap.timeline({ scrollTrigger: trigger });
      paths.forEach(path => {
        const length = path.getTotalLength();
        if (!length) return;
        const first = path.getPointAtLength(0);
        const last = path.getPointAtLength(length);
        // Negative dash offset reveals from the end when the source starts below it.
        const offset = first.y > last.y ? -length : length;
        timeline.fromTo(path, { strokeDasharray: `${length} ${length}`, strokeDashoffset: offset }, {
          strokeDashoffset: 0, ease: 'none', duration: 1,
        }, 0);
      });
    });

    const candidates = [...document.querySelectorAll(TEXT_SELECTOR)].filter(el =>
      !(matchMedia('(min-width: 768px)').matches && el.closest('.sticky') && el.matches('.sticky__title, .p__medium'))
    );
    // Do not split the same content twice if future Webflow classes are nested.
    const targets = candidates.filter(el => !candidates.some(parent => parent !== el && parent.contains(el)));
    targets.forEach(el => {
      if (!el.textContent.trim()) {
        gsap.from(el, { opacity: 0, y: 24, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
        return;
      }
      let revealed = false;
      splits.push(SplitText.create(el, {
        type: 'lines', mask: 'lines', autoSplit: true, linesClass: 'hla-scroll-text-line',
        onSplit(self) {
          if (revealed) {
            gsap.set(self.lines, { opacity: 1, yPercent: 0 });
            return;
          }
          return gsap.from(self.lines, {
            opacity: 0, yPercent: 105, duration: 0.6, stagger: 0.08, ease: 'power3.out',
            onStart: () => { revealed = true; },
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          });
        },
      }));
    });
    document.querySelectorAll(FADE_SELECTOR).forEach(el => {
      if (matchMedia('(min-width: 768px)').matches && el.closest('.sticky')) return;
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 100%', once: true },
      });
    });
  }

  function stickyAnimations(gsap, ScrollTrigger) {
    const cleanups = [];
    document.querySelectorAll('.sticky').forEach(section => {
      const visual = section.querySelector('.sticky__img-wrapper.is--1');
      if (!visual) return;
      const first = [...visual.querySelectorAll('.orbs.is--one, .orbs.is--two, .orbs.is--three, .orbs.is--four')];
      const second = [...visual.querySelectorAll('.orbs.is--one-bis, .orbs.is--two-bis, .orbs.is--three-bis, .orbs.is--four-bis')];
      const cells = visual.querySelectorAll('.cells__img');
      const blocks = [...section.querySelectorAll('.sticky__c-parent')].filter(el => el.querySelector('.sticky__title'));
      // Explicit combo classes take priority; published markup currently needs the structural fallback.
      function group(index) {
        const block = blocks[index - 1];
        return [...new Set([
          section.querySelector(`.sticky__title-wrapper.is--${index}`) || block?.querySelector('.sticky__title-wrapper'),
          section.querySelector(`.p__medium.is--${index}`) || block?.querySelector('.p__medium'),
        ].filter(Boolean))];
      }
      const groupOne = group(1), groupTwo = group(2);
      const saved = [...first, ...second, ...cells, ...groupOne, ...groupTwo].map(el => [el, el.getAttribute('style')]);
      let stage = -1, visible = false;
      let transitions = [];
      gsap.set([...first, ...second], { opacity: 0, scale: 0.7, transformOrigin: 'center center' });
      gsap.set(groupOne, { opacity: 1 });
      gsap.set(groupTwo, { opacity: 0.2 });
      gsap.set(cells, { opacity: 0.5 });
      const pulses = [first, second].map(orbs => gsap.fromTo(orbs, { scale: 1 }, {
        scale: 1.07, duration: 1.15, ease: 'sine.inOut', repeat: -1, yoyo: true,
        paused: true, immediateRender: false,
      }));
      function apply(next, force = false) {
        if (!force && stage === next) return;
        stage = next;
        section.dataset.hlaStickyStage = String(next + 1);
        transitions.forEach(tween => tween.kill());
        pulses.forEach(tween => tween.pause());
        transitions = [
          gsap.to(groupOne, { opacity: next === 0 ? 1 : 0.3, duration: 0.5, overwrite: 'auto' }),
          gsap.to(groupTwo, { opacity: next === 0 ? 0.2 : 1, duration: 0.5, overwrite: 'auto' }),
          gsap.to(cells, { opacity: next === 0 ? 0.5 : 1, duration: 0.5, overwrite: 'auto' }),
          gsap.to(next === 0 ? second : first, { opacity: 0, scale: 0.45, duration: 0.45, ease: 'power2.in' }),
          gsap.to(next === 0 ? first : second, {
            opacity: visible ? (next === 0 ? 0.7 : 1) : 0,
            scale: visible ? 1 : 0.7, duration: 0.55, ease: 'power2.out',
            onComplete: () => { if (visible && stage === next) pulses[next].restart(); },
          }),
        ];
      }
      // 50% of the available sticky travel: section height minus pinned viewport height.
      const phase = ScrollTrigger.create({
        trigger: section, start: 'top top', end: 'bottom bottom', invalidateOnRefresh: true,
        onUpdate: self => apply(self.progress >= 0.5 ? 1 : 0),
        onRefresh: self => apply(self.progress >= 0.5 ? 1 : 0),
      });
      const visibility = ScrollTrigger.create({
        trigger: section, start: 'top bottom', end: 'bottom top',
        onToggle: self => {
          visible = self.isActive;
          if (visible) apply(phase.progress >= 0.5 ? 1 : 0, true);
          else pulses.forEach(tween => tween.pause());
        },
      });
      visible = visibility.isActive;
      apply(phase.progress >= 0.5 ? 1 : 0, true);
      cleanups.push(() => {
        phase.kill(); visibility.kill();
        transitions.forEach(tween => tween.kill()); pulses.forEach(tween => tween.kill());
        saved.forEach(([el, style]) => style === null ? el.removeAttribute('style') : el.setAttribute('style', style));
        delete section.dataset.hlaStickyStage;
      });
    });
    return () => cleanups.forEach(cleanup => cleanup());
  }

  function redImageSequence(gsap, ScrollTrigger) {
    const cleanups = [];
    document.querySelectorAll('.red__wrapper-img').forEach(wrapper => {
      const images = [1, 2, 3].map(i => wrapper.querySelector(`.red__img.is--${i}`));
      if (images.some(image => !image)) return;
      images.forEach(image => { image.loading = 'eager'; });
      // Webflow rewrites image style attributes: keep our state in a separate data attribute.
      const update = self => {
        wrapper.dataset.hlaRedFrame = String(self.progress < 0.33 ? 1 : self.progress < 0.66 ? 2 : 3);
      };
      wrapper.dataset.hlaRedFrame = '1';
      const trigger = ScrollTrigger.create({
        trigger: wrapper, start: 'top 95%', end: 'bottom 30%', invalidateOnRefresh: true,
        onUpdate: update, onRefresh: update,
      });
      update(trigger);
      cleanups.push(() => { trigger.kill(); delete wrapper.dataset.hlaRedFrame; });
    });
    return () => cleanups.forEach(cleanup => cleanup());
  }

  async function init() {
    const hero = document.querySelector('.hero');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      app.ready = true;
      return;
    }
    const hla = hero?.querySelectorAll('.hero__hla') || [];
    const texts = hero?.querySelectorAll('.hero__text') || [];
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
      const scrollLines = [...document.querySelectorAll(LINE_SELECTOR)].map(inlineScrollLine);
      const media = gsap.matchMedia();
      app.media = media;
      media.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 768px)' }, context => {
        if (!context.conditions.motion) return;
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
        const orbs = hero?.querySelectorAll('.hero__orbs') || [];
        if (orbs.length) gsap.to(orbs, {
          x: () => -Math.min(innerWidth * 0.12, 180),
          y: () => Math.min(innerHeight * 0.22, 200),
          scale: 1.08, transformOrigin: 'center center', ease: 'none',
          scrollTrigger: {
            trigger: hero, start: 'top top', end: 'bottom top',
            scrub: 0.8, invalidateOnRefresh: true,
          },
        });
        scrollAnimations(gsap, SplitText, scrollLines, splits);
        const cleanupSticky = context.conditions.desktop ? stickyAnimations(gsap, ScrollTrigger) : () => {};
        const cleanupRed = redImageSequence(gsap, ScrollTrigger);
        return () => { cleanupSticky(); cleanupRed(); splits.forEach(split => split.revert()); };
      });
      // Lazy-loaded images can change downstream trigger positions.
      document.querySelectorAll('img').forEach(image => {
        if (!image.complete) image.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
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
