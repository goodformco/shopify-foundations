# Horizon cart products

## Brief
**In one sentence:** Reworks Horizon's cart product rows and cart summary
so shoppers see what they pay, what it was, and how much they save, on
both the cart page and the cart drawer.

- **What it does:**
  - Product rows: line total top-right; the original line total struck
    through beneath it (muted, lighter strike line); a "Save $X" pill
    beneath that. Shown only when the line actually costs less (sale
    compare-at price and/or a product discount).
  - Compact quantity selector (96 × 32 px) pinned bottom-right of each row.
    At quantity 1 the minus button becomes a bin that removes the item.
  - Per-item unit price block removed; only the line total remains.
  - Summary: "Total savings" line (all row savings plus order discounts),
    then "Subtotal" with the original amount struck through beside it.
    The separate pre-discount "Subtotal" line is gone; order discount
    names and amounts still show.
  - Promo row reads "Have a promo code?" with a caret right after the
    text (points down at the checkout button when closed, up when open).
    No dividers around it, tight spacing to the totals.
  - Empty cart: a short line "Browse our products and add items to start
    your order." replaces Horizon's "Have an account? Log in" prompt.
- **Settings:** No new settings. Uses existing Horizon ones:
  Theme settings → Badges → Sale badge colors (Save pills),
  Cart → Product media → Corner radius, the two cart currency-code
  settings, and Show discount code.
- **Scope:** Cart page and cart drawer (they share these snippets).
  Checkout is not affected (it isn't part of the theme).
- **Files:** New `snippets/cart-line-savings.liquid`. Edited
  `snippets/cart-products.liquid`, `snippets/cart-summary.liquid`,
  `snippets/quantity-selector.liquid`,
  `assets/component-cart-quantity-selector.js`. Four translation entries.
- **Built for:** Horizon 4.5.0.
- **Evidence:**
  - Owner-confirmed (21–22 Nov 2026, build theme "Build - Cart Products
    v0.1"): bin at quantity 1, quantity bottom-right on tall rows,
    struck price and Save pill, Total savings and struck Subtotal,
    promo row and spacing, drawer row spacing fix.
  - Owner-confirmed math check (22 Nov 2026, drawer): compare-at saving,
    10% product code and $5 order code together gave correct row savings,
    Total savings ($48.45) and struck Subtotal ($234.48 → $186.03).
  - Theme Check: 0 errors (2 existing warnings in unrelated files).
  - Fresh install, 22 Nov 2026: the five installed code files match
    this package (ignoring line endings), and all four translation
    entries are present with the correct values.
  - Owner-confirmed: installation works in "Install - Menu + Cart
    Swipe + Cart Products v1.0". Individual interaction checklist
    results were not recorded separately.
  - Untested: quick order list section; the empty-cart text line;
    keyboard and focus on the bin and promo caret; right-to-left
    languages; locales other than English; reduced-motion mode.

## How the savings are calculated
One formula, in `snippets/cart-line-savings.liquid`, used by both the
rows and the summary so they always agree:

- Original line total = the higher of the line's pre-discount total
  and its compare-at price × quantity.
- Line saving = original line total − what the customer pays.
- Total savings = every line saving + order-level discounts.
- Struck Subtotal = Subtotal + Total savings.

## Status
Theme-dependent baseline, not a standalone package.
Installation: see [INSTALL.md](INSTALL.md). Dependencies: see
[DEPENDENCIES.md](DEPENDENCIES.md).

## Limitations
- Checkout's own order summary counts only discount-code savings, not
  sale (compare-at) savings. The theme can't change checkout.
- Save pills use the Sale badge colors. If the Sale badge background
  matches the cart background, the pills look like plain text; pick a
  contrasting badge color.
- "USD" (currency code) follows Horizon's separate settings for cart items
  and cart total, so rows and summary can differ.
- Translation entries are English only.
- If a line has a minimum quantity above 1, or is quantity-locked above 1,
  a separate remove button is kept as a fallback.
- The quick order list section uses the same quantity selector, so it
  also gets the bin at quantity 1 (untested there).
- Only the empty-cart text line is included. The rest of the empty-cart
  work (heading and button wording, cart-empty.css, icon, cart title and
  drawer changes) is a separate round.

## Backlog
- Checkout savings: possible Checkout Blocks "Line item content" badge
  (Shopify Plus only per Shopify docs).
- Quantity badge on the product image (parked).
- "Unlocked" / membership offers.
