# Install Cart Products

Built for Horizon 4.5.0. Install and test in an unpublished theme. Compare destination files first and preserve unrelated changes. `patches/` holds reference diffs against stock Horizon 4.5.0.

## 1. Install the helper
Install `cart-savings` v1.0 first (`snippets/cart-line-savings.liquid`).

## 2. Compare the destination files
For each file below, compare the theme's copy with stock Horizon 4.5.0:

- `snippets/cart-products.liquid`
- `snippets/quantity-selector.liquid`
- `assets/component-cart-quantity-selector.js`

## 3. Install the files
- If a file is still stock: replace it with the copy in `files/`.
- If a file has other changes (for example Clear all's render line, or the empty-cart text): apply that file's patch from `patches/` by hand, keeping the other changes. Clear all's line goes right after `</table>`; the empty-cart foundation changes only the empty branch at the top.

## 4. Add the translation
Open `locales/en.default.json`. Inside the `"content"` object, add the entry from `translations/en.default.entries.json`:

```json
"cart_item_savings": "Save {{ amount }}",
```

Add it only if missing. Keep the comma rules valid.

## 5. Check
- Run Theme Check; no new errors.
- Theme settings > Badges: Sale badge background differs from the cart background.
- Add a product with a compare-at price and one without. In the drawer and on the cart page:
  - Line totals on the right; the sale line shows the struck original and "Save $X" under its total.
  - Quantity selector bottom-right, compact.
  - At quantity 1 the minus is a bin; tapping it removes the line. At 2+ it's a minus.
- Keyboard: Tab through the selector; the bin/minus button announces "Remove …" at quantity 1.

## Upgrading from horizon-cart-products v1.0
That package bundled the rows, the summary and the savings helper. Install `cart-savings` v1.0 (same snippet), then replace the three row files from this package. The summary moves to the `cart-summary` foundation. If the theme uses the empty-cart foundation or Clear all, keep their lines in `cart-products.liquid`.

## Removal
Restore the three files from stock 4.5.0 (or reverse the patches) and remove the translation entry.
