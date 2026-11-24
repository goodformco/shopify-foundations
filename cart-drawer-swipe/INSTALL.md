# Install cart drawer swipe (v2.0.1)

## Compatibility
Built for Horizon 4.5.0 using its `theme-drawer` cart drawer. Other themes and versions have not been validated.

Install and test in an unpublished theme. Compare destination files first and preserve unrelated changes. Do not replace whole theme files with copies from another theme. The `patches/` folder shows every change against stock Horizon 4.5.0 for reference.

This installation replaces or adds one asset and edits five existing files. Steps 1–8 are the same for a fresh install and an upgrade from v1.0; where v1.0 left something behind, the step says what to replace.

## Upgrade from v2.0
Only step 8 changed. Remove the previous scrollbar-gutter line from
html[scroll-lock] .page-wrapper, then apply step 8 below. Leave the existing
overflow: hidden declaration in place. No script, settings or other drawer
changes are needed. Reload and test below and above 990px.

## 1. Add the script
Copy this package's `files/assets/cart-drawer-swipe.js` into the theme as `assets/cart-drawer-swipe.js`.

Upgrading from v1.0: replace the whole file. The v1.0 touch-gesture code is not used any more.

## 2. Add the settings
Open `config/settings_schema.json`.

Inside the Cart group's settings array, find:

```json
      {
        "type": "header",
        "content": "t:content.cart_features"
      },
```

Immediately above it, add:

```json
      {
        "type": "checkbox",
        "id": "cart_drawer_swipe",
        "label": "Swipe to close",
        "info": "Swipe the cart drawer sideways to close it, on touch screens and trackpads.",
        "default": false,
        "visible_if": "{{ settings.cart_type == 'drawer' }}"
      },
      {
        "type": "range",
        "id": "cart_drawer_speed",
        "label": "Drawer slide time",
        "info": "How long the cart drawer takes to open and close. Lower is faster. Horizon's default is 125 ms.",
        "min": 100,
        "max": 600,
        "step": 25,
        "unit": "ms",
        "default": 300,
        "visible_if": "{{ settings.cart_type == 'drawer' }}"
      },
```

Add each setting only once.

Upgrading from v1.0: the settings already exist. Only change the checkbox's `info` line to the new text above.

## 3. Connect the script
Open `snippets/cart-drawer.liquid`.

Find the existing script:

```liquid
  <script
    type="module"
    src="{{ 'cart-drawer.js' | asset_url }}"
    fetchpriority="low"
  ></script>
```

Keep it unchanged. Immediately below it, add:

```liquid
  {% if settings.cart_drawer_swipe %}
    <script
      type="module"
      src="{{ 'cart-drawer-swipe.js' | asset_url }}"
      fetchpriority="low"
    ></script>
  {% endif %}
```

Upgrading from v1.0: already present, no change.

## 4. Mark the cart drawer and wrap its panel
Same file.

**4a.** Find:

```liquid
  <theme-drawer
    id="cart-drawer"
    data-skip-node-update
  >
```

Replace with:

```liquid
  <theme-drawer
    id="cart-drawer"
    overlay-desktop
    no-persist
    data-skip-node-update
  >
```

`overlay-desktop` makes it open over the page on desktop (step 6 teaches Horizon this marker). `no-persist` is Horizon's own marker that stops the drawer reopening by itself after moving to another page, which only suited the side-by-side layout.

**4b.** Find the opening of the cart component, directly inside the `<dialog>`:

```liquid
      cart-summary-sticky="true"
    >
      <cart-drawer-component
```

Replace with:

```liquid
      cart-summary-sticky="true"
    >
      <div class="cart-drawer__panel">
      <cart-drawer-component
```

**4c.** Find the end of the cart component and dialog:

```liquid
      </cart-drawer-component>
    </dialog>
```

Replace with:

```liquid
      </cart-drawer-component>
      </div>
      {%- if settings.cart_drawer_swipe -%}
        <div class="cart-drawer__swipe-space" aria-hidden="true"></div>
      {%- endif -%}
    </dialog>
```

With swipe off, the panel wrapper is layout-neutral (`display: contents`) and the empty space isn't rendered.

## 5. Add or replace the cart-only style block
Same file. Find:

```liquid
{% stylesheet %}
```

Immediately above it, add this separate block. Do not put it inside the existing stylesheet block.

Upgrading from v1.0: delete the old block (from its `{%- comment -%} Cart drawer motion …` line to its closing `</style>`) and add this one in its place.

