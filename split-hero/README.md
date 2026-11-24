# Split Hero

## Purpose
A parent layout with two children: a content group and an image.

Split Hero positions them relative to each other.
Each child retains its own controls.

Split Hero
├── Content group
│   └── Content blocks you choose
└── Image

It is not a fixed design with a required number of headings
or buttons.

## Status
Preserved from a Horizon-based theme export and installed
in the unpublished “Home button test” theme.

The merchant confirmed that it works as intended.

This is a Horizon-dependent baseline, not a standalone
component or a claim of compatibility with every Horizon version.

## Installation
1. Read DEPENDENCIES.md and check the destination theme.
2. Use an unpublished test theme.
3. Copy files/blocks/split-hero.liquid into the theme as
   blocks/split-hero.liquid.
4. In the theme editor, add the Split hero block inside
   a compatible section. The tested installation used Hero.
5. Add content inside its Content group and select an image.
6. Configure the parent and child settings, then save and preview.

Split Hero is a block, not a separate section.
No homepage-template replacement is required.

The original text, links, image selection and nested content
arrangement are not included automatically.

## Parent settings
- Content-to-image gap
- Vertical alignment
- Desktop image size relative to the theme's H2 font size
- Separate desktop and mobile widths
- Individual top, bottom, left and right padding
- Background colour
- Border style, thickness and colour
- Corner radius

The content group, image and nested blocks provide their
own settings through the destination theme.

## Responsive behavior
At widths below 750px, the image stacks above the content.
At wider widths, content and image sit side by side.

## Validation — 18 November 2026
- Installed in the Horizon-based “Home button test” theme.
- Installed block matched the preserved library source,
  ignoring line-ending formatting.
- Theme Check reported zero errors and two pre-existing,
  unrelated warnings.
- Merchant confirmed the component works as intended.

These results do not establish exhaustive setting-by-setting,
accessibility, physical-device or cross-theme validation.

## Dependencies
See [DEPENDENCIES.md](DEPENDENCIES.md).

Compatible Group and Image blocks are required.
Additional content blocks retain their own theme dependencies.

## Scope and stopping point
This round preserves the existing structure and settings,
documents dependencies, and establishes one working installation.

The component can be parked as a Horizon-dependent baseline.
Standalone portability and additional features belong to
separate future rounds.
