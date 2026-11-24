# Social cards installation notes

## Status
Preserved from a working Horizon-based blog theme.
This extracted package has not been installation-tested.

It requires compatible theme styling and shared snippets.
It is not yet a standalone component.

## 1. Prepare
Use an unpublished duplicate of the destination theme.
Read DEPENDENCIES.md before copying files.

Do not overwrite existing files with the same names
without comparing their contents first.

## 2. Check theme dependencies
The destination needs compatible versions of:

- snippets/icon.liquid, including the selected social icons
- snippets/spacing-style.liquid
- snippets/contrast-override.liquid
- snippets/brightness-opacities.liquid, called by contrast-override

It also needs the theme classes, settings and CSS variables
listed in DEPENDENCIES.md.

Matching filenames alone do not establish compatibility.
If dependencies are absent or incompatible, stop and adapt
the component rather than copying the whole theme.

## 3. Copy the core files
Copy from the library's files folder into the theme:

- sections/social-cards.liquid
- blocks/_social-card.liquid
- assets/social-cards.js

Do not copy the enclosing social-cards/files folders.

CSS is contained in the section.
The section already references social-cards.js.
Do not add a second script reference.

## 4. Merge English editor labels
Use translations/en.default.schema.entries.json as a reference.

Merge the required entries into the destination theme's
existing locales/en.default.schema.json.

- Preserve unrelated entries.
- Reuse existing matching entries.
- Review conflicting values rather than replacing them blindly.
- Do not create duplicate keys or duplicate top-level groups.
- Do not replace the entire locale file.

The reference filename is for library organization.
Do not install it as a separate theme locale file.

Other editor languages need their own translated entries.

## 5. Place and configure
The section must be added to a compatible template or
section group, with _social-card blocks inside it.

Placement instructions must be verified against the
destination theme and editor before installation.

Configure headings, platforms, links, handles, card content
and optional images separately.

The source files do not include the blog's saved section
placement, account details or image selections.

## 6. Validate
- Run Theme Check and resolve new errors.
- Check editor labels and settings.
- Test desktop and mobile layouts.
- Select and switch cards.
- Test mobile tap-again closing and scrolling.
- Test keyboard navigation and visible focus.
- Check links and optional images.
- Check custom backgrounds and text contrast.
- Check multiple instances on one page.
- Confirm existing page content is unaffected.

Do not mark the package installation-tested until these
checks have been completed and recorded.

## Removal
Remove installed section instances first.
Then remove component files only if nothing else uses them.

Do not delete shared snippets, theme styles or translation
entries that other features still use.

## Future work
Standalone settings, theme inheritance and reduced shared
dependencies are planned improvements, not current features.
See README.md for the design direction.
