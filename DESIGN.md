---
name: Landing website theme
library: "@heroui/react"
styles: "@heroui/styles"
modes:
  - light
source: "app/globals.css"
---

# Landing website theme

This file is the visual contract for the Landing Health marketing site. It starts from the HeroUI v3 default `DESIGN.md` and replaces the default values with the Landing theme. `app/globals.css` is the source of truth. When this file and `app/globals.css` disagree, follow the CSS and fix this file in the same change.

`AGENTS.md` says how to build with HeroUI. This file says what the result looks like.

## Design direction

- The page is solid white, including the header and the footer. Do not add gradients, background images, or background video.
- All text is black. That includes navigation, labels, hints, and button labels. Do not use gray text to lower emphasis. Use size, weight, and spacing.
- Light blue `mist` marks small things: the primary button, the logo tile, chips in the dashboard preview. It never fills a section.
- Orange `ember` is a highlight for one small mark, such as a card label. It is never a button color. The italic word in the hero is black, with a gray shimmer sweep.
- The site is black and white. Black `ink` draws focus outlines, thin rules, and dark cards. Cards use the neutral `paper` fill, and video frames are black while the video loads.
- The site has one mode. Do not add dark mode, a `.dark` class, `data-theme="dark"`, or a `prefers-color-scheme` rule.
- Build from HeroUI components before you write a custom control. Style them with the tokens below.

## Colors

Use the semantic HeroUI utilities for anything built from HeroUI components. Use the Landing palette utilities for page layout and brand marks. Do not write a hex value in a component.

| Role | Tailwind utilities | CSS variables | Value | Use |
| --- | --- | --- | --- | --- |
| Canvas | `bg-background text-foreground` | `--background`, `--foreground` | white, black | Page background and all text |
| Surface | `bg-surface` | `--surface` | white | Cards and accordions |
| Secondary surface | `bg-surface-secondary` | `--surface-secondary` | `#f5f5f5` (paper) | A quiet nested region |
| Tertiary surface | `bg-surface-tertiary` | `--surface-tertiary` | `#ebebeb` (panel) | A stronger nested region |
| Overlay | `bg-overlay` | `--overlay` | white | Menus, popovers, dialogs |
| Accent | `bg-accent text-accent-foreground` | `--accent`, `--accent-foreground` | `#dcebf4` (mist), black | The primary action |
| Neutral action | `bg-default text-default-foreground` | `--default`, `--default-foreground` | `#ebebeb`, black | Neutral controls and selected states |
| Focus | `outline-focus`, `ring-focus` | `--focus` | `#000000` (ink) | Focus outline on every control |
| Field | `bg-field text-field-foreground` | `--field-background`, `--field-foreground`, `--field-border` | white, black, black 1px border | Inputs and text areas |
| Border | `border-border` | `--border` | ink at 20% | Component edges |
| Separator | `border-separator` | `--separator` | ink at 10% | Rules between rows and sections |
| Danger | `text-danger`, `bg-danger` | `--danger` | `oklch(0.52 0.2 26)` | Validation errors only. Darker than the HeroUI default so 13px error text passes contrast on white |

The accent is a pale color, so the focus color is set apart from it. Never rely on `--accent` for a focus ring or for text.

The Landing palette sits beside the semantic tokens as plain Tailwind colors.

| Utility stem | Value | Use |
| --- | --- | --- |
| `mist` | `#dcebf4` | Small light blue fills |
| `paper` | `#f5f5f5` | Neutral card and diagram fills |
| `panel` | `#ebebeb` | Diagram panels |
| `ink` | `#000000` | Rules, outlines, dark cards |
| `slate` | `#404040` | Body text inside the dashboard preview only |
| `on-ink` | `#f5f5f5` | Text on an ink background |
| `ember` | `#ea652b` | The orange highlight |
| `ember-text` | `#d55823` | Orange text that must pass contrast on white |
| `ember-deep` | `#c9521e` | Pressed or darker orange |
| `ember-soft` | `#f28a59` | Lighter orange |

HeroUI owns the names `accent`, `accent-soft`, and `accent-hover`. The orange family is named `ember` so the two never collide.

## Typography

HeroUI components inherit the site fonts. Body text is Geist (`font-sans`). Headings are Roboto Serif (`font-display`) at weight 380 and 110% width, with its optical size axis on.

Take every heading, lead, body, and label size from the `type` table in `lib/site.ts`. Do not write a new font size on a page.

- Body text is 15px with a 1.6 to 1.65 line height.
- Headings use sentence case and `text-balance`.
- Small uppercase labels use `type.label`. Use them only where the site already does, such as the footer.
- Use tabular numbers for values that change, such as the revenue calculator totals.

## Layout

The spacing base is 4px through Tailwind spacing utilities.

- Use `container` from `lib/site.ts` for reading-width sections.
- Use `edgePad` from `lib/site.ts` for sections that run near the full window width. Do not copy its class string.
- Use `sectionPad` for vertical section spacing.
- Keep tile captions centered. `components/TileRow.tsx` owns tile rows.
- Never crop a product video to fit a tile. Fit the tile to the video.
- The header must fit one row at 320px wide. Below the `md` breakpoint the navigation links live in the menu.

