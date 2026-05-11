/* ========================================================================
   Tanay Naik — Liquid Glass Portfolio
   Interactions: spotlight, scroll reveals, nav state, parallax tilt
   ======================================================================== */

(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* -------------------- Scroll-driven reveals ------------------------ */
    const sections = document.querySelectorAll('.section');
    const reveals  = document.querySelectorAll('[data-reveal]');

    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    sectionObserver.unobserve(entry.target);
                }
            }
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

        sections.forEach(s => sectionObserver.observe(s));

        const rowObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('is-revealed'), i * 60);
                    rowObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        reveals.forEach(r => rowObserver.observe(r));
    } else {
        // Fallback: reveal everything immediately
        sections.forEach(s => s.classList.add('is-visible'));
        reveals.forEach(r => r.classList.add('is-revealed'));
    }

    /* -------------------- Nav: scroll state ---------------------------- */
    const nav = document.querySelector('.nav');
    if (nav) {
        let lastScrolled = false;
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 60;
            if (scrolled !== lastScrolled) {
                nav.classList.toggle('is-scrolled', scrolled);
                lastScrolled = scrolled;
            }
        }, { passive: true });
    }

    /* -------------------- Tilt on glass elements ----------------------- */
    if (!reduced && window.matchMedia('(hover: hover)').matches) {
        const tilts = document.querySelectorAll('[data-tilt]');
        tilts.forEach(el => {
            // Cards get a dramatic tilt; pills get a subtler one
            const isCard = el.matches('.project, .skill');
            const strength = isCard ? 18 : 10;   // total rotation range in deg (±half)
            const lift     = isCard ? 8  : 3;
            const persp    = isCard ? 700 : 900;
            let raf = null;
            let active = false;

            const restingTransition = getComputedStyle(el).transition;

            const onEnter = () => {
                // Track the cursor closely while hovering — short transition
                el.style.transition = 'transform 90ms linear';
                active = true;
            };

            const onMove = (e) => {
                if (!active) onEnter();
                const rect = el.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;   // 0..1
                const y = (e.clientY - rect.top)  / rect.height;  // 0..1
                const rotY = (x - 0.5) * strength;
                const rotX = (0.5 - y) * strength;
                if (raf) cancelAnimationFrame(raf);
                raf = requestAnimationFrame(() => {
                    el.style.transform =
                        `perspective(${persp}px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-${lift}px) translateZ(0)`;
                });
            };

            const onLeave = () => {
                if (raf) cancelAnimationFrame(raf);
                // Restore the long, eased transition for a smooth return
                el.style.transition = restingTransition;
                el.style.transform = '';
                active = false;
            };

            el.addEventListener('pointerenter', onEnter);
            el.addEventListener('pointermove', onMove);
            el.addEventListener('pointerleave', onLeave);
        });
    }

    /* -------------------- Theme picker with circular reveal ------------ */
    const themePicker = document.querySelector('.theme-picker');
    if (themePicker) {
        // Background color per theme — must match the CSS --bg values
        const themeBg = {
            white:  '#fafafa',
            black:  '#0a0a0c',
            blue:   'hsl(212, 80%, 95%)',
            green:  'hsl(140, 55%, 94%)',
            red:    'hsl(2, 72%, 94%)',
            orange: 'hsl(28, 90%, 93%)',
            purple: 'hsl(265, 70%, 95%)',
        };

        const root = document.documentElement;
        const body = document.body;
        const atmosphere = document.querySelector('.atmosphere');
        const swatches = themePicker.querySelectorAll('.theme-swatch');

        const applyTheme = (theme) => {
            if (theme === 'white') {
                root.removeAttribute('data-theme');
            } else {
                root.setAttribute('data-theme', theme);
            }
            swatches.forEach(s => s.classList.toggle('is-active', s.dataset.theme === theme));
        };

        swatches.forEach(sw => {
            sw.addEventListener('click', () => {
                const theme = sw.dataset.theme;
                const current = root.getAttribute('data-theme') || 'white';
                if (current === theme) return;

                // Compute reveal origin (swatch center) + radius to cover the viewport
                const rect = sw.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = Math.max(cx, window.innerWidth - cx);
                const dy = Math.max(cy, window.innerHeight - cy);
                const radius = Math.hypot(dx, dy);

                // Build overlay carrying the *new* background color
                const overlay = document.createElement('div');
                overlay.className = 'theme-reveal';
                overlay.style.setProperty('--reveal-bg', themeBg[theme]);
                overlay.style.setProperty('--reveal-x', cx + 'px');
                overlay.style.setProperty('--reveal-y', cy + 'px');
                overlay.style.setProperty('--reveal-r', radius + 'px');

                // Insert BEFORE .atmosphere so geometric shapes + main content
                // render on top of the overlay — the user sees the whole page
                // throughout the animation.
                if (atmosphere) {
                    body.insertBefore(overlay, atmosphere);
                } else {
                    body.insertBefore(overlay, body.firstChild);
                }

                if (reduced) {
                    applyTheme(theme);
                    overlay.remove();
                    return;
                }

                // Run text cross-fade and bg sweep SIMULTANEOUSLY.
                //   0–280ms: text/glass colors cross-fade (CSS transition)
                //            AND overlay sweeps in with NEW bg color (keyframe)
                //   280ms:   body bg lock released; new --bg matches the
                //            overlay, which is removed on the next frame.

                // 1) Pin body bg to the current color so flipping --bg doesn't
                //    snap the visible background out from under the sweep.
                const oldBg = themeBg[current] || themeBg.white;
                body.style.background = oldBg;

                // 2) Flip the theme — text/glass color transitions begin now.
                applyTheme(theme);

                // 3) Start the bg sweep on the same frame.
                void overlay.offsetWidth;
                overlay.classList.add('is-expanding');

                overlay.addEventListener('animationend', () => {
                    // Release the body bg lock — body falls back to var(--bg),
                    // which is now the new color, hidden under the overlay for
                    // one frame before it's removed.
                    body.style.background = '';
                    requestAnimationFrame(() => overlay.remove());
                }, { once: true });
            });
        });
    }

    /* -------------------- Smooth anchor scroll w/ nav offset ----------- */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (id.length <= 1) return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
        });
    });

})();
