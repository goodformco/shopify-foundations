# Social cards dependencies

## Status
Core files preserved from the Horizon-based blog theme.
Not yet tested as a separate installation.

## Core files
- sections/social-cards.liquid
- blocks/_social-card.liquid
- assets/social-cards.js

Component CSS is inside sections/social-cards.liquid.

## Shared snippets
- icon: supplies the built-in social platform icons.
- spacing-style: supplies section spacing styles.
- contrast-override: used when a section background colour is set.

These snippets are not yet included in the package.
Their own dependencies must be checked before copying them.

## Theme styling
The component uses existing theme classes:
- section and section-width classes
- section-background
- spacing-style
- h3
- rte
- button and button-secondary
- svg-wrapper

It also uses theme variables for spacing, fonts, colours,
header height and animation timing.

The component is not yet theme-independent.

## Editor translations
Both Liquid schemas use translated names, labels and options.
Required entries must be merged into the destination theme's
schema locale files, such as en.default.schema.json.

Do not replace entire locale files.

## Content and images
Copying the source files does not copy configured card content,
social links, selected images or section placement.
These must be configured separately.

## Behavior
CSS and radio inputs handle card selection.
JavaScript adds mobile closing and scrolling behavior.
Desktop layout begins at 990px.

## Shared-snippet inspection

- icon.liquid contains the theme's full icon catalogue.
  A future standalone version should include only the
  supported social icons, using a component-specific name.

- spacing-style.liquid relies on --spacing-scale and
  matching theme spacing classes.

- contrast-override.liquid calls brightness-opacities.liquid
  and relies on global colour settings and palette variables.

These shared files are not bundled in the preserved package.
The current package requires compatible theme dependencies.
Standalone replacements are future work, not implemented.
