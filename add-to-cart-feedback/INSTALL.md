# Install: add-to-cart-feedback v1.0

For Horizon 4.5.0. Make the edits in an unpublished copy first.

## Option A: unedited Horizon files (fastest)
If these 9 files are still stock in your theme, replace each one with the file from `files/`:
- `assets/product-form.js`
- `assets/cart-drawer.js`
- `assets/cart-icon.js`
- `assets/quick-add.js`
- `snippets/add-to-cart-button-styles.liquid`
- `snippets/quick-add-styles.liquid`
- `snippets/quick-add-modal.liquid`
- `snippets/quick-add-modal-styles.liquid`
- `snippets/header-actions.liquid`

`cart-suggestion-row` also edits `quick-add-styles.liquid` (4 `button.` prefixes). The file here already includes them, so replacing it is safe with or without the row.

## Option B: files you've already edited
Apply the diffs in `patches/` by hand, one file at a time. Lines starting with `-` are removed, `+` are added; the unmarked lines around them show where. Skip the 4 `button.` prefix changes in `quick-add-styles.liquid` if `cart-suggestion-row` is already installed.

## Check
- Product page: tap Add twice fast. One item is added; spinner, then checkmark.
- Collection page: quick add. Spinner, checkmark, fly, header count bumps, then the drawer opens (with auto-open on).
- Phone: tap just beside a quick add button. It adds instead of opening the product.
- Choose on a product with several options: skeleton first, then the real popup. On a phone, only the options scroll and the buttons stay at the bottom.
- Error: a product with 1 in stock, already in the cart, "continue selling" off. Add again: spinner, then Horizon's error; the drawer doesn't open.
