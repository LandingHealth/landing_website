---
name: Landing website theme
library: "@heroui/react"
styles: "@heroui/styles"
modes:
  - light
source: "app/globals.css"
---

# Landing website theme

This file is the visual contract for the Landing Health marketing site. `app/globals.css` is the source of truth. When this file and `app/globals.css` disagree, follow the CSS and fix this file in the same change.

`AGENTS.md` says how to build with HeroUI. This file says what the result looks like.

## Design direction

- The site follows the visual system of vitalize.care: white and fog sheets, ink headings in Inter, one strong blue for actions, and soft blue gradient frames around product visuals. Landing keeps its own copy, logo, photos, and videos. Never copy Vitalize's logos, imagery, text, or font files.
- Sections alternate between white and `fog`. A sheet can round its top or bottom corners by 40px so it reads as laid over its neighbor.
- Blue marks actions and position: the primary button, the active feature menu item, eyebrows, and links. It never fills a content section. The announcement bar is the one full-width blue band.
- Product visuals sit inside a `GradientFrame`. The final call to action sits on the solid graphite `CtaSheet`. No other gradients, background images, or background video.
- `blue` also fills the one dark card per page (`DarkCard`), such as how Landing partners with a clinic.
- The site has one mode. Do not add dark mode, a `.dark` class, `data-theme="dark"`, or a `prefers-color-scheme` rule.
- Build from HeroUI components before you write a custom control. Style them with the tokens below.

## Colors

Use the semantic HeroUI utilities for anything built from HeroUI components. Use the Landing palette utilities for page layout. Do not write a hex value in a component.

| Role | Tailwind utilities | CSS variables | Value | Use |
| --- | --- | --- | --- | --- |
| Canvas | `bg-background text-foreground` | `--background`, `--foreground` | white, ink | Page background and default text |
| Surface | `bg-surface` | `--surface` | white | Cards and accordions |
| Secondary surface | `bg-surface-secondary` | `--surface-secondary` | fog | A quiet nested region |
| Overlay | `bg-overlay` | `--overlay` | white | Menus, popovers, dialogs |
| Accent | `bg-accent text-accent-foreground` | `--accent`, `--accent-foreground` | blue, white | The primary action |
| Neutral action | `bg-default text-default-foreground` | `--default`, `--default-foreground` | fog, ink | Neutral controls and selected states |
| Focus | `outline-focus`, `ring-focus` | `--focus` | ink | Focus outline on every control |
| Link | none | `--link` | blue | HeroUI `Link` color |
| Field | `bg-field text-field-foreground` | `--field-background`, `--field-foreground`, `--field-border` | white, ink, hair 1px | Inputs and text areas |
| Border and separator | `border-border`, `border-separator` | `--border`, `--separator` | hair | Component edges and rules |
| Danger | `text-danger`, `bg-danger` | `--danger` | `oklch(0.52 0.2 26)` | Validation errors only |

Ink is the focus color because it keeps at least 3:1 against white, fog, and the blue bar. On a blue fill, use `focus-visible:outline-white`, as the `onDark` button does.

The Landing palette sits beside the semantic tokens as plain Tailwind colors.

| Utility stem | Value | Use |
| --- | --- | --- |
| `ink` | `#191f2d` | Headings and primary text |
| `slate` | `#545a62` | Body text, leads, nav links |
| `mute` | `#9298a2` | Inactive feature menu items, captions |
| `hair` | `#cad0d7` | Rules between menu items and rows |
| `blue` | `#186ff1` | Primary buttons, active menu item, eyebrows, links, the announcement bar |
| `blue-light` | `#3d8bff` | Unused since the dark card moved to blue |
| `fog` | `#f4f4f4` | Alternate section background, secondary button |
| `edge` | `#bfcfdd` | The 1px border around the phone hero frame and phone media tiles |

`app/globals.css` holds three background utilities. `bg-frame` is the soft blue gradient frame behind product visuals, near-white blue at the top left into `#4f8df5` at the bottom right. `bg-frame-glow` is the phone hero frame, pale `#f2f7ff` at the top deepening into a bright `#4391f4` pool at the bottom, recreated in CSS from colors sampled off vitalize.care's frame image. `bg-cta` is solid `graphite` (`#262626`) behind the final call to action, with white text and a white button.

## Typography

HeroUI components inherit the site fonts. Everything is Inter (`font-sans`). Eyebrows and small labels are Geist Mono 500 (`font-mono`). Both load through `next/font/google` in `app/layout.tsx`.

Take every heading, lead, body, and label size from the `type` table in `lib/site.ts`. Do not write a new font size on a page.

