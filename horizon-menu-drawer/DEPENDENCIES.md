# Horizon menu drawer dependencies

## Status
Built against Horizon 4.5.0. The comparison source was an untouched
duplicate of Horizon 4.5.0 ("Copy of Horizon") from the same store.
It is not compatible with other versions until compared.

## New files (owned by this component)
- blocks/_header-drawer.liquid: the Menu drawer block and its settings.
- snippets/header-drawer-utilities.liquid: the Home, Search and Account row.
- snippets/header-drawer-link-styles.liquid: link and link group styles.
- snippets/header-drawer-layout-styles.liquid: header layout in drawer mode.

## Changed Horizon files
The full changed versions are in files/. Exact line-by-line changes
are in patches/.
- sections/header.liquid
  - Renders the Menu drawer block and the layout styles.
  - Adds the Cart button alignment setting.
  - Removes the old menu-button alignment CSS.
- snippets/header-drawer.liquid
  - Positioning below the header and the side setting.
  - Hamburger-to-X icon.
  - Renders the top row and the link styles.
- blocks/_header-menu.liquid
  - Now desktop-only.
  - Its "mobile" variant and drawer settings were moved to _header-drawer.
- assets/header-drawer.js
  - toggle(event): reliable first tap.
  - New openSearch(event): opens the search popup from the drawer.

## Horizon files used but not changed
Snippets:
- header-actions
- header-row
- search
- accordion-custom-component
- contrast-override
- menu-font-styles
- submenu-font-styles
- summary-icon-styles
- link-featured-image
- localization-form
- resource-card
- slideshow-styles

Blocks:
- _header-logo
- _header-menu

Search popup:
- snippets/search-modal.liquid
- The element with the id `search-modal`, rendered in layout/theme.liquid.

Icons:
- icon-menu.svg
- icon-close-menu.svg
- icon-search.svg
- icon-account.svg
- icon-caret.svg
- icon-plus.svg

The Home icon is an inline SVG inside the top-row snippet.

Account:
- The `<shopify-account>` element.
- The header section's `customer_account_menu` setting.

Script helpers in header-drawer.js:
- removeTrapFocus
- Horizon's component refs and `on:click` event system

## Theme values relied on
- --header-height, set by Horizon's header.
- --page-margin and --padding-lg, used for alignment with the header icons.
- `#header-component[data-menu-style='drawer']`, Horizon's drawer-mode marker.
- The new `data-cart-button-position` attribute, added by this component.
- Horizon menu drawer classes:
  - .menu-drawer
  - .menu-drawer__menu
  - .menu-drawer__submenu
  - .menu-drawer__menu-item--mainlist

## Translations
- Editor labels: translations/en.default.schema.entries.json
- Storefront text: translations/en.default.entries.json (the Home label)

## Saved settings
Copying files does not copy saved settings or the chosen menu.
Values from the test theme are in examples/ for reference.
