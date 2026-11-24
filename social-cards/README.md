# Social cards

## Purpose
Display social-account links with selectable profile cards.

## Status
Preserved from a working Horizon-based blog theme.
Installed and manually interaction-tested in one compatible
Horizon-based test theme.

Theme dependencies remain. This is not a standalone package.
Full validation is incomplete; see the test results below.

## Approach
Preserve the working version first.
Document dependencies before testing reuse.
Improve it incrementally, without redesigning during extraction.

## Behavior
Card selection works with radio inputs and CSS.
A small script adds mobile closing and scrolling behavior.

## Future design direction
Planned, not implemented in the preserved version.

The component should own its customization settings while
offering optional inheritance from the running theme.

### Defaults
- Inherit theme styling where practical.
- Provide sensible standalone fallbacks.
- Require minimal setup for a useful result.

### Customization
- Offer “Use theme” and “Custom” choices where appropriate.
- Allow independent control of typography, colours,
  spacing, buttons and card appearance.
- Keep content settings easy to find.
- Group advanced controls separately.

### Maintainability
- Keep theme-specific mappings in a small integration layer.
- Avoid copying an entire theme's styling system.
- Add controls when they solve a real need, not merely
  because they are possible.

Goal: more control without more routine setup work.

## Manual installation test — 17 November 2026

Tested in the unpublished Horizon-based “Home button test” theme.

### Desktop
Merchant-confirmed:
- Card switching works.
- Tab and Shift+Tab navigation work without getting stuck.
- Arrow keys switch accounts and display the matching card.
- Follow links are reachable with Tab and activate with Enter.
- Keyboard focus outlines are clearly visible.

### Mobile preview
Merchant-confirmed:
- Selecting an account opens its card.
- Switching between accounts works.
- Tapping an open account again closes its card.
- Tab reaches account controls and Follow links.
- Arrow keys switch accounts and reveal cards.
- Space opens and closes cards.
- Enter activates the Follow link.
- Keyboard focus outlines are clearly visible.

### Closing behavior
Escape-to-close is not implemented and is not a failed test.
It may be considered as a future mobile enhancement.
Desktop closing is not a current requirement.

### Scope
These results confirm the listed interactions in one
compatible theme, tested through the theme editor preview.

This is not full accessibility or cross-theme validation.
Mobile-preview results do not establish physical-device testing.

The library-only Button label guidance has not been
visually tested in this installation.
