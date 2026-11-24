# Home button installation — Horizon

## Status
Installed in an unpublished Horizon test theme.
Merchant confirmed it works on 17 November 2026.
Theme Check reported zero errors and two unrelated warnings.

Other themes are not yet tested.
Mobile, keyboard and text-mode checks are still pending.

## 1. Prepare a test theme
Duplicate the destination theme and keep it unpublished.
Do not install into your live theme first.

## 2. Copy the files
Create these files in the theme using the library contents:

- snippets/home-button.liquid
- assets/icon-home.svg
- assets/home-button.css

When creating a file inside an existing folder, enter only
the filename, not the folder path.

## 3. Add English translations
Open locales/en.default.json, not en.default.schema.json.

Check whether these keys already exist before adding them.

Inside the existing accessibility object, add:
"home": "Home",

Inside the existing content object, add:
"home_title": "Home",

Keep existing entries and valid JSON punctuation.
Do not replace the whole locale file.
Add equivalent labels for other storefront languages as needed.

## 4. Load the CSS
In snippets/stylesheets.liquid, add this after the existing
stylesheet lines, without removing them:

{{ 'home-button.css' | asset_url | stylesheet_tag }}

Load it once.

## 5. Insert the button
Open snippets/header-actions.liquid.

In the tested Horizon version, find:
{% if settings.cart_type == 'drawer' and template.name != 'cart' %}

Immediately above that line, insert:
{% render 'home-button', display_style: display_style %}

Keep the existing cart condition and its contents unchanged.
This placement preserves the existing header controls.

Inspect the header first if installing into another version.
Do not add a duplicate Home button.

## Styling dependencies
This implementation uses Horizon's existing styles:

- header-actions__action
- header-actions__text-style
- svg-wrapper
- hidden, mobile:hidden and desktop:hidden
- --icon-stroke-width
- --gap-xs

The separate CSS contains only Home-specific additions.
It is not a standalone header stylesheet.

## Validation
- Run Theme Check.
- Preview the unpublished theme.
- Check the homepage link from another page.
- Check desktop and mobile.
- Check icon and text presentation.
- Check keyboard focus and activation.
- Confirm existing cart, account and search controls still work.
- Confirm aria-current="page" appears only on the homepage.

Complete the remaining checks before treating this as a
fully validated release.

## Adapting to other themes
Keep the Home link behavior, accessible label and icon.
Adapt styling classes, variables and breakpoints to the
destination theme's native header controls.

Do not copy Horizon's whole header stylesheet.

## Removing the installation
Remove the Home render call and its CSS-loading line first.
Then remove the three component files if nothing else uses them.

Remove translation entries only if nothing else uses them.
