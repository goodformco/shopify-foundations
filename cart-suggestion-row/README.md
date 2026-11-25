# Cart suggestion row

## Brief
- **One sentence:** A compact, swipeable "You may also like" row of products inside the Horizon cart drawer, with an Add button on every card.
- **What it does:** Shows products from a chosen collection below the cart items. Skips products already in the cart and unavailable products. Products with variants get a small native dropdown (available variants only); products with subscriptions get a Choose link to their product page.
- **Settings:** Theme settings > Cart: show row, collection, heading, number of products (2-8).
- **Scope:** Cart drawer only. The cart page is unchanged.
- **Files:** 1 snippet, 1 script, small edits to 3 Horizon files (see `patches/`).
- **Built for:** Horizon 4.5.0 (frozen base `horizon-v4.5.0`).
- **Evidence:** Owner-tested on a phone in the build theme, 22-26 Nov 2026. Fresh install test pending.

## How it works
- Uses Horizon's own product form and Add button, so an add refreshes the drawer like any other add to cart. The row re-renders with the drawer and drops the product just added.
- Uses Horizon's stock `slideshow` snippet for the sideways scroll (drag on desktop, swipe on phones, grab cursor kept).
- `assets/cart-upsell-variant.js` keeps the card's Add form, price, image and links in sync with the dropdown. It is loaded from `cart-drawer.liquid`, not the row, so it also works after the first add to an empty cart.
- Card image corners follow Theme settings > Cart > thumbnail corner radius. Prices follow the cart's "show currency code" setting.
- Text comes from Horizon's existing translations (`actions.add`, `actions.choose`, `content.variant`, `content.price_from`). No new translation keys. Setting labels are plain English in the schema, so they add no missing-translation warnings.

## Things that matter (don't remove)
- **`in-viewport` is rendered on the slideshow.** A cart refresh morphs the row in place and strips Horizon's viewport flag; without it the row stayed locked until it left and re-entered the screen.
- **The quick add patch (`button.` prefix).** The row brings Horizon's shared Add button styles into the drawer. After the first add from an empty cart, those styles load later in the page and override the quick add checkmark at equal specificity. The patch makes the quick add rules slightly stronger.
- **The dropdown stops the slideshow's mousedown handler** on desktop, otherwise the native picker can't open inside a draggable row.
- **`overscroll-behavior-x` on the row** keeps a sideways swipe in the row from moving the drawer.

## Works well with
- `cart-clear-all`: the row's top spacing is designed to sit right below Clear all.
- `cart-drawer-swipe`, `cart-products`, `cart-summary`: tested together in the build theme.
- The upcoming add-to-cart feedback patch (one tap adds one item, spinner, then checkmark). Not required, but without it a fast double tap on Add can add twice, as in stock Horizon.

## Limitations
- Shows the collection's own order. No "related products" logic.
- One dropdown for all options combined (e.g. "Black / M"), available variants only.
- Subscription products link to the product page instead of adding.

## Changelog
See [CHANGELOG.md](CHANGELOG.md).
