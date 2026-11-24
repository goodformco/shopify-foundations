import { Component } from '@theme/component';
import { trapFocus, removeTrapFocus } from '@theme/focus';
import { onAnimationEnd, removeWillChangeOnAnimationEnd } from '@theme/utilities';

/**
 * A custom element that manages the main menu drawer.
 *
 * @typedef {object} Refs
 * @property {HTMLDetailsElement} details - The details element.
 * @property {HTMLDivElement} menuDrawer - The slideable drawer panel containing the menu.
 *
 * @extends {Component<Refs>}
 */
class HeaderDrawer extends Component {
  requiredRefs = ['details', 'menuDrawer'];

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('keyup', this.#onKeyUp);
    this.#setupAnimatedElementListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keyup', this.#onKeyUp);
  }

  /**
   * Close the main menu drawer when the Escape key is pressed
   * @param {KeyboardEvent} event
   */
  #onKeyUp = (event) => {
    if (event.key !== 'Escape') return;

    this.#close(this.#getDetailsElement(event));
  };

  /**
   * @returns {boolean} Whether the main menu drawer is open
   */
  get isOpen() {
    return this.refs.details.hasAttribute('open');
  }

  /**
   * Get the closest details element to the event target
   * @param {Event | undefined} event
   * @returns {HTMLDetailsElement}
   */
  #getDetailsElement(event) {
    if (!(event?.target instanceof Element)) return this.refs.details;

    return event.target.closest('details') ?? this.refs.details;
  }

  /**
   * Toggle the main menu drawer.
   * The drawer manages its own open state instead of relying on the browser's built-in
   * <summary> toggle. That makes the first tap always open the drawer (the built-in toggle
   * can be blocked, e.g. by an editor preview), and lets the drawer animate closed before
   * the details element is collapsed.
   * @param {Event} [event]
   */
  toggle(event) {
    event?.preventDefault();

    if (this.isOpen) return this.close();

    this.refs.details.open = true;
    return this.open();
  }

  /**
   * Open the closest drawer or the main menu drawer
   * @param {string} [target]
   * @param {Event} [event]
   */
  open(target, event) {
    const details = this.#getDetailsElement(event);
    const summary = details.querySelector('summary');

    if (!summary) return;

    summary.setAttribute('aria-expanded', 'true');

    this.preventInitialAccordionAnimations(details);
    requestAnimationFrame(() => {
      details.classList.add('menu-open');

      if (target) {
        this.refs.menuDrawer.classList.add('menu-drawer--has-submenu-opened');
      }

      // Wait for the drawer animation to complete before trapping focus
      const drawer = details.querySelector('.menu-drawer, .menu-drawer__submenu');
      onAnimationEnd(drawer || details, () => trapFocus(details), { subtree: false });
    });
  }

  /**
   * Search item in the drawer's top row: close the drawer and open the theme's search popup.
   * The drawer's focus trap is released first so the popup's search field can take focus.
   * Without the popup (or before its script loads), the link goes to the search page instead.
   * @param {Event} [event]
   */
  openSearch(event) {
    const searchModal = /** @type {any} */ (document.getElementById('search-modal'));
    if (typeof searchModal?.showDialog !== 'function') return;

    event?.preventDefault();
    removeTrapFocus();
    this.close();
    searchModal.showDialog();
  }

  /**
   * Go back or close the main menu drawer
   * @param {Event} [event]
   */
  back(event) {
    this.#close(this.#getDetailsElement(event));
  }

  /**
   * Close the main menu drawer
   */
  close() {
    this.#close(this.refs.details);
  }

  /**
   * Close the closest menu or submenu that is open
   *
   * @param {HTMLDetailsElement} details
   */
  #close(details) {
    const summary = details.querySelector('summary');

    if (!summary) return;

    summary.setAttribute('aria-expanded', 'false');
    details.classList.remove('menu-open');
    this.refs.menuDrawer.classList.remove('menu-drawer--has-submenu-opened');

    // Wait for the .menu-drawer element's transition, not the entire details subtree
    // This avoids waiting for child accordion/resource-card animations which can cause issues on Firefox
    const drawer = details.querySelector('.menu-drawer, .menu-drawer__submenu');

    onAnimationEnd(
      drawer || details,
      () => {
        reset(details);
        if (details === this.refs.details) {
          removeTrapFocus();
          const openDetails = this.querySelectorAll('details[open]:not(accordion-custom > details)');
          openDetails.forEach(reset);
        } else {
          trapFocus(this.refs.details);
        }
      },
      { subtree: false }
    );
  }

  /**
   * Attach animationend event listeners to all animated elements to remove will-change after animation
   * to remove the stacking context and allow submenus to be positioned correctly
   */
  #setupAnimatedElementListeners() {
    const allAnimated = this.querySelectorAll('.menu-drawer__animated-element');
    allAnimated.forEach((element) => {
      element.addEventListener('animationend', removeWillChangeOnAnimationEnd);
    });
  }

  /**
   * Temporarily disables accordion animations to prevent unwanted transitions when the drawer opens.
   * Adds a no-animation class to accordion content elements, then removes it after 100ms to
   * re-enable animations for user interactions.
   * @param {HTMLDetailsElement} details - The details element containing the accordions
   */
  preventInitialAccordionAnimations(details) {
    const content = details.querySelectorAll('accordion-custom .details-content');

    content.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.classList.add('details-content--no-animation');
      }
    });
    setTimeout(() => {
      content.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.classList.remove('details-content--no-animation');
        }
      });
    }, 100);
  }
}

if (!customElements.get('header-drawer')) {
  customElements.define('header-drawer', HeaderDrawer);
}

/**
 * Reset an open details element to its original state
 *
 * @param {HTMLDetailsElement} element
 */
function reset(element) {
  element.classList.remove('menu-open');
  element.removeAttribute('open');
  element.querySelector('summary')?.setAttribute('aria-expanded', 'false');
}
