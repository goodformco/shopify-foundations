# Install Cart Summary

Built for Horizon 4.5.0. Install and test in an unpublished theme. Compare destination files first and preserve unrelated changes. `patches/` holds a reference diff against stock Horizon 4.5.0.

## 1. Install the helper
Install `cart-savings` v1.0 first (`snippets/cart-line-savings.liquid`).

## 2. Install the summary
Compare the theme's `snippets/cart-summary.liquid` with stock Horizon 4.5.0.
- Still stock: replace it with `files/snippets/cart-summary.liquid`.
- Has other changes: apply `patches/snippets_cart-summary.liquid.diff` by hand, keeping those changes.

## 3. Add the translations
Open `locales/en.default.json`. Inside the `"content"` object, add any missing entries from `translations/en.default.entries.json`:

```json
"cart_total_savings": "Total savings",
"cart_promo_code_prompt": "Have a promo code?",
"cart_promo_code_placeholder": "Promo code",
"cart_promo_code_note": "Some codes can't be combined with other offers.",
```

Keep the comma rules valid.

## 4. Check
- Run Theme Check; no new errors.
- Theme settings > Badges: Sale badge background differs from the summary background.
- Cart with no savings: promo row and Subtotal only; no Total savings, no struck amount.
- Add a compare-at item and apply a product code and an order code (two codes that combine):
  - Total savings = sum of the rows' "Save" amounts + the order discount.
  - Subtotal shows the struck original and the final total.
- Open the promo row: caret flips; field shows "Promo code"; Apply is muted until you type; the note shows under the field; applying a code works.
- Keyboard: Tab to the promo row, Enter opens it, Tab into the field and Apply.

## Upgrading from horizon-cart-products v1.0
That package's summary was earlier (no promo restyle, larger total). Install `cart-savings` v1.0 (same snippet), replace `snippets/cart-summary.liquid` with this one, and add the 2 new promo entries (`cart_promo_code_placeholder`, `cart_promo_code_note`); the other 2 already exist.

## Removal
Restore `snippets/cart-summary.liquid` from stock 4.5.0 (or reverse the patch) and remove the translation entries.