```liquid
{%- comment -%}
  Cart drawer motion (component library: cart drawer swipe). Cart drawer only.
  Slide time setting: cart_drawer_speed. Swipe switch: cart_drawer_swipe.
{%- endcomment -%}
<style>
  #cart-drawer > dialog {
    --cart-drawer-speed: {{ settings.cart_drawer_speed | default: 300 }}ms;
  }

  #cart-drawer > dialog.theme-drawer__dialog--opening,
  #cart-drawer > dialog.theme-drawer__dialog--closing {
    animation-duration: var(--cart-drawer-speed);
  }

  /* Close starts moving immediately (fast-start curve, same as opening) */
  #cart-drawer > dialog.theme-drawer__dialog--closing {
    animation-timing-function: var(--animation-timing-fade-in);
  }

  /* Dimmed background. Horizon's backdrop color points to --color-shadow-rgb, which this
     theme never defines (so it painted nothing); set the color and strength here. */
  #cart-drawer > dialog::backdrop {
    --backdrop-color-rgb: 112 113 112; /* soft mid-grey (owner's choice, matches AG1) */
    --backdrop-opacity: 0.4;
  }

  /* Dimmed background fades with the drawer instead of switching on/off */
  #cart-drawer > dialog.theme-drawer__dialog--opening::backdrop {
    animation: cart-drawer-backdrop-fade var(--cart-drawer-speed) var(--animation-timing-fade-in);
  }

  #cart-drawer > dialog.theme-drawer__dialog--closing::backdrop {
    animation: cart-drawer-backdrop-fade var(--cart-drawer-speed) var(--animation-timing-fade-in) reverse forwards;
  }

  @keyframes cart-drawer-backdrop-fade {
    from {
      opacity: 0;
    }
  }

  /* Panel wrapper is layout-neutral unless swipe is on */
  #cart-drawer .cart-drawer__panel {
    display: contents;
  }
  {%- if settings.cart_drawer_swipe %}

    /* Swipe = the browser's own sideways scrolling with two snap points:
       the cart panel (open) and an empty space beside it (closed).
       row-reverse puts the panel at the scroll start, so it opens resting on the panel. */
    #cart-drawer > dialog[open] {
      width: 100%;
      max-width: none;
      flex-direction: row-reverse;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      overscroll-behavior-x: none; /* no browser back/forward swipe from the drawer */
      scrollbar-width: none;
      padding: 0;
      border: 0;
      background: transparent;
    }

    #cart-drawer > dialog::-webkit-scrollbar {
      display: none;
    }

    /* The panel takes over the drawer's look from the dialog */
    #cart-drawer .cart-drawer__panel {
      display: flex;
      flex-direction: column;
      flex: none;
      width: var(--theme-drawer-width, var(--sidebar-width));
      max-width: 100%;
      height: 100%;
      padding-block: var(--safe-area-inset-top) var(--safe-area-inset-bottom);
      padding-inline: 0 var(--safe-area-inset-right);
      border-inline-start: var(--style-border-drawer);
      background-color: var(--color-background);
      scroll-snap-align: end;
      will-change: transform; /* own graphics layer: slides as one piece without repainting */
    }

    #cart-drawer .cart-drawer__swipe-space {
      flex: none;
      width: 100%;
      height: 100%;
      scroll-snap-align: start;
    }

    #cart-drawer > dialog::backdrop {
      opacity: var(--cart-swipe-backdrop, 1);
    }

    #cart-drawer > dialog[data-swipe-closed].theme-drawer__dialog--closing,
    #cart-drawer > dialog[data-swipe-closed].theme-drawer__dialog--closing::backdrop {
      animation: none;
    }
  {%- endif %}
</style>
```

## 6. Keep the cart's scroll areas vertical
Same file, inside the existing `{% stylesheet %}` block.

Find:

```css
    flex-grow: 1;
    overflow-y: auto;
  }

  .cart-drawer__items {
```

Replace with:

```css
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden; /* scroll up/down only, so sideways swipes move the whole drawer */
  }

  .cart-drawer__items {
```

Then find:

```css
    padding-inline: var(--cart-drawer-padding);
    overflow-y: auto;
  }
```

Replace with:

```css
    padding-inline: var(--cart-drawer-padding);
    overflow-y: auto;
    overflow-x: hidden; /* scroll up/down only, so sideways swipes move the whole drawer */
  }
```

Without this, a sideways swipe first nudges the contents inside the panel.

## 7. Teach Horizon's drawers the overlay marker
**7a.** Open `assets/theme-drawer.js`. Find:

```js
  #modalQuery = window.matchMedia(`(max-width: ${MODAL_BREAKPOINT - 1}px)`);
```

Replace with:

```js
  // Drawers marked [overlay-desktop] are modal overlays at every width (no squeeze).
  #modalQuery = window.matchMedia(
    this.hasAttribute('overlay-desktop') ? 'all' : `(max-width: ${MODAL_BREAKPOINT - 1}px)`
  );
```

**7b.** Open `snippets/theme-drawer.liquid`. Find:

```js
  document.addEventListener('theme-drawer:open', () => {
    if (squeezeQuery.matches) {
```

Replace with:

