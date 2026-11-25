# Add to cart feedback

## Brief
- **One sentence:** Clear, honest feedback for every add to cart in Horizon: one tap adds one item, a spinner while it's being added, the checkmark once it's in the cart, then the fly, the header count and the drawer, in that order.
- **What it does:** Adds a middle feedback layer on top of Horizon's own button, checkmark and fly-to-cart, plus fixes for the quick add button and the Choose popup found while testing.
- **Settings:** None. Uses Horizon's existing "Add to cart animation" and "Auto-open cart drawer" settings.
- **Scope:** Product page, product card quick add (Add and Choose), cart drawer suggestion row. Desktop and phones.
- **Files:** Edits 9 Horizon files (full files in `files/`, diffs against stock in `patches/`). No new files, no new settings, no new text.
- **Built for:** Horizon 4.5.0 (frozen base `horizon-v4.5.0`).
- **Evidence:** Owner-tested on a phone in the build theme, 25-26 Nov 2026. Fresh install test pending.

## What the shopper sees
1. **Tap Add:** a small nudge, then a spinner for exactly as long as the add takes (no timers, no fake delay). Extra taps are ignored until the item is in the cart, so one tap adds one item.
2. **In the cart:** Horizon's checkmark (Horizon's own timing), meaning only "added".
3. **Fly:** the product image flies to the cart icon (if the theme's add to cart animation is on).
4. **Header count:** goes up as the image lands, with a calmer bump (0.375s instead of 0.125s).
5. **Drawer:** opens after the count has bumped (if auto-open is on), never before the item is in the cart.
6. **Error:** the spinner stops and Horizon's error shows. Nothing opens.

## Quick add (product cards)
- Spinner and checkmark on the small quick add button, in the button's own colours.
- Phones: an invisible 12px ring around the button also counts as the button, so a slightly-off tap adds instead of opening the product page.
- No grey tap highlight on the card or the button.
- Quick add rules start with `button.` so the cart drawer's copy of the shared Add button styles can't override them (that copy loads after the first add from an empty cart).

## Choose popup
- Opens instantly on a simple skeleton (image, title, one option row, quantity and buttons at real sizes) while the product loads; opening the same product again skips the skeleton. Extra taps on Choose are ignored while it opens.
- Phones: one standard height (60% of the screen). Image and title stay at the top, the buttons stay at the bottom with even space around them, and only the options scroll, with room under the last row.
- Phones: drags on the fixed parts are ignored, so they don't bring back the browser bar.
- Phones: the popup no longer jumps to full screen after the cart drawer first fills.

## How it works (for developers)
- `product-form.js`: an `#adding` lock; `#startAdd`, `#setSpinner`, `#confirmAdd`, `#failAdd`. The add-to-cart button's `celebrate()` returns `{ shown, done }`. The cart update event carries `detail.celebration` (capped at 4s as a safety net, for cases like a variant switch swapping the button mid-animation).
- `cart-drawer.js`: auto-opens only after a successful add, after `detail.celebration` and the header count's bump (`cart-icon` `bubbleSettled`).
- `cart-icon.js`: renders the count after `detail.celebration`; a revision guard ignores stale updates.
- `quick-add.js` and `quick-add-modal.liquid`: the skeleton template and the `#opening` guard.
- CSS: spinner in `add-to-cart-button-styles.liquid`; quick add in `quick-add-styles.liquid`; popup in `quick-add-modal-styles.liquid`; count bump in `header-actions.liquid`.

## Known limits
- On a slow connection, there is a short gap after the checkmark where the button looks normal but stays locked until the cart refresh finishes. A quieter waiting state was discussed, not built.
- Phones: dragging the Choose popup can't be made to close it yet (planned as a separate foundation).
- With the theme's add to cart animation turned off, there is no fly; the other steps keep their order.

## Works with
- `cart-suggestion-row`: the row's Add buttons use this same feedback. Both packages make the same 4 `button.` changes in `quick-add-styles.liquid`; the full file here already includes them.
- `cart-drawer-swipe`, `cart-products`, `cart-summary`, `cart-clear-all`: tested together in the build theme.

## Changelog
See [CHANGELOG.md](CHANGELOG.md).
