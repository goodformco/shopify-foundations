/**
 * Variant dropdown for the cart drawer product row ("You may also like").
 * Native <select>: the browser/phone shows its own picker. On change, the card's
 * Add form submits the chosen variant, and its price, image and links follow it.
 * Loaded once from cart-drawer.liquid, so cards inserted by later cart re-renders
 * upgrade automatically. A re-render resets the dropdown and the form together.
 */
class CartUpsellVariant extends HTMLElement {
  connectedCallback() {
    this.addEventListener('change', this.#onChange);
    this.addEventListener('mousedown', this.#onMouseDown);
  }

  disconnectedCallback() {
    this.removeEventListener('change', this.#onChange);
    this.removeEventListener('mousedown', this.#onMouseDown);
  }

  /**
   * Horizon's slideshow cancels mousedown to start drag-to-scroll, which stops the
   * dropdown from opening. Keep the press on the dropdown; the row still drags elsewhere.
   * @param {MouseEvent} event
   */
  #onMouseDown = (event) => {
    event.stopPropagation();
  };

  /** @param {Event} event */
  #onChange = (event) => {
    const select = event.target;
    if (!(select instanceof HTMLSelectElement)) return;

    const option = select.selectedOptions[0];
    const card = this.closest('.cart-upsell__card');
    if (!option || !card) return;

    const { price, quantity, url, imageSrc, imageSrcset } = option.dataset;

    const idInput = card.querySelector('input[name="id"]');
    if (idInput instanceof HTMLInputElement) idInput.value = option.value;

    const quantityInput = card.querySelector('input[name="quantity"]');
    if (quantityInput instanceof HTMLInputElement && quantity) quantityInput.value = quantity;

    const priceElement = card.querySelector('.cart-upsell__price');
    if (priceElement && price) priceElement.textContent = price;

    const image = card.querySelector('img.cart-upsell__image');
    if (image instanceof HTMLImageElement && imageSrc) {
      if (imageSrcset) image.srcset = imageSrcset;
      image.src = imageSrc;
    }

    if (url) {
      for (const link of card.querySelectorAll('a.cart-upsell__media, a.cart-upsell__title')) {
        link.setAttribute('href', url);
      }
    }
  };
}

if (!customElements.get('cart-upsell-variant')) {
  customElements.define('cart-upsell-variant', CartUpsellVariant);
}
