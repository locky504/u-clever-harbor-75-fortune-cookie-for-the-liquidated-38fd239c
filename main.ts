import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One fortune cookie line for a crypto trader who has just been liquidated.
// Classic cookie voice (lucky numbers), with the punchline landing on the loss:
// the portfolio is at zero, so zero is the only lucky number it has left.
const FORTUNE =
  "Your lucky numbers are 0, 0, 0, 0, and 0. Your liquidated portfolio chose them.";

const wordCount = FORTUNE.trim().split(/\s+/).length;

// Gate validation: the entry must be one line, 1-160 characters, at most
// 20 words of plain text, or the scorer rejects it before judging.
if (!FORTUNE.trim()) throw new Error("fortune must not be empty");
if (FORTUNE.includes("\n")) throw new Error("fortune must be a single line");
if (FORTUNE.length < 1 || FORTUNE.length > 160) {
  throw new Error(`fortune must be 1-160 characters, got ${FORTUNE.length}`);
}
if (wordCount > 20) {
  throw new Error(`fortune must be at most 20 words, got ${wordCount}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), FORTUNE + "\n", "utf8");
console.log(FORTUNE);
console.log(`(${wordCount} words, ${FORTUNE.length} characters)`);
