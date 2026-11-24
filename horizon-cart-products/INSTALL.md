# Horizon cart products installation

## Status
Built and owner-tested in Horizon 4.5.0.
Fresh installation owner-confirmed working on 22 Nov 2026 in
"Install - Menu + Cart Swipe + Cart Products v1.0".
The five installed code files and four translation entries were
verified against the package. Individual interaction checklist
results were not recorded separately.

## 1. Prepare
- Use an unpublished duplicate of the destination theme.
- Check its version in Theme settings > Theme info.
  These files were built from Horizon 4.5.0.
- Check whether the four Horizon files below were already edited
  (for example by cart-drawer-swipe or other work). That decides 3A or 3B.

## 2. Add the new file
Copy from files/ into the theme (only the file, not the files/ folder):
- snippets/cart-line-savings.liquid

## 3. Update the four Horizon files
Pick one way:

A. Horizon 4.5.0 with no earlier edits to these files:
   replace each with the version in files/.
   - snippets/cart-products.liquid
   - snippets/cart-summary.liquid
   - snippets/quantity-selector.liquid
   - assets/component-cart-quantity-selector.js

B. Another version, or the files were already edited:
   don't replace them. Open the matching file in patches/.
   - Lines starting with "-" are removed.
   - Lines starting with "+" are added.
   - Lines starting with a space are context, to help you find the spot.
   Apply the changes by hand. Keep your own edits.

## 4. Merge translations
Merge translations/en.default.entries.json into locales/en.default.json.
- Add the four keys inside the existing "content" group.
  Don't create a second "content" group.
- Skip keys that already exist with the same text. Review any that differ.
- Don't replace the locale file.

## 5. Configure
- Theme settings > Badges: make sure the Sale badge background contrasts
  with the cart background (the Save pills use these colors).
- Optional: Theme settings > Cart: currency code for cart items and
  cart total.

## 6. Check
- Run Theme Check; note new issues separately from existing ones.
- Add a sale item (compare-at price) and a full-price item. Check rows,
  Total savings and Subtotal on the cart page and in the drawer.
- Apply a product discount code and an order discount code; confirm
  Total savings = row savings + order discount, and the struck Subtotal
  equals the full original prices.
- Quantity 1 shows the bin; tapping it removes the item. Quantity 2+
  shows minus.
- Open and close "Have a promo code?" with mouse and keyboard.
- Empty the cart: the "Browse our products…" line shows on the cart page
  and in the drawer.
- Check a phone width and a desktop width.

## Removal
Restore the four Horizon files from a stock copy (or reverse the patches),
delete snippets/cart-line-savings.liquid, and remove the four
translation keys.