| Key | Size | Use |
| --- | --- | --- |
| `h1` | 60px, 40px on phones, weight 600, line height 1 | One per page |
| `h2` | 40px, 32px on phones, weight 600, line height 1.1 | Section headings |
| `h3` | 24px, weight 600, line height 1.2 | Feature titles, card titles |
| `lead`, `leadOnDark` | 20px, line height 1.2, slate or white 70% | The line under an H1 or H2 |
| `body`, `bodyOnDark` | 16px, line height 1.45, slate or white 70% | Short blurbs |
| `eyebrow` | 16px Geist Mono uppercase | Section kickers, through `components/ui/Eyebrow.tsx` |
| `label` | 12px Geist Mono uppercase | Small captions on frames and figures |
| `prose` | 16px, 17px from `sm`, line height 1.6 | Article body text |
| `small` | 15px, size only | Capability lists, meta rows, notes under a heading |
| `caption` | 13px, size only | Field hints, errors, and range labels |

- Headings carry no color of their own. They inherit ink from the body and white inside the blue card.
- Headings use sentence case and `text-balance`.
- Use tabular numbers for values that change, such as the revenue calculator totals.

## Layout

The spacing base is 4px through Tailwind spacing utilities.

- `container` in `lib/site.ts` gives a 1280px content width with 80px gutters at 1440, 40px on tablets, and 16px on phones. `gutter` is the same padding without the max width.
- `sectionPad` is 80px top and bottom on desktop, 64px on phones.
- Use `components/ui/Sheet.tsx` for a white or fog section. It already applies `container` and `sectionPad`. Pass `bleed` when the content must run edge to edge, such as the SafeSock scroll stage.
- Wide layouts use a four-column grid with 40px gaps. The feature tour puts its menu in column one, the demo in columns two and three, and the text in column four. `SectionHeading align="split"` uses the same grid.
- Never crop a product video to fit a frame. Fit the frame to the video.
- The header must fit one row at 320px wide. Below `lg` the navigation links live in the menu.

## Shapes

- Buttons and fields use 4px corners. Do not use pill-shaped buttons.
- Large frames, image cards, and the dark card use 24px (`rounded-3xl`).
- Feature demo frames use 16px (`rounded-2xl`, `GradientFrame size="md"`).
- Sheets use 40px on tablets and up, 24px on phones. The CTA sheet is square.
- Media inside a frame uses 12px (`rounded-xl`).
- Below `sm` the home hero frame matches vitalize.care's phone frame: 342px wide (24px side margins), 12px corners, 24px padding, a 1px `edge` border and `bg-frame-glow`. Its video fills the frame with 10px corners and no shadow.

## Elevation

The site is flat. Tone changes and rules separate content.

- Do not add a shadow to a card, a field, or a button.
- A product visual inside a `GradientFrame` may use `shadow-preview` so it lifts off the gradient.
- Overlays such as the phone menu keep the HeroUI overlay shadow so they read as floating.

## Components

Page chrome is rendered by `app/layout.tsx`: `AnnouncementBar`, `Header`, then the page, then `CtaSheet` and `Footer`. Pages don't render their own call to action.

- **Announcement bar.** `components/AnnouncementBar.tsx` reads the single `announcement` entry in `lib/site.ts`. Set it to `null` to hide the bar.
- **Header.** Logo left, `navigation` centered, a secondary Contact button and a primary Book a demo button on the right. Below `lg`, the links move into the HeroUI Popover menu.
- **CTA sheet.** `components/ui/CtaSheet.tsx`. A full-bleed, square-cornered graphite section with a centered white H2, a short lead, and one white `light` Book a demo button. It takes no props: the heading and lead come from `demo` in `lib/site.ts`, so every page closes on the same text.
- **Footer.** Solid `graphite` under the `CtaSheet`, split from it by a faint hairline. Copyright on the left, then the two untitled `footerColumns` from `lib/site.ts` (site pages, then Contact and LinkedIn). Edge-to-edge padding like the header.
- **Section primitives.** `components/ui/` holds `Eyebrow`, `SectionHeading`, `Sheet`, `GradientFrame`, `DarkCard`, `FeatureTour`, `NumberedRows`, `IndexNumber`, `InDevelopment`, and `BackLink`. Build page sections from these before you write new layout.
- **Numbered rows.** `NumberedRows` is the ruled three-column list with a mono index, an H3, and a short body. `IndexNumber` is that blue mono `01` on its own, with `onDark` for the blue card.
- **Status chip.** `InDevelopment` is the one marker for anything not built yet. Use it instead of writing "In development:" into copy.
- **Back link.** `BackLink` is the small mono link above a page title that returns to its parent, such as Resources.
- **Feature tour.** `FeatureTour` is the sticky feature menu. It takes a list of features, each with a `demo` node. The feature crossing the middle of the viewport is active. Its menu item turns blue with a blue rule and carries `aria-current="location"`, and the other features dim to 30% on desktop. On phones the menu is a sticky row of chips.
- **Buttons.** A call to action that navigates is a link, so use `components/ButtonLink.tsx`, which carries the press ripple. Variants are `primary` (blue), `secondary` (fog), and `onDark`. Use the HeroUI `Button` for an action inside a form or a control.
- **Forms.** Use HeroUI `Form`, `TextField`, `Label`, `Description`, `Input`, `TextArea`, and `FieldError`. Labels sit above the field. Show a validation message under the field it belongs to. Show a pending state on the submit button while the request runs.
- **Disclosure.** Use HeroUI `Accordion` for stacked questions. Style it as a ruled list with `hair` rules and the `plus` icon that turns 45 degrees when open.
- **Overlays.** Use HeroUI overlay components so focus, Escape, and outside press behave correctly. Do not build a menu or dialog from a `div`.
- **Phone video cuts.** A desktop recording whose text is unreadable at phone width gets a phone cut, set as `phoneSrc` on the `ExpandableMedia` video and served below `sm` through a `<source media>`. The cut is the same recording at the same ratio, opening on the whole screen and zooming into the parts in use. `scripts/phone-hero-cut.mjs` renders the PT review cut with ffmpeg; rerun it when the recording changes.
- **Icons.** Use `components/Icon.tsx`. Add a glyph there in the same stroke style before you import an icon package.

