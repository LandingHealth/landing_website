# SafeSock

`/safesock` (title `SafeSock | Landing`) introduces the SafeSock sensor sleeve. Its h1 is "A closer look at loading between visits." It has an expandable product video, then "The limit is set in the clinic. The loading happens at home." and "How a PT would use it".

## Sub-features

- `safesock-video` shows a poster frame inside a black rounded frame.
- `safesock-expand` opens the video full-screen when the visitor chooses it, plays it, and closes on a second choice or on Escape.

## How to get to it (user POV)

- Choose `SafeSock` in the header or phone menu.
- Follow `Meet SafeSock` on the home page.
- Old links to `/devices` redirect here.

## Driving it with verify.mjs

Preconditions:

- `doctor: ready`.

- **Load proof.** Run `MSYS_NO_PATHCONV=1 node .claude/skills/verify-landing_website/scripts/verify.mjs --routes /safesock`.
- **Expand and close.** With a server held on `<port>`, run this.

  ```js
  await page.goto(base + "/safesock");
  await page.getByRole("button", { name: "Expand SafeSock video" }).click();
  await page.getByRole("button", { name: "Close SafeSock video" }).waitFor();
  await page.waitForTimeout(800);
  await page.screenshot({ path: "<evidence>/safesock-expanded.png" });
  const playing = await page.evaluate(() => !document.querySelector("video").paused);
  if (!playing) throw new Error("video did not start");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Expand SafeSock video" }).waitFor();
  ```

  The expanded shot shows the video filling the screen, and Escape restores the inline frame.

## Gotchas

- While the video is expanded, the page sets `overflow: hidden` on `<html>`. If close fails, the page stays unscrollable. Check that the page scrolls after you close the video.
- The expand uses a React `ViewTransition`. Headless chromium runs it, but wait about 800ms before the screenshot.