## Shapes

The base radius is `--radius: 0.5rem`, so the HeroUI radius scale equals the Tailwind default scale.

- Buttons and fields use 6px (`rounded-md`, `--field-radius`).
- Media tiles and the dashboard preview use 12px (`rounded-xl`).
- Do not use pill-shaped buttons.

## Elevation

The site is flat. Rules and spacing separate content.

- Do not add a shadow to a card, a field, or a button.
- The dashboard preview is the one raised element. It uses `shadow-preview`.
- Overlays such as the phone menu keep the HeroUI overlay shadow so they read as floating.

## Components

- **Buttons.** Use the HeroUI `Button` `primary` variant for an action inside a form or a control. A page has one primary action per view. A call to action that navigates is a link, so use `components/ButtonLink.tsx`, which carries the press ripple.
- **Forms.** Use HeroUI `Form`, `TextField`, `Label`, `Description`, `Input`, `TextArea`, and `FieldError`. Labels sit above the field in black. Show a validation message under the field it belongs to. Show a pending state on the submit button while the request runs.
- **Disclosure.** Use HeroUI `Accordion` for stacked questions or story sections. Style it as a ruled list, with a black rule above, thin separators between items, and the `plus` icon that turns 45 degrees when the item is open. No card background.
- **Overlays.** Use HeroUI overlay components so focus, Escape, and outside press behave correctly. Do not build a menu or dialog from a `div`.
- **Icons.** Use `components/Icon.tsx`. Add a glyph there in the same stroke style before you import an icon package.
- **Tables.** Keep data tables as plain ruled rows, like the open roles table on `/careers`.

## Motion

The user approved each animation below. Keep its timing, easing, and trigger exactly as it is. A change to any of them needs the user's request.

| Animation | Where | Owner |
| --- | --- | --- |
| Press ripple | Every `ButtonLink` | `components/ButtonLink.tsx`, `animate-rippling` |
| Hero rise and arrive | Home hero text and preview | `app/page.tsx`, `animate-rise`, `animate-arrive` |
| Shimmer on the highlighted hero word | Home hero | `.shimmer` in `app/globals.css` |
| Scroll reveal and line reveal | Sections and rules | `components/Reveal.tsx`, `[data-reveal]` |
| Logo marquee | Home, Awarded by | `components/Marquee.tsx` |
| Network feed rows | Security | `components/NetworkFeed.tsx` |
| Loading dots | Sign-in style indicators | `components/LoadingDots.tsx` |
| Media expand | Click a tile video or image | `components/ExpandableMedia.tsx`, React `ViewTransition` |
| Looping product videos | Tiles | `components/LoopVideo.tsx` |
| Accordion open and close | About, Our story | `components/StoryAccordion.tsx`, HeroUI `Accordion` |
| Press scale | HeroUI buttons | HeroUI default |

Rules for new motion:

- Motion explains a state change, such as a panel that opens or a menu that appears. Do not add motion as decoration.
- Use the HeroUI component's own animation before you write keyframes.
- Use `--ease-out-soft` for custom transitions, and keep them under 400ms for controls.
- Every animation stops or shortens under `prefers-reduced-motion: reduce`.
- HeroUI sets `view-transition-name: none` on the root. `app/globals.css` restores the default so the media expand transition keeps its cross-fade. Do not remove that rule.

## Interaction

- Every interactive element shows a 2px ink focus indicator on keyboard focus. Site links use an outline with a 2px offset. HeroUI components use their own ring in the same color.
- Style states with the React Aria data attributes that HeroUI exposes, such as `data-hovered`, `data-pressed`, `data-focus-visible`, `data-disabled`, and `data-invalid`.
- Navigation links have no hover background. The current page is semibold and carries `aria-current="page"`.
- Disabled controls use the HeroUI default opacity of 0.5.
- Touch targets are at least 36px tall. Icon-only buttons have an accessible name.

## Do

- Read the component page in `.heroui-docs/react/` before you use a HeroUI component.
- Use semantic tokens inside HeroUI components and Landing palette utilities for page layout.
- Keep the first paint useful without JavaScript. Text, links, and the open accordion item render on the server.
- Add screenshots of every changed view to the pull request, before and after.

## Don't

- Don't hardcode a color, radius, shadow, or font size that a token or the `type` table already names.
- Don't use `gray-*` utilities or `text-muted` on page text.
- Don't restyle a HeroUI component until it stops looking like the rest of the site. Change the theme variables in `app/globals.css` so every component follows.
- Don't install a component from another library when HeroUI has one. A VantaUI item is allowed only when HeroUI has no equivalent and the item follows this file.
- Don't state a compliance claim, a payout term, or a patient outcome that the page copy does not already make.

## Source of truth

- Landing theme variables and animations: `app/globals.css`
- Type, spacing, and button tables: `lib/site.ts`
- HeroUI default variables: `node_modules/@heroui/styles/dist/themes/default/variables.css`
- HeroUI Tailwind token mappings: `node_modules/@heroui/styles/dist/themes/shared/theme.css`
- HeroUI component docs: `.heroui-docs/react/components/`
