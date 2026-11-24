# Cart Savings (helper)

## Brief
A tiny helper that works out how much one cart line saves, so every part of the cart shows the same savings numbers.

- **What it does:** `snippets/cart-line-savings.liquid` outputs one line's saving in cents, with no formatting. Original total = the higher of the line's pre-discount total (`original_line_price`) and its compare-at total (`compare_at_price × quantity`). Saving = original total − `final_line_price`, never below 0.
- **Settings:** None.
- **Scope:** Calculation only. No markup, styles or text. Formatting (money, currency code) is up to whoever uses it.
- **Files:** 1 new snippet. No edits to Horizon files.
- **Built for:** Horizon 4.5.0 (plain Liquid cart objects; should work in any Online Store 2.0 theme, untested elsewhere).
- **Evidence:** In use since 22 Nov 2026 by the cart rows ("Save $X") and the cart summary ("Total savings") in the build themes. Owner-checked two-code math (22 Nov 2026): rows, Total savings and struck Subtotal all correct.

## Type: helper foundation
Has no visuals of its own. Other foundations list it as a requirement (currently `cart-products` and `cart-summary`). Install it once; foundations that need it share it.

## Usage
```liquid
{%- capture line_savings -%}{%- render 'cart-line-savings', item: item -%}{%- endcapture -%}
{%- assign line_savings = line_savings | plus: 0 -%}
```

## Install
Copy `files/snippets/cart-line-savings.liquid` into the theme as `snippets/cart-line-savings.liquid`. If it already exists from another install, compare; they should be identical for the same version.

## Removal
Delete the snippet only after removing every foundation that renders it.

## Limitations
- Order-level discounts are not per line; a summary adds them separately (`cart.cart_level_discount_applications`).
- Selling plan (subscription) price adjustments are only counted as far as they lower `final_line_price`.
