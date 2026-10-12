/**
 * Runs `cb` once the page has really painted (PSI pass 2).
 *
 * The window `load` event and requestIdleCallback can both fire before the
 * first frame reaches the screen, so photographs and the film queued on them
 * could start downloading ahead of the first paint and compete with the first
 * screen's photograph. The `first-contentful-paint` entry is only reported once
 * that frame is presented. Browsers without paint timing, and pages opened in a
 * background tab (which report no paint until shown), fall back to a timer.
 * Returns a cancel function for effect clean-up.
 */
export function afterFirstPaint(cb: () => void, fallbackMs = 3000): () => void {
  let done = false;
  let observer: PerformanceObserver | undefined;
  const run = () => {
    if (done) return;
    done = true;
    observer?.disconnect();
    window.clearTimeout(timer);
    cb();
  };
  const painted = () =>
    performance.getEntriesByType("paint").some((e) => e.name === "first-contentful-paint");
  const timer = window.setTimeout(run, fallbackMs);
  if (painted()) {
    run();
    return () => {};
  }
  try {
    observer = new PerformanceObserver((list) => {
      if (list.getEntries().some((e) => e.name === "first-contentful-paint")) run();
    });
    observer.observe({ type: "paint", buffered: true });
  } catch {
    run();
  }
  return () => {
    done = true;
    observer?.disconnect();
    window.clearTimeout(timer);
  };
}
