# Install: cart-suggestion-row v1.0

For Horizon 4.5.0. Exact diffs against stock are in `patches/`. Make the edits in an unpublished copy first.

## 1. Add the new files
- `snippets/cart-drawer-upsell.liquid`: create it and paste the file from `files/snippets/`.
- `assets/cart-upsell-variant.js`: create it and paste the file from `files/assets/`.

## 2. Edit `snippets/cart-drawer.liquid` (two small additions)
**a.** Find:
```liquid
  <script
    type="module"
    src="{{ 'cart-drawer.js' | asset_url }}"
    fetchpriority="low"
  ></script>
```
Paste right below it:
```liquid

  {%- comment -%} Product row variant dropdown; loaded here (not in the row) so it also works after the first add to an empty cart {%- endcomment -%}
  {% if settings.cart_drawer_upsell %}
    <script
      type="module"
      src="{{ 'cart-upsell-variant.js' | asset_url }}"
      fetchpriority="low"
    ></script>
  {% endif %}
```

**b.** Find (inside `<scroll-hint class="cart-drawer__items">`, the one without `force_empty`):
```liquid
                  {% render 'cart-products', context: 'drawer' %}
```
Paste right below it:
```liquid
                  {%- if settings.cart_drawer_upsell -%}
                    {% render 'cart-drawer-upsell' %}
                  {%- endif -%}
```

## 3. Edit `config/settings_schema.json` (the settings)
Find the `auto_open_cart_drawer` setting block, ending:
```json
        "visible_if": "{{ settings.cart_type == 'drawer' }}"
      },
```
Paste the four setting blocks from `patches/config_settings_schema.json.diff` (the `+` lines, without the `+`) right after it.

## 4. Edit `snippets/quick-add-styles.liquid` (keeps the quick add checkmark right)
Add `button` in front of these four selectors (find, replace):
- `.quick-add__button .svg-wrapper .checkmark-burst {` → `button.quick-add__button .svg-wrapper .checkmark-burst {`
- `.quick-add__button[data-added='true'] {` → `button.quick-add__button[data-added='true'] {`
- `.quick-add__button[data-added='true'] > .add-to-cart-icon {` → `button.quick-add__button[data-added='true'] > .add-to-cart-icon {`
- `.quick-add__button[data-added='true'] .add-to-cart__added {` → `button.quick-add__button[data-added='true'] .add-to-cart__added {`

## 5. Turn it on
Theme settings > Cart: tick **Show product row in cart drawer**, pick a collection (optional), save.

## Check
- Add a product: the row shows below the cart items, without that product.
- Swipe the row sideways; the drawer stays put.
- Pick a variant in a dropdown: price and image follow; Add adds that variant.
- Start from an empty cart, quick add from a collection page, then quick add again: the checkmark looks the same both times.
