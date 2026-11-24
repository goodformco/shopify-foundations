# Split Hero dependencies

## Status
The original block is preserved unchanged.
Installation testing has not yet been completed.

## Required theme blocks
- group
- image

The saved example also uses:
- text
- button
- nested group blocks

These blocks provide their own settings.
Their controls are not defined by split-hero.liquid.

## Supporting theme code
The blocks rely on shared snippets for layout, sizing,
spacing, borders, typography, backgrounds and contrast.

Custom button colours additionally rely on:
- button-custom-styles
- resolve-custom-hover
- util-palette-hover-shift
- matching theme button styles and palette settings

Do not copy or replace shared theme files blindly.

## Split Hero styling dependencies
- --font-h2--size controls desktop image scaling.
- --page-margin and --page-content-width control the
  automatic content inset, with fallbacks in the block.
- Child blocks use the group-block and image-block classes.

Below 750px, the image stacks above the content.

## Compatibility check
The Group, Image, Text and Button block files, along with
their traced supporting snippets, matched the copies in
Home button test during inspection on 18 November 2026.

This is a source comparison, not a completed installation
or visual test. Other Horizon versions may differ.

## Saved content
The original nested layout and chosen setting values are
stored separately in the source homepage template.

Copying split-hero.liquid alone does not reproduce that
saved arrangement, text, links or image selection.
