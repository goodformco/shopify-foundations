/**
 * Cart drawer: swipe to close (touch screens and trackpads).
 * Built on the browser's own sideways scrolling: while open, the cart dialog is a
 * full-screen sideways scroller with two snap points, the cart panel (open) and an
 * empty space beside it (closed). The browser handles the gesture itself, so holding,
 * flicking, catching a moving drawer and the vertical/sideways decision all feel native.
 * This script only:
 * - fades the dimmed background with the drawer's position,
 * - runs Horizon's own close() once the drawer has come to rest on the empty space
 *   (focus return, scroll position and the "theme-drawer:close" event stay Horizon's),
 * - closes the drawer when the empty space (dimmed area) is clicked.
 * Layout and snap points live in the cart drawer's style block (snippets/cart-drawer.liquid).
 */

const DRAWER_ID = 'cart-drawer';
const SETTLE_FALLBACK = 150; // ms without scrolling = at rest, for browsers without "scrollend"

let drawer = null;
let panel = null;
let frame = 0;
let settleTimer = 0;
let closing = false;

/** Finds the cart drawer and attaches the listeners to its dialog once. */
function bind() {
  const nextDrawer = document.getElementById(DRAWER_ID);
  const nextPanel = nextDrawer ? nextDrawer.querySelector(':scope > dialog') : null;

  if (nextPanel !== panel) {
    if (panel) {
      panel.removeEventListener('scroll', onScroll);
      panel.removeEventListener('scrollend', onRest);
      panel.removeEventListener('click', onClick);
    }
    if (nextPanel) {
      nextPanel.addEventListener('scroll', onScroll, { passive: true });
      nextPanel.addEventListener('scrollend', onRest);
      nextPanel.addEventListener('click', onClick);
    }
  }

  drawer = nextDrawer;
  panel = nextPanel;
  return Boolean(drawer && panel);
}

/** 0 = fully open, 1 = pushed all the way onto the empty space. */
function progress() {
  const max = panel.scrollWidth - panel.clientWidth;
  return max > 0 ? Math.min(Math.abs(panel.scrollLeft) / max, 1) : 0;
}

function onScroll() {
  if (!frame) {
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (panel) panel.style.setProperty('--cart-swipe-backdrop', String(1 - progress()));
    });
  }
  if (!('onscrollend' in window)) {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(onRest, SETTLE_FALLBACK);
  }
}

/** The gesture has finished and the snap has settled. */
async function onRest() {
  if (closing || !drawer || !drawer.hasAttribute('open') || progress() < 0.98) return;

  closing = true;
  panel.dataset.swipeClosed = '';
  try {
    await drawer.close();
  } finally {
    delete panel.dataset.swipeClosed;
    closing = false;
  }
}

/** Clicks on the empty space beside the panel close the drawer, like the dimmed area. */
function onClick(event) {
  if (event.target instanceof Element && event.target.classList.contains('cart-drawer__swipe-space')) {
    drawer.close();
  }
}

/** Every open starts resting on the panel with full dimming. */
function resetPosition() {
  if (!panel) return;
  cancelAnimationFrame(frame);
  frame = 0;
  panel.style.removeProperty('--cart-swipe-backdrop');
  panel.scrollLeft = 0;
}

document.addEventListener('theme-drawer:open', (event) => {
  if (event.target.id !== DRAWER_ID || !bind()) return;
  resetPosition();
  requestAnimationFrame(resetPosition);
});

bind();
