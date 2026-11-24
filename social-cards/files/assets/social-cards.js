/**
 * Social cards: on phones and tablets (below 990px), tapping the open account again closes its card.
 * Opening and switching cards works without this script; it only adds closing.
 */
(() => {
  if (window.socialCardsCloseEnabled) return;
  window.socialCardsCloseEnabled = true;

  const desktop = window.matchMedia('(min-width: 990px)');

  document.addEventListener('click', (event) => {
    if (desktop.matches) return;
    const target = /** @type {HTMLElement} */ (event.target);
    const tab = target.closest?.('.social-card__tab');
    if (!(tab instanceof HTMLLabelElement)) return;

    const input = document.getElementById(tab.htmlFor);
    if (input instanceof HTMLInputElement && input.checked) {
      event.preventDefault();
      input.checked = false;
    }
  });

  // When a card opens on mobile, bring its account row to the top of the screen
  // so the card has the most room below it.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.addEventListener('change', (event) => {
    if (desktop.matches) return;
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || !input.classList.contains('social-card__radio') || !input.checked) return;

    const tab = input.nextElementSibling;
    if (!(tab instanceof HTMLElement)) return;

    // Wait for the previous card to close so the position is measured after the layout settles
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        tab.scrollIntoView({ block: 'start', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      });
    });
  });

  document.addEventListener('keydown', (event) => {
    if (desktop.matches) return;
    if (event.key !== ' ' && event.key !== 'Enter') return;
    const input = event.target;
    if (input instanceof HTMLInputElement && input.classList.contains('social-card__radio') && input.checked) {
      event.preventDefault();
      input.checked = false;
    }
  });
})();
