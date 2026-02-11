---
description: [UI Design] Header and Branding Template
---

This template defines the standard edge-to-edge header layout used in the documentation and future projects.

## Header Structure
The header is built with MUI `AppBar` and `Toolbar`. It is `sticky` and uses absolute positioning for edge elements to keep the search bar perfectly centered.

### Key Layout Rules
1. **Full Width**: The `Toolbar` must have `width: "100%"` and NO `maxWidth` or `mx: "auto"` that might constrain it on large screens.
2. **Pinned Branding (Left)**: The branding section (logo + text) is wrapped in a `Box` with `position: { md: 'absolute' }` and `left: { md: 24 }`.
3. **Pinned Actions (Right)**: The action buttons (GitHub, Theme Toggle) are wrapped in a `Box` with `position: { md: 'absolute' }` and `right: { md: 24 }`.
4. **Centered Search (Center)**: The search bar container uses `width: "100%"`, `maxWidth: 600`, and `display: "flex"`, `justifyContent: "center"`.

### Visual Specs
- **Logo Box**: `36x36px` with `1px` solid `divider` border and `8px` (radius-1) border-radius.
- **Logo Image**: `28x28px` centered inside the box.
- **Header Height**: `64px`.
- **Search Bar**: Pill-shaped (`borderRadius: 999`), `bgcolor: "secondary.main"`, with a `⌘K` keyboard hint.

## Responsive Behavior
- **Desktop (>=lg)**: Show logo, branding text, search bar, and actions.
- **Tablet/Mobile (<lg)**: Hide branding text (`display: { xs: 'none', lg: 'block' }`).
- **Mobile (<md)**: Change `Toolbar` to `justifyContent: "space-between"` and disable absolute positioning to prevent overlap.
