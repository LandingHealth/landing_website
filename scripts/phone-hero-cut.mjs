// Renders the phone hero cut of the PT review recording: it opens on the whole screen, zooms into the patient
// video and flag timeline, moves to the comment panel while the PT types, and zooms back out before it loops.
// Run from the repo root: node scripts/phone-hero-cut.mjs  (needs ffmpeg on PATH)
import { execFileSync } from "node:child_process";

const source = "public/workspace/exercise-review-app.mp4";
const output = "public/workspace/exercise-review-app-phone.mp4";

// Source pixels: the recording is 1482x994 at 30fps.
const sourceWidth = 1482;
const sourceHeight = 994;
const fps = 30;
const out = { width: 1080, height: 724 };
const upscale = 2;

// Each view is the source region to show, given by its left, top and width; the height follows the output ratio.
const views = {
  full: { x: 0, y: 0, w: sourceWidth },
  review: { x: 0, y: 118, w: 1110 },
  comment: { x: 902, y: 128, w: 578 },
};

// [seconds, view]: hold a view between equal views, ease between different ones.
const keys = [
  [0, "full"],
  [1.2, "full"],
  [2.6, "review"],
  [10.6, "review"],
  [12.2, "comment"],
  [18.8, "comment"],
  [20.3, "full"],
  [20.7, "full"],
];

const fixed = (value) => value.toFixed(4);

function segmentExpression(pick) {
  // zoompan evaluates `in` as the input frame number. Cosine easing keeps every move smooth at both ends.
  let expression = fixed(pick(views[keys.at(-1)[1]]));
  for (let index = keys.length - 2; index >= 0; index--) {
    const [t0, from] = keys[index];
    const [t1, to] = keys[index + 1];
    const f0 = t0 * fps;
    const f1 = t1 * fps;
    const a = pick(views[from]);
    const b = pick(views[to]);
    const eased = `(1-cos(PI*(in-${f0})/${f1 - f0}))/2`;
    const value = a === b ? fixed(a) : `(${fixed(a)}+(${fixed(b - a)})*${eased})`;
    expression = `if(lt(in,${f1}),${value},${expression})`;
  }
  return expression;
}

const width = segmentExpression((view) => view.w * upscale);
const zoom = `${sourceWidth * upscale}/(${width})`;
const x = segmentExpression((view) => view.x * upscale);
const y = segmentExpression((view) => view.y * upscale);

const filter = [
  `scale=${sourceWidth * upscale}:${sourceHeight * upscale}:flags=lanczos`,
  `zoompan=z='${zoom}':x='${x}':y='${y}':d=1:s=${out.width}x${out.height}:fps=${fps}`,
  "format=yuv420p",
].join(",");

execFileSync(
  "ffmpeg",
  ["-v", "error", "-y", "-i", source, "-vf", filter, "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "26", "-profile:v", "high", "-movflags", "+faststart", output],
  { stdio: "inherit" },
);
console.log(`wrote ${output}`);
