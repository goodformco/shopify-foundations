# Changelog: add-to-cart-feedback

## v1.0 (26 Nov 2026)
First release, from the build theme "Build - Cart Upsell".
- One tap adds one item (add lock until the cart confirms).
- Feedback chain: spinner, checkmark, fly, header count, then drawer. No timers or fake delays.
- Drawer auto-opens only after a successful add, after the count bumps; calmer count bump.
- Quick add: spinner and checkmark on the card button, 12px invisible tap ring on phones, no tap highlight, `button.` specificity fix.
- Choose popup: instant skeleton, double-tap guard, phone layout with pinned header and buttons and scrolling options, drag-ignore, no full-screen jump.

Evidence: owner-tested on a phone in the build theme. Fresh install test pending.