## Motion

The user approved each animation below. Keep its timing, easing, and trigger. A change to any of them needs the user's request.

| Animation | Where | Owner |
| --- | --- | --- |
| Press ripple | Every `ButtonLink` | `components/ButtonLink.tsx`, `animate-rippling` |
| Scroll reveal and line reveal | Sections and rules | `components/Reveal.tsx`, `[data-reveal]` |
| Feature tour active state | Menu color and feature dimming | `components/ui/FeatureTour.tsx`, 300ms and 500ms opacity and color transitions |
| Media expand | Click a tile video or image | `components/ExpandableMedia.tsx`, React `ViewTransition` |
| Looping product videos | Tiles and frames | `components/ExpandableMedia.tsx` |
| Press scale | HeroUI buttons | HeroUI default |
| Logo marquee | Home, Awarded by. Under reduced motion it stops and stays one row the visitor swipes | `components/Marquee.tsx` |

Rules for new motion:

- Motion explains a state change, such as a panel that opens or a menu item that becomes active. Do not add motion as decoration.
- Use the HeroUI component's own animation before you write keyframes.
- Use `--ease-out-soft` for custom transitions, and keep them under 400ms for controls.
- Every animation stops or shortens under `prefers-reduced-motion: reduce`. Use `motion-reduce:transition-none` on custom transitions.
- HeroUI sets `view-transition-name: none` on the root. `app/globals.css` restores the default so the media expand transition keeps its cross-fade. Do not remove that rule.
- The line reveal mask takes its color from `--reveal-mask`. A fog `Sheet` sets it, so rules on fog reveal cleanly.

## Interaction

- Every interactive element shows a 2px focus outline with a 2px offset on keyboard focus. Use `focusRing` from `lib/site.ts`. On blue, use a white outline.
- Style HeroUI states with the React Aria data attributes, such as `data-hovered`, `data-pressed`, `data-focus-visible`, `data-disabled`, and `data-invalid`.
- Navigation links are slate and turn ink on hover. The current page is ink and carries `aria-current="page"`.
- Disabled controls use the HeroUI default opacity of 0.5.
- Touch targets are at least 36px tall. Icon-only buttons have an accessible name.

## Do

- Read the component page in `.heroui-docs/react/` before you use a HeroUI component.
- Start a section from `components/ui/` and the `type` table.
- Keep the first paint useful without JavaScript. Text, links, and the first feature in the tour render on the server.
- Add screenshots of every changed view to the pull request, before and after.

## Don't

- Don't hardcode a color, radius, shadow, or font size that a token or the `type` table already names.
- Don't use `gray-*` utilities.
- Don't put a second dark card or a second blue band on a page.
- Don't restyle a HeroUI component until it stops looking like the rest of the site. Change the theme variables in `app/globals.css` so every component follows.
- Don't install a component from another library when HeroUI has one. A VantaUI item is allowed only when HeroUI has no equivalent and the item follows this file.
- Don't state a compliance claim, a payout term, or a patient outcome that the page copy does not already make.

## Source of truth

- Landing theme variables, gradients, and animations: `app/globals.css`
- Type, spacing, button, navigation, footer, and announcement tables: `lib/site.ts`
- Section primitives: `components/ui/`
- HeroUI default variables: `node_modules/@heroui/styles/dist/themes/default/variables.css`
- HeroUI Tailwind token mappings: `node_modules/@heroui/styles/dist/themes/shared/theme.css`
- HeroUI component docs: `.heroui-docs/react/components/`
