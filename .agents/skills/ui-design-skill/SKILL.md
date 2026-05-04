---
name: ui-design-skill
description: "Implementation of the IvysBeauty Milk Tea Design System."
---

# UI Design Skill - Milk Tea Aesthetic

This skill provides guidelines and tokens for implementing the IvysBeauty visual identity.

## Design Tokens

### Colors (HSL)
- **Background**: `hsl(40 47% 97%)`
- **Surface**: `hsl(35 47% 92%)`
- **Primary**: `hsl(22 55% 38%)` (Warm Caramel)
- **Border**: `hsl(36 16% 82%)`
- **Muted**: `hsl(0 0% 24%)`

### Typography
- **Headings**: `Cormorant Garamond` (Serif)
- **Body**: `Inter` (Sans-serif)

### Shapes
- **Radius**: `5rem` or `rounded-full` for extreme roundness.

## Implementation Guidelines
1. **High Whitespace**: Maintain generous margins and padding to create a breathable, "natural" feel.
2. **Glassmorphism**: Use subtle blurs and semi-transparent backgrounds for cards if needed to enhance the "light" feel.
3. **Admin Modals**: Must be centered relative to the main content area, accounting for the 80px Header and 256px Sidebar. Max height should be `75vh`.
