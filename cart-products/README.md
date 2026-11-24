# Cart Products

## Brief
The design of each product row in the cart, shared by the cart page and the cart drawer.

- **What it does:** Each row shows image, title and options on the left; on the right the line total, then (only when the line is cheaper than its original) the original total struck through and a "Save $X" pill, then a compact quantity selector pinned to the bottom-right. At quantity 1 the minus button becomes a bin that removes the line; there is no separate bin button.
- **Settings:** None new. Uses the existing cart block settings (image ratio, gap, dividers, vendor), the Cart > Product media settings, the cart currency-code setting and the Sale badge colors (Theme settings > Badges) for the pill.
- **Scope:** Product rows only. Not Clear all, the summary, the empty cart or the suggestion row (separate foundations).
- **Requires:** `cart-savings` v1.0 (helper foundation), installed first.
- **Files:** 3 Horizon files changed (`snippets/cart-products.liquid`, `snippets/quantity-selector.liquid`, `assets/component-cart-quantity-selector.js`), 1 translation entry.
- **Built for:** Horizon 4.5.0.
- **Evidence:** Owner-confirmed on cart page and drawer in the build themes (21-22 Nov 2026); two-code discount math checked (22 Nov 2026); previous package installed and owner-confirmed in a combined test theme (22 Nov 2026). This split v2.0 is not yet fresh-install tested. See Evidence below.

## What changed from stock Horizon
- Line total only: Horizon's per-item unit price block (sale price + compare-at strike) is removed. The per-measure unit price (e.g. "$2/100g") stays under the total.
- Savings: original total = higher of pre-discount total and compare-at × quantity (from `cart-savings`). When higher than the final total: muted struck original + "Save $X" pill (`content.cart_item_savings`, colors from the Sale badge). Line discount names still show under the title.
- Right column: price on top, quantity at the bottom-right of the row (page, drawer and wide layout). Table header order follows the visual order (total, then quantity).
- Compact quantity selector in the cart: 96 × 32 px on all screens (product page selector unchanged).
- Bin at quantity 1: the minus button swaps to a static bin icon and removes the line through Horizon's existing zero-quantity path. Respects `can_remove` and `can_update_quantity`; a separate remove button is kept only for lines with a minimum quantity above 1 or locked quantity above 1. Horizon's bin hover animation is removed.

## Dependencies
Stock Horizon 4.5.0: `cart-items-component`, `cart-quantity-selector-component`, `text-component`, `unit-price` snippet, `icon-minus.svg`, `icon-delete.svg`, `color-custom-badge-sale` (from Theme settings > Badges via `theme-styles-variables`), locale keys `content.price_sale`, `content.price_regular`, `accessibility.decrease_quantity`, `accessibility.remove_item`.

## Setup note
If the Sale badge background matches the cart background, the "Save $X" pill looks like plain text. Pick a Sale badge background that differs from the cart background.

## Evidence
- 21 Nov 2026, Build - Cart Products: bin-at-1, line total, compact selector, quantity bottom-right, struck original and Save pill built step by step; owner-confirmed visually.
- 22 Nov 2026: two discount codes (10% off one item + $5 off order) checked in the drawer: rows Save amounts, Total savings and struck Subtotal all correct.
- 22 Nov 2026: previous combined package (horizon-cart-products v1.0) installed in "Install - Menu + Cart Swipe + Cart Products v1.0"; saved files matched the package; owner-confirmed working.
- 24 Nov 2026: split into this rows-only foundation. Package file = Build - Cart Upsell's saved file minus the empty-cart text line and the Clear all render line (both belong to other foundations), with Horizon's stock empty branch restored.
- Untested: fresh install of v2.0, lines with `can_remove` false, minimum-quantity lines, quick order list (also uses the cart quantity selector), non-English languages.

## Known cosmetic note
In `component-cart-quantity-selector.js` the new `decreaseQuantity` method sits under the "Updates button states" comment. Behaviour is unaffected; left as built to preserve the tested source.

## Removal
Restore the three Horizon files from stock 4.5.0 (or reverse the patches) and remove the translation entry. Remove `cart-savings` only if nothing else uses it.
