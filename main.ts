// One Letter: Coffee or Tea — entry program.
//
// The gate is strict: /output/entry.txt must hold exactly one character,
// "A" for coffee or "B" for tea, and nothing else — no word, no
// explanation, no punctuation, not even a trailing newline.
//
// The choice below is made the way a tasting judge would make it, scored
// on the judge's own brief (vivid, funny, true), then frozen as a
// constant so the program is fully deterministic: same input, same
// single byte, every run.
//
// Why coffee wins the tasting, on the judge's three counts:
//  - Vivid: coffee arrives as a smell before it arrives as a drink —
//    dark roast on cold air, the first hot sip that wakes the whole
//    face up. Tea is gentle; coffee is an event.
//  - Funny: coffee is the drink with a personality disorder —
//    "don't talk to me before my coffee" is a joke everyone has
//    told about themselves, because it is true.
//  - True: the honest morning answer. Nobody has ever stared into
//    a mug of tea at 6 a.m. and felt saved. Coffee is the drink
//    people reach for when the day actually starts.
//
// The word behind the letter is "caffeinated" — coffee is the
// caffeinated answer, and the letter A carries it. The word stays in
// the README only; the entry file itself holds just the letter.

import { mkdirSync, writeFileSync } from "node:fs";

// The two legal letters, and the scores that pick between them.
const CANDIDATES = [
  { letter: "A", drink: "coffee", vivid: 9, funny: 8, true: 10 },
  { letter: "B", drink: "tea", vivid: 6, funny: 5, true: 7 },
] as const;

function pickLetter(): string {
  // Score each drink on the judge's brief, most important first:
  // vivid, then funny, then true. Highest total wins; ties break
  // toward the earlier entry in the list.
  let best = CANDIDATES[0];
  let bestScore = best.vivid + best.funny + best.true;
  for (const candidate of CANDIDATES.slice(1)) {
    const score = candidate.vivid + candidate.funny + candidate.true;
    if (score > bestScore) {
      best = candidate;
      bestScore = score;
    }
  }
  return best.letter;
}

function main(): void {
  const letter = pickLetter();
  if (!/^[AB]$/.test(letter)) {
    throw new Error(`picked letter ${JSON.stringify(letter)} is not A or B`);
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", letter, "utf8");
  console.log(`Wrote ${JSON.stringify(letter)} (coffee) to /output/entry.txt`);
}

main();
