# Install Cart Clear All

Built for Horizon 4.5.0. Install and test in an unpublished theme. Compare destination files first and preserve unrelated changes. `patches/` holds reference diffs against stock Horizon 4.5.0.

## 1. Add the snippet
Copy `files/snippets/cart-clear-all.liquid` into the theme as `snippets/cart-clear-all.liquid`.

## 2. Render it after the product table
Open `snippets/cart-products.liquid`. Find:

```liquid
          </tbody>
        </table>
```

Replace with:

```liquid
          </tbody>
        </table>
        {% render 'cart-clear-all' %}
```

## 3. Add the click behavior
Open `assets/component-cart-items.js`. Make four replacements.

**3a.** Find:

```js
  /**
   * Updates the quantity.
```

Replace with:

```js
  /**
   * Removes every line in one cart update and shows the empty state right away.
   */
  onClearAll() {
    this.updateQuantity({ line: 0, quantity: 0, action: 'clear-all' });

    const template = document.getElementById('empty-cart-template');
    if (!(template instanceof HTMLTemplateElement)) return;

    const clone = document.importNode(template.content, true);
    startViewTransition(() => {
      document.getElementById('cart-drawer-heading')?.remove();
      this.replaceChildren(clone);
    }, [this.isDrawer ? 'empty-cart-drawer' : 'empty-cart-page']);
  }

  /**
   * Updates the quantity.
```

**3b.** Find:

```js
      const body = JSON.stringify({
        line: line,
        quantity: quantity,
```

Replace with:

```js
      const isClearAll = config.action === 'clear-all';
      const allLineKeys = this.refs.cartItemRows.map((row) => row.dataset.key ?? '').filter(Boolean);

      const body = JSON.stringify({
        ...(isClearAll
          ? { updates: Object.fromEntries(allLineKeys.map((key) => [key, 0])) }
          : { line: line, quantity: quantity }),
```

**3c.** Find:

```js
          lines: [{ id: lineId, quantity }],
```

Replace with:

```js
          lines: isClearAll ? allLineKeys.map((id) => ({ id, quantity: 0 })) : [{ id: lineId, quantity }],
```

**3d.** Find:

```js
      const response = await fetch(`${Theme.routes.cart_change_url}`, fetchConfig('json', { body }));
```

Replace with:

```js
      const cartUrl = isClearAll ? Theme.routes.cart_update_url : Theme.routes.cart_change_url;
      const response = await fetch(`${cartUrl}`, fetchConfig('json', { body }));
```

Then, a few lines below, find:

```js
      if (parsedResponseText.errors) {
        this.#handleCartError(line, parsedResponseText);
```

Replace with:

```js
      if (parsedResponseText.errors) {
        if (isClearAll) {
          this.dispatchEvent(new CartErrorEvent({ error: parsedResponseText.errors, code: 'INVALID' }));
          await this.#refreshCartSection({ shouldRender: () => true });
        } else {
          this.#handleCartError(line, parsedResponseText);
        }
```

## 4. Check
- Run Theme Check; no new errors.
- Add 2+ products. In the drawer and on the cart page: Clear all sits below the last row, right-aligned, at the same distance as between two rows; no divider line above it.
- Click Clear all: the empty-cart view appears at once, the header cart count goes to 0, and a reload shows the cart still empty.
- Keyboard: Tab reaches Clear all with visible focus; Enter clears the cart.

## Removal
Delete `snippets/cart-clear-all.liquid`, remove the render line from step 2, and undo the replacements in step 3.
