# Cart Summary

## Brief
The cart's totals area: promo code row, Total savings and Subtotal, shared by the cart page and the cart drawer.

- **What it does:** A compact summary in this order: "Have a promo code?" row (caret, opens an inline field with an underlined Apply inside it and a short note), order discount names and amounts, "Total savings" with a tag icon and the amount in a Sale badge pill (only when there are savings), then "Subtotal" with the pre-savings amount struck through beside it (only when there are savings). Promo, savings and subtotal are the same size; Subtotal uses the heading font weight.
- **Settings:** None new. Uses the existing discount-code setting, cart currency-code setting, Sale badge colors (Theme settings > Badges) and heading font weight.
- **Scope:** The summary snippet only. Not the drawer's summary spacing, background or scroll edges (cart drawer component), not the product rows.
- **Requires:** `cart-savings` v1.0 (helper foundation), installed first.
- **Files:** 1 Horizon file changed (`snippets/cart-summary.liquid`), 4 translation entries.
- **Built for:** Horizon 4.5.0.
- **Evidence:** Two-code discount math owner-checked (22 Nov 2026); promo row, sizes and weights owner-confirmed in the drawer (22 Nov 2026). This v1.0 package is not yet fresh-install tested. See Evidence below.

## What changed from stock Horizon
- Total savings line: sum of every line's saving (from `cart-savings`) plus order-level discounts. Hidden when 0.
- Subtotal: label is `content.cart_subtotal` (was "Estimated total"), value = `cart.total_price`; struck original (total + savings) beside it, muted, only when savings > 0. Horizon's separate pre-discount "Subtotal" row above the discounts is removed (order discount names and amounts stay).
- Promo row: "Have a promo code?" with a caret that flips when open (was "Discount" with a plus); no dividers; tighter spacing (gap 2xs) and a shorter tap area (min-height removed, padding 2xs, about 28px, above the 24px WCAG minimum).
- Promo field: placeholder "Promo code"; Apply is an underlined text button inside the field on the right, muted until something is typed; note "Some codes can't be combined with other offers." under the field.
- Typography: Subtotal label and value use `--font-heading--weight`; promo label weight 500; savings amount in a Sale badge pill.
- Cleanup (24 Nov 2026): removed the font-size lines in rules this package changes that pointed at `--cart-font-size--sm`, which is never defined (5 added during the build, plus Horizon's line in the Subtotal label rule we rewrote); the browser was ignoring them, so the look is unchanged. Horizon's one remaining use, in the untouched `.cart-totals__original-container` rule, is left as shipped.

## Dependencies
Stock Horizon 4.5.0: `accordion-custom-component`, `cart-discount` script (unchanged; does not depend on the Apply button class), `tax-info`, `cart-typography-styles`, `icon-caret.svg`, `icon-discount.svg`, `color-custom-badge-sale`, `--font-heading--weight`, locale keys `content.cart_subtotal`, `content.price_regular`.

## Setup notes
- Pick a Sale badge background that differs from the summary background, or the savings pill looks like plain text. The build used the palette's light grey (a theme setting, not part of this package).
- Horizon's stock `.cart-totals__total` and `.cart__total` use `--font-weight-bold`, which is undefined in Horizon 4.5.0; this package sets the Subtotal weight explicitly instead.

## Evidence
- 22 Nov 2026, Build - Cart Products: Total savings + struck Subtotal built; two codes (10% off one item, $5 off order) checked in the drawer: Total savings $48.45, Subtotal $234.48 struck → $186.03, all correct (owner screenshot).
- 22 Nov 2026: compact summary rounds (sizes, weights, promo row height, open promo state, Apply inset) owner-confirmed ("works", "feels just right").
- 22 Nov 2026: previous combined package (horizon-cart-products v1.0, earlier summary) installed and owner-confirmed in a combined test theme.
- 24 Nov 2026: font-size cleanup in Build - Cart Upsell (Theme Check: no new offenses). Visual check of the cleanup pending.
- Untested: fresh install of this package, cart page summary after the cleanup, other languages, cart note enabled.

## Removal
Restore `snippets/cart-summary.liquid` from stock 4.5.0 (or reverse the patch) and remove the 4 translation entries.
