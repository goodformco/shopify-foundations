# Home button

Status: working in our Horizon-based blog theme.
Not yet tested in other themes.

## Purpose
Give visitors a direct link to the homepage from the header.

## Behavior
- Links to the store's homepage.
- Supports icon and text presentation.
- Includes an accessible Home label.
- Marks itself as the current page on the homepage.
- Requires no JavaScript.

## Design approach
Reuse the destination theme's header-icon styles.
Match its spacing, colour, icon sizing and hover behavior.
Add custom CSS only where necessary.

## Current source
- Home link inside snippets/header-actions.liquid
- House icon in assets/icon-home.svg
- Home-specific CSS inside snippets/header-actions.liquid
- Translation entries: accessibility.home and content.home_title

## Porting checklist
- Copy only the Home button markup and icon, not the whole header.
- Adapt the styling classes to the destination theme.
- Include the required translations.
- Check desktop, mobile and keyboard navigation.
- Check the homepage link and current-page indication.

## Dependencies
The current implementation uses Horizon classes and CSS variables.
It is not a standalone, drop-in component yet.
