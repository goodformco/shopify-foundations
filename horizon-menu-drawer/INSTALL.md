# Horizon menu drawer installation

## Status
Built and tested in one Horizon 4.5.0 test theme.
A fresh installation from this package has not been tested yet.

## 1. Prepare
- Use an unpublished duplicate of the destination theme.
- Check its version in Theme settings > Theme info.
  These files were built from Horizon 4.5.0.
- Note any drawer settings you want to keep: colors, accordion,
  dividers and the drawer menu. The old drawer settings in the Menu
  block don't carry over.

## 2. Add the new files
Copy these from files/ into the theme. Only the files, not the
enclosing files/ folder:
- blocks/_header-drawer.liquid
- snippets/header-drawer-utilities.liquid
- snippets/header-drawer-link-styles.liquid
- snippets/header-drawer-layout-styles.liquid

## 3. Update the four Horizon files
Pick one way:

A. Horizon 4.5.0 with no earlier edits to these files:
   replace each with the version in files/.
   - sections/header.liquid
   - snippets/header-drawer.liquid
   - blocks/_header-menu.liquid
   - assets/header-drawer.js

B. Another version, or the files were already edited:
   don't replace them. Open the matching file in patches/.
   - Lines starting with "-" are removed.
   - Lines starting with "+" are added.
   - Lines starting with a space are context, to help you find the spot.
   Apply the changes by hand. Keep your own edits.

Do not add extra references to the snippets or script.
The changed files already render them.

## 4. Merge translations
- Merge translations/en.default.schema.entries.json into
  locales/en.default.schema.json.
- Merge translations/en.default.entries.json into
  locales/en.default.json.

For both:
- Add each key inside its existing group (content, names, options,
  settings). Don't create a second group with the same name.
- Skip keys that already exist with the same text. Review any that differ.
- Don't replace the locale files or install the entry files as locale files.

## 5. Configure in the theme editor
- Header > Menu drawer: choose the menu. Set the colors, side and
  link styles.
- Header section: set Menu button alignment and Cart button alignment.
- examples/ shows the values used in the test theme.

## 6. Check
- Run Theme Check. Resolve new errors. The header section settings
  warning already existed in Horizon.
- Phone width:
  - The drawer opens below the header.
  - The icons line up with the header.
  - Home, Search and Account work.
  - Closing works from both sides.
- Tablet or forced drawer mode: the drawer attaches to the chosen side.
- Desktop: hover dropdowns are unchanged.
- Use a menu with nested items: test submenus and back.
- Scroll down and open the drawer with the sticky header.
- Test the keyboard: Tab through the drawer, check that focus is
  visible, and check what Escape does. This was not tested yet.
- Check on a real phone.

## Removal
- Restore the four Horizon files from an unedited copy of the theme.
- Delete the four new files.
- Remove the added translation keys only if nothing else uses them.
