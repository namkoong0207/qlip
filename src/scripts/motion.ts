/**
 * Scroll-driven motion for the home page, without a library.
 *
 * Everything here is progressive enhancement: the HTML already contains all the
 * text and every element is visible without this script (crawlers, no-JS, and
 * "reduce motion" users get the static page). The `motion` class on <html> —
 * set by an inline script in the page head — is what turns hidden starting
 * states on, so nothing flashes before this runs.
 *
 *   [data-scrub]        → sets --p (0..1) from the section's scroll position
 *   [data-reveal]       → gets .in once it enters the viewport
 *   [data-story]        → the step nearest the middle of the screen becomes active
 *   [data-autoplay]     → steps through its [data-node]s while on screen
 */
const root = document.documentElement;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

function start() {
  if (reduce.matches) {
    root.classList.remove("motion");
    return;
  }
  // Tells the head script the page is driven; without this it falls back to static.
  root.classList.add("motion-ready");

  // ---- reveal on enter --------------------------------------------------
  const revealIO = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revealIO.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => revealIO.observe(el));

  // ---- scroll-linked progress -------------------------------------------
  // "sticky": 0 when the section's top reaches the viewport top, 1 when its
  //           bottom reaches the viewport bottom (the pinned stretch).
  // "enter":  0 when the element's top enters from below, 1 when its centre
  //           reaches the centre of the viewport.
  const scrubs = [...document.querySelectorAll<HTMLElement>("[data-scrub]")];
  let ticking = false;
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  function update() {
    ticking = false;
    const vh = window.innerHeight;
    for (const el of scrubs) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -vh || r.top > 2 * vh) continue;
      const p =
        el.dataset.scrub === "sticky"
          ? clamp(-r.top / Math.max(1, r.height - vh))
          : clamp((vh - r.top) / (vh / 2 + r.height / 2));
      el.style.setProperty("--p", p.toFixed(4));
    }
  }
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  if (scrubs.length) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  // ---- scrollytelling: which step is in the middle -----------------------
  document.querySelectorAll<HTMLElement>("[data-story]").forEach((story) => {
    const steps = [...story.querySelectorAll<HTMLElement>("[data-step]")];
    const setActive = (i: number) => {
      story.dataset.active = String(i);
      steps.forEach((s, j) => s.classList.toggle("active", j === i));
    };
    setActive(0);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      // On phones the device is pinned at the top, so the step being read sits
      // in the lower part of the screen.
      { rootMargin: window.matchMedia("(max-width: 900px)").matches ? "-60% 0px -30% 0px" : "-48% 0px -48% 0px" },
    );
    steps.forEach((s) => io.observe(s));
  });

  // ---- autoplay sequences while visible ----------------------------------
  document.querySelectorAll<HTMLElement>("[data-autoplay]").forEach((box) => {
    const nodes = [...box.querySelectorAll<HTMLElement>("[data-node]")];
    const stepMs = Number(box.dataset.autoplay) || 1100;
    let i = -1;
    let timer: number | undefined;
    const tick = () => {
      i += 1;
      if (i > nodes.length) {
        // hold the finished state, then start over
        i = -1;
        nodes.forEach((n) => n.classList.remove("on", "done"));
        box.classList.remove("finished");
        timer = window.setTimeout(tick, 600);
        return;
      }
      nodes.forEach((n, j) => {
        n.classList.toggle("done", j < i);
        n.classList.toggle("on", j === i);
      });
      box.classList.toggle("finished", i === nodes.length);
      timer = window.setTimeout(tick, i === nodes.length ? 2600 : stepMs);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && timer === undefined) tick();
        if (!e.isIntersecting && timer !== undefined) {
          clearTimeout(timer);
          timer = undefined;
        }
      },
      { threshold: 0.4 },
    );
    io.observe(box);
  });
}

start();
reduce.addEventListener?.("change", () => location.reload());
