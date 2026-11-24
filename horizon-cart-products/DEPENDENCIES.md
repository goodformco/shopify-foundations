# Horizon cart products dependencies

## Status
Built against Horizon 4.5.0. The comparison source was an untouched
duplicate of Horizon 4.5.0 ("Copy of Horizon", theme 145375789119) from
the same store. Not compatible with other versions until compared.

## New file (owned by this component)
- snippets/cart-line-savings.liquid: outputs one cart line's saving in
  cents. Used by cart-products and cart-summary.

## Changed Horizon files
Full changed versions are in files/. Exact line-by-line changes are in
patches/.
- snippets/cart-products.liquid
  - Price cell: struck original line total and "Save $X" pill.
  - Unit price block under each item removed.
  - Price moved before quantity (reading order matches visual order).
  - Grid layouts: 3 columns on wide screens, quantity pinned bottom-right,
    drawer rows let the price column run beside the variant lines.
  - Compact quantity selector size.
  - Separate remove button only as a fallback (min quantity above 1, or
    quantity-locked above 1).
  - Empty cart: new text line (content.cart_empty_text) replaces the
    "Have an account? Log in" prompt (actions.log_in_html is no longer
    used by this file).
- snippets/cart-summary.liquid
  - Total savings line; total label uses content.cart_subtotal; struck
    original beside Subtotal.
  - Pre-discount Subtotal line removed (order discount list kept).
  - Promo row: new wording key, caret icon after the text, rotates when
    open; dividers removed; summary gap reduced.
- snippets/quantity-selector.liquid
  - New optional parameter can_remove.
  - On cart lines (line_index set): data attributes and a bin icon inside
    the minus button. Product page quantity is unchanged.
- assets/component-cart-quantity-selector.js
  - decreaseQuantity: at quantity 1, removes the line (sets 0).
  - updateButtonStates: toggles bin mode and the button's label.

## Horizon files used but not changed
Snippets: cart-disclosure-tooltip, unit-price, volume-pricing-info,
cart-typography-styles, text-component-shimmer-styles, price-styles,
input-custom-styles, spacing-style, quantity-selector-styles,
accordion-custom-component, tax-info, contrast-override (via
theme-styles-variables, which creates the color-custom-badge-sale class).

Assets: component-quantity-selector.js (base class), icon-delete.svg,
icon-caret.svg, icon-minus.svg, icon-plus.svg, icon-discount.svg,
icon-filters-close.svg, icon-error.svg.

Theme settings: badge_sale_background_color, badge_sale_text_color,
cart_thumbnail_border_radius, currency_code_enabled_cart_items,
currency_code_enabled_cart_total, show_add_discount_code, show_cart_note,
show_installments.

CSS variables: --color-foreground-rgb, --opacity-40, --opacity-70,
--margin-2xs, --margin-xs, --padding-3xs, --padding-xs, --gap-2xs,
--style-border-radius-xs, --font-size--xs, --cart-font-size--sm.

Existing translation keys: content.price_regular, content.price_sale,
content.cart_subtotal, accessibility.decrease_quantity,
accessibility.remove_item.
