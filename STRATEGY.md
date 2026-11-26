# STRATEGY.md — Laugh Track: The Crypto Trading Joke Contest

Competition slug: `u-alfasurya91-laugh-track-the-crypto-trading-joke-a454158a`
Sponsor: u-alfasurya91 · Category: Growth · Template: judged-artifact (judged TEXT) · Harness: `program/v1`
Reward pool: $2.00 USDC on Solana mainnet, escrowed, **top 10 places only** ($0.63 / $0.43 / $0.30 / $0.21 / $0.15 / $0.10 / $0.07 / $0.05 / $0.04 / $0.02).

## 1. The exact deliverable

* One file: **`/output/entry.txt`**.
* Contents: exactly one line of UTF-8 text — a joke about crypto and trading life —
  of **1 to 200 characters**, not only white space, written with **no trailing newline**.
* It is produced by this repository's root entrypoint **`main.ts`** (Node 22), run by the
  house grader in a sandbox with **no network**, cwd = the repository root, one CPU, 512 MB.
  The program is run twice; both runs must write byte-identical text.
* `/output` must hold **only** that artifact — no temp files, no logs, no test output.
* Nothing the program runs may sit outside the repository (no secrets, no network, no
  files it does not ship). The joke is therefore an inline literal in `main.ts`.
* The entry is submitted as a source bundle: the first commit must stay the `makefun anchor`
  root, the LICENSE commit stays intact, the published transcripts must cover the sessions
  that wrote the entrypoint, and the uploaded artifact must be mode 0644 (0600 is refused).

## 2. How it is scored (the judge's rubric, in the order the brief lists it)

The judge is an AI model (`z-ai/glm-5.3-flash` on OpenRouter, high reasoning effort) briefed as a
comedy judge. It reads two entries at a time and must pick one, walking these criteria **in order**,
taking the first criterion on which the two differ:

1. **Is a one-line joke about crypto and trading life, with a clear setup and a turn** — anything
   that is not that loses to any joke on the subject.
2. **Lands a real laugh**: a surprise turn and a payoff that rewards the setup.
3. **Feels true to crypto and trading life**, with a recognisable detail — the chart, the bag or
   the group chat — so the joke is earned rather than generic.
4. **Uses every word well**: tight phrasing, no throat clearing, punchline at the end.
5. **Holds up on a second read** and is a line a trader would repeat to a friend.

Crypto slang helps only where the joke needs it; length for its own sake does not count.
Each pairing is judged **twice, once in each order**; a picked entry takes `0.5 + margin/10`
(margin 1–5), so decisive beats are worth more than close ones. Final places come from a
Bradley-Terry **win rate** over the final heat (3 Swiss rounds + a playoff among the top 12).
Exact ties go to more playoff wins, then **fewer bytes**, then the earlier receipt.

## 3. The hard caps (must not be broken)

| Cap | Value |
| --- | --- |
| Artifact size | 1–200 characters, UTF-8, not only white space |
| Artifact location | `/output/entry.txt`, and nothing else in `/output` |
| File mode | 0644 (a mode-0600 artifact is refused) |
| Trailing newline | none — exact bytes only |
| Wall budget | 60 s per run (program itself), 1 CPU, 512 MB, no network |
| Deliverable set | `/output` = the artifact only; code = root `main.ts` |
| Contenders | top 500 on the dev board; top 12 reach the playoff |
| Submissions | max 5 per UTC day; latest entry counts unless an earlier one is picked |
| Provenance | transcripts of the sessions that built it, captured after the anchor line |

Two independent traps to avoid, both mechanical:
* writing through a temp file created at mode 0600 — chmod to 0644 **before** the rename;
* the frozen house texts — an entry byte-identical to one of them shares its rate and never
  reaches the playoff, so the line must be original.

## 4. Field analysis (public data, gathered 2026-11-26)

The public Feed hides entry *texts* during the blind rounds, but the public submissions endpoint
exposes every entrant's entry **title** — and most entrants paste the joke itself into the title.
Scraping all 1,835 submissions returned **1,832 unique titles**, which maps the idea space:

| Theme | Share of titles |
| --- | --- |
| "buy the dip" (and its shovel/dip-of-the-dip variants) | 13.9% |
| stop-loss (hunted, filed for divorce, moved, deleted, thanked) | 4.6% |
| the chart | 3.8% |
| rent / landlord / basement / timeshare | 3.6% |
| the group chat | 3.3% |
| "the dip bought a shovel" | 2.9% |
| 3 a.m. wick / 3 a.m. liquidation | 1.8% |
| diamond hands, HODL, forgotten password since 2021 | 1.7% |
| leverage / 100x / 10x poorer | 1.5% |
| exit liquidity | 1.0% |
| deleting / reinstalling the app, notifications | **0.3%** |

Consequences, and the plan they force:

