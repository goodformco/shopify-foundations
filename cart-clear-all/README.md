# Cart Clear All

## Brief
A "Clear all" button that empties the whole cart in one update.

- **What it does:** Shows a bin icon with an underlined "Clear all" link below the cart's product list, right-aligned, on the cart page and in the cart drawer. One click removes every line in a single cart update and swaps straight to the empty-cart view.
- **Settings:** None. It follows the cart list's existing gap and divider settings.
- **Scope:** The button, its spacing and its click behavior. Not the product rows, the summary or the empty-cart design (separate foundations).
- **Files:** 1 new snippet, 2 small edits to Horizon files (one render line, one script patch). No new translations: it reuses Horizon's `actions.clear_all` text.
- **Built for:** Horizon 4.5.0.
- **Evidence:** Owner-confirmed working in the build theme (22 Nov 2026) and again after extraction into its own snippet in Build - Cart Upsell (24 Nov 2026). Error path and a fresh install are untested. See Evidence below.

## How it works
- `snippets/cart-clear-all.liquid` renders the button inside the cart list, right after the product table. It must sit there: it inherits the list's `--cart-items-gap` and `cart-items--dividers` styling, and its click (`on:click="/onClearAll"`) is handled by the surrounding `cart-items-component`.
- The button is hidden when any cart line can't be removed (`item.instructions.can_remove == false`).
- `onClearAll()` in `assets/component-cart-items.js` shows the empty-cart template at once (with Horizon's view transition), then posts `{ updates: { <every line key>: 0 } }` to the cart update route. If the cart rejects it, it raises Horizon's cart error event and re-renders the cart from the server.

## Spacing
- Cart page, no dividers: gap above = list gap + `--margin-lg`, same as between two rows.
- Cart page, with dividers: list gap above and below the (invisible) divider position, same as between two rows; no divider line is drawn above Clear all.
- Cart drawer: the drawer rows use their own spacing (`--gap-xl`), so Clear all matches that, plus `--gap-lg` below so it never touches the summary.

## Dependencies (all stock Horizon 4.5.0)
`cart-items-component` (assets/component-cart-items.js), `#empty-cart-template` (snippets/cart-drawer.liquid and sections/main-cart.liquid), `Theme.routes.cart_update_url` (snippets/scripts.liquid), `CartErrorEvent`, `startViewTransition`, `icon-delete.svg`, `actions.clear_all` locale key, theme spacing and icon-size variables.

## Evidence
- 22 Nov 2026, Build - Cart Products: built and owner-confirmed ("we have achieved this"); spacing tuned with the owner on page and drawer. Individual checks (empty-state swap, header count) not recorded separately.
- 24 Nov 2026, Build - Cart Upsell: moved into its own snippet with no visual or behavior change; saved files read back and checked; owner-confirmed working.
- Untested: the error path (cart rejects the update), carts with a line that can't be removed, fresh install from stock, non-English languages.

## Limitations
- Horizon's quick order list also uses cart quantity controls; Clear all is not added there.
- No confirm step: one click empties the cart (matches the AG1 reference).

## Removal
Delete the snippet, remove the render line, and reverse the script patch (see INSTALL.md).