```js
  document.addEventListener('theme-drawer:open', (event) => {
    // [overlay-desktop] drawers open over the page, so they never squeeze it
    if (event.target instanceof Element && event.target.hasAttribute('overlay-desktop')) return;
    if (squeezeQuery.matches) {
```

**7c.** Same file. This line appears twice, once in the `theme-drawer:close` listener and once in the `squeezeQuery` change listener:

```js
    const openDrawer = document.querySelector('theme-drawer[open]');
```

Replace both with:

```js
    const openDrawer = document.querySelector('theme-drawer[open]:not([overlay-desktop])');
```

Do not change the `theme-drawer[open]:not([no-persist])` line in the state-saving code. Drawers without the marker (filters, pickup, chat) behave exactly as before.

## 8. Stop the page shifting when a drawer opens
Open `assets/base.css`. Horizon changes the page scroller at 990px, so reserve
scrollbar space on the appropriate element in each width range.

If upgrading from v2.0, first remove only the `scrollbar-gutter: stable` line
previously added inside `html[scroll-lock] .page-wrapper`. Keep its
`overflow: hidden` declaration.

Find:

```css
html[scroll-lock] {
  overflow: hidden;
}
```

Immediately after it, add (once):

```css
/* Below 990px the document is the scroller, so keep its scrollbar's space for the same reason */
@media (max-width: 989px) {
  html {
    scrollbar-gutter: stable;
  }
}
```

Then find the existing desktop `.page-wrapper` rule beginning:

```css
@media (min-width: 990px) {
  .page-wrapper {
    height: 100dvh;
    overflow-y: auto;
```

Add the gutter declaration directly after `overflow-y: auto;`, so it begins:

```css
@media (min-width: 990px) {
  .page-wrapper {
    height: 100dvh;
    overflow-y: auto;
    scrollbar-gutter: stable; /* keep the scrollbar's space so the page doesn't shift when a drawer opens */
```

These last two excerpts show only the start of the existing rule. Preserve
all following declarations and closing braces, including the account-dialog
and RTL rules in that media block. Do not replace the entire media block.
Do not add either declaration again if already present.

This shared fix reserves space even before a drawer opens. With classic
space-taking scrollbars, short pages can retain an empty gutter; overlay
scrollbars do not reserve that space. Test long and short pages at both widths.

## 9. Configure
In Theme settings → Cart:
- Set Cart type to Drawer.
- Enable Swipe to close.
- Start with Drawer slide time at 300 ms.

Save and fully reload the storefront preview. Reload after changing the swipe switch.

## 10. Test the installation
These are checks to perform, not a record of completed tests.

Desktop (990px or wider):
- The drawer opens over the page with a visible grey dim; the page doesn't shift sideways.
- The dim fades in and out with the drawer.
- X, dimmed-area click and Escape close it; focus returns to the cart icon; the page keeps its scroll position.
- Trackpad: two-finger sideways swipe follows the fingers; hold keeps it in place; let go short of halfway springs back; past halfway or a quick flick closes it.
- Vertical scrolling of a cart long enough to overflow.
- Filters, pickup availability and menu drawers behave as before.

Real touch-screen phone:
- Slow drag, hold, release short of halfway: springs back.
- Quick flick: closes. Drag past halfway: closes.
- Vertical scrolling, product links, quantity controls, remove buttons.
- Tap the dimmed area.

Also:
- With swipe off and the page reloaded, the drawer looks and works normally (it still opens over the page on desktop).
- The speed setting changes opening and button closing time.
- Cart page behavior is unchanged.
- Run Theme Check and distinguish new issues from existing ones.

A mobile-sized editor preview is not a real touch-device test. Record the device, browser, theme, date and specific checks performed. Do not mark the whole checklist passed from a general report that the feature works.

## Removal
Remove only this component's changes:
1. The conditional script tag, the standalone style block and its comment from `snippets/cart-drawer.liquid`.
2. In the same file: `overlay-desktop` and `no-persist` from `<theme-drawer id="cart-drawer">`, the `cart-drawer__panel` wrapper's opening and closing `<div>` tags, the `cart-drawer__swipe-space` block, and the two `overflow-x: hidden` lines.
3. The step 7 changes in `assets/theme-drawer.js` and `snippets/theme-drawer.liquid` (restore the original lines shown in step 7).
4. Both added `scrollbar-gutter` declarations in `assets/base.css` and the new below-990px media block, if no other component relies on them. Keep Horizon's existing desktop media block and all its other declarations.
5. The `cart_drawer_swipe` and `cart_drawer_speed` setting objects from `config/settings_schema.json`, keeping the JSON valid, and any saved values for them in `config/settings_data.json`.
6. `assets/cart-drawer-swipe.js`.

Do not remove Horizon's original `cart-drawer.js` script or its existing stylesheet block. Save, reload and check normal cart drawer operation on desktop and mobile.