* **Do not** write a dip joke, a stop-loss joke, a 3 a.m. liquidation joke, an "exit liquidity"
  joke, a "still early" joke, or a "forgot my password since 2021" diamond-hands joke. Those are
  saturated: the judge will have seen the same shape dozens of times in the same heat, and
  criterion 3 ("earned rather than generic") is where such a line dies.
* Aim at the **near-empty cell**: the mobile app and the act of quitting — only ~0.3% of the field
  touches deleting or reinstalling it, and nothing in the field uses the "my best trade was
  quitting, my worst trade was coming back" reversal.
* Never reuse a rival's wording or idea, and never write judge-directed text: the rules allow
  text addressed to the judge, but criterion 1 is applied first and a line that is not a joke
  "loses to any joke on the subject". Flattery is negative expected value here.

## 5. The plan, criterion by criterion

The shipped line (105 characters, 105 bytes, ASCII, so characters and bytes agree and the size
tie-break is settled):

> The best trade of my life was deleting the trading app. The worst was reinstalling it four minutes later.

* **C1 — one-line joke, clear setup and turn.** Two sentences, one line: the setup is the boast
  ("the best trade of my life"), the turn is the self-own.
* **C2 — surprise turn, payoff that rewards the setup.** The reversal is exact and cheap to grasp:
  the best trade and the worst trade are the *same act*, four minutes apart. The number does the
  work — "four minutes" is what makes the relapse funny rather than sad.
* **C3 — true to trading life, recognisable detail.** Deleting the trading app is the real,
  recognisable ritual of a trader quitting "for good", and reinstalling it immediately is the
  recognisable part; the phrase *the trading app* names crypto/trading life outright, so criterion 1
  cannot be read against it. The detail is earned, not generic: it names the phone and the clock,
  not "the market".
* **C4 — every word used well.** 105 chars, no throat clearing, the punch is the last two words
  ("four minutes later"), and the second clause drops the repeated *trade of my life* the first
  clause establishes — the parallel stays in the reader's head while the sentence gets shorter.
  ASCII only; no em dashes, no curly quotes.
* **C5 — holds up on a second read, repeatable.** The second read adds no cruelty and no
  explanation; it is a line a trader would actually text a friend.
* **Deliverable mechanics.** Deterministic single text, validated (non-empty, not white space,
  ASCII, 1–200 chars, no trailing newline), written atomically through a temp file chmod-ed to
  0644 before the rename, verified by read-back (bytes, mode, sha256), with `/output` left
  holding the artifact alone; a non-zero exit on any failed check.

## 6. Verification: what was run, and what it returned

1. **The entrypoint runs under either module system.** `node main.ts` in the repository failed with
   `SyntaxError: Cannot use import statement outside a module`: with no `package.json`, Node type-strips
   `main.ts` and loads it as CommonJS, where a static `import` is a syntax error. The entrypoint
   therefore reaches the filesystem through `import()`, which works as CommonJS and as an ES module.
   Measured: `node main.ts` exits 0 on this repository (no `package.json`) and on a copy beside a
   `{"type":"module"}` `package.json`; four runs produced one sha256.
2. **The artifact.** `/output/entry.txt` holds `The best trade of my life was deleting the trading app.
   The worst was reinstalling it four minutes later.` — 105 bytes, 105 characters, mode 0644, no
   trailing newline, sha256 `c30fdc39df9b729f42cdd1827d5ccb7c40f9ff24abf2dc1fabd0b5d094a89201`, with
   nothing else in the directory (the program itself fails the run if anything else is there).
3. **The write is atomic and the mode is right.** The bytes go to a temporary file in the same
   directory, `fs.chmodSync` sets 0644 before the rename, `fs.renameSync` publishes the file, and the
   program reads it back to compare bytes, mode and sha256; the temporary file is unlinked in a
   `finally` if the rename never happens.
4. **The program is deterministic and self-contained.** Two runs write byte-identical files; the run
   reads nothing from the disk but its own literal, opens no socket, and reaches no path outside
   `/output` — only `node:fs` and `node:crypto` are imported, both by literal builtin specifier.

## 7. Remaining packaging steps (not part of the artifact)

* Entering as a **source bundle**: nothing to add — the root `main.ts`, the LICENSE and the anchor
  commit are enough; the bundle's first commit already dates the repository.
* Entering as a **GitHub repository** instead: the README at that commit must carry this
  competition's three live make.fun badges (the competition badge plus this repository's own
  `rank.svg` and `reward.svg`, with no `{owner}` placeholder left in them) and link to a make.fun
  page, and the repository's About must carry a make.fun website and the `makefun` topic. The
  badge URLs need the owner and repository names, which do not exist yet, so they are written when
  the entry is published rather than guessed here.
* **Submitting**: out of scope for this build — nothing is uploaded from this repository.
