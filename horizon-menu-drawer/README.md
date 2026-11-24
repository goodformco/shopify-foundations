# Horizon menu drawer

## Purpose
Replaces Horizon's menu drawer with a cleaner, AG1-inspired drawer.
It is used everywhere Horizon shows a drawer: phones, tablets, and
desktop when the header switches to drawer mode.

## Status
Built and tested in one unpublished Horizon 4.5.0 test theme
("Copy of Copy of Horizon"), 18–20 November 2026.

This is a theme-dependent baseline, not a standalone package.
It edits four Horizon files and adds four new ones.
See DEPENDENCIES.md and INSTALL.md.

## What it does
- The drawer opens below the whole header (including a sticky header)
  and is full width on phones. On larger screens it attaches to the
  side you choose.
- The hamburger is the only open/close control and turns into an X.
- A top row of icons: Home, Search and Account.
  - Search opens the theme's own search popup.
  - Account opens the same account popup as the header.
  - Account shows only when customer accounts are turned on.
  - The row and its divider line up with the header's icons.
- Menu links are plain vertical text with their own font controls.
- The links can optionally sit inside a styled box ("link group").
  It is invisible by default.
- In drawer mode the header shows only the menu button, logo and cart.
  Search and account move into the drawer rather than being copied.
- Submenus (up to three levels) use Horizon's submenu panels and back button.
- Desktop hover dropdowns are unchanged.

## Structure and settings
Settings are split so desktop and drawer don't mix.

Header section (only the section can position header buttons):
- Menu button alignment
- Cart button alignment

Menu block (`_header-menu`): desktop menu only.
Its old mobile drawer settings were moved out.

Menu drawer block (`_header-drawer`, new static block):
- Menu: which menu the drawer shows.
- Colors: background, text.
- Behavior: drawer side, accordion, expand first, dividers, divider color.
- Drawer top row: alignment, space above, divider width
  (Match header, or Custom with left and right spacing).
- Drawer links: font, size, weight, case, letter spacing,
  space between links, font style.
- Drawer link group: background, text color, border thickness
  and color, corner radius, shadow, padding, margins.

## Approach
CSS first. Component CSS lives in `<style>` tags inside its snippets.
The theme's compiled stylesheet bundle stopped rebuilding during
development.
JavaScript changes are kept small: a reliable first tap, and opening
search from the drawer. An earlier JS measuring approach felt laggy
and was removed.
Positions reuse the theme's own values (header height, page margin,
padding) instead of fixed screen sizes.

## Test results

Environment: Horizon 4.5.0, unpublished test theme, header sticky
mode "Always", page-width header. Unless marked owner-confirmed,
results were checked by measuring the rendered storefront
(screenshot service) at the listed widths.

Passed:
- Top row icons and divider line up with the header menu icon:
  375px (two header layouts) and 1024px (forced drawer mode).
- Drawer sits directly below the header with no gap, including
  on a scrolled page with the always-sticky header.
- Drawer reaches the bottom of the screen.
- Drawer opens from the left or right. When closed it is fully hidden.
- Space between links and the link group settings render as set.
- Header in drawer mode shows only the menu button, logo and cart.
  The logo moves correctly for each button position.
- Submenus with a three-level test menu: opening Shop shows its
  child links, and back returns to the main drawer.
  Checked at 375px and 1024px.
- Desktop view at 1280px is unchanged: hover dropdowns are intact.
- Account popup opens from the drawer on a phone (owner-confirmed).
- Theme Check: no new errors. Two warnings:
  - The header section has 44 settings. Before, it had 43, and
    the warning already existed.
  - A complexity warning in `product-media-gallery-content`. It
    already existed and is unrelated.

Not tested:
- Smoothness of the open/close slide on a real device. The motion
  can't be captured by screenshots. Owner to check.
- Keyboard operation and visible focus inside the drawer.
- A physical tablet, and screen rotation.
- Header sticky mode "On scroll up" and "Never".
- A real second header row.
- Other Horizon versions or other Horizon-family themes.
- Languages other than English.

## Known limitations
- The drawer link settings style top-level links only.
  Submenu links keep Horizon's styling.
- Submenu links start at Horizon's edge spacing, slightly left of
  the main links and icons.
- The Menu drawer block repeats its own font and case settings,
  because one block can't read another block's settings.

## Future refinements (backlog, not implemented)
- Current-page underline in the drawer.
- Desktop hover underline.
- Submenu links that follow the drawer link settings and alignment.
- Drawer direction: a choice between top-to-bottom (current) and
  bottom-to-top. In bottom-to-top, the top row sits at the very bottom
  and the links stack above it. This makes links easier to reach with
  a thumb on large phones, possibly on every screen.
- Bigger redesign idea: let the whole header live on the right edge
  or the bottom of the screen.
- Standalone portability: fewer dependencies on Horizon internals.
