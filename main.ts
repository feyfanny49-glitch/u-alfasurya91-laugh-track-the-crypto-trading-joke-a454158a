/**
 * Laugh Track: The Crypto Trading Joke Contest
 * Competition: u-alfasurya91-laugh-track-the-crypto-trading-joke-a454158a
 * Harness: program/v1, runtime node22 — the standard library only, no network, one CPU.
 *
 * The deliverable is one line of UTF-8 text at /output/entry.txt: the gate asks for 1 to 200
 * characters, not only white space; the house judge then reads it against a rival entry, two at a
 * time. Everything the run needs is in this file — nothing is read from the disk but this.
 *
 * Node loads a .ts file as CommonJS unless a package.json sets "type": "module", and a static
 * `import` statement is a syntax error there; import() carries both module systems, so the
 * filesystem is reached through it. Both specifiers are literal builtins, never a value read from
 * the environment: the program runs nothing but the code shipped here.
 *
 * Locally (outside the grader's container), MAKEFUN_OUTPUT_DIR stands in for /output:
 *   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
 */

/** The entry: one line, ASCII so that its characters and its bytes are the same count (the size tie-break). */
const ENTRY =
  "The best trade of my life was deleting the trading app. The worst was reinstalling it four minutes later.";

/** The artifact's name in the output directory, exactly as the competition's kit names it. */
const ENTRY_NAME = "entry.txt";

/** The gate's caps (competition.yaml: 1 to 200 characters, not only white space). */
const MIN_CHARS = 1;
const MAX_CHARS = 200;

/** The mode the grader reads the artifact with; a 0600 file is refused. */
const FILE_MODE = 0o644;

async function main(): Promise<number> {
  const [fs, crypto] = await Promise.all([import("node:fs"), import("node:crypto")]);

  // The output directory: the grader's /output (the process driver names it MAKEFUN_OUTPUT_DIR,
  // a container mounts it at /output), never a path this file invents.
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outputPath = `${outputDir}/${ENTRY_NAME}`;

  const bytes = Buffer.from(ENTRY, "utf8");
  const chars = Array.from(ENTRY).length; // code points, as the gate counts them

  // The gate, checked locally before anything is written, so a broken literal is loud rather than silent.
  const problems: string[] = [];
  if (chars < MIN_CHARS) problems.push(`the entry is empty (${chars} characters)`);
  if (chars > MAX_CHARS) problems.push(`the entry is ${chars} characters, over the gate's ${MAX_CHARS}`);
  if (!/\S/.test(ENTRY)) problems.push("the entry is only white space");
  if (/[\r\n]/.test(ENTRY)) problems.push("the entry holds a line break, not one line");
  if (bytes.length !== ENTRY.length) {
    problems.push(`the entry is not ASCII (${bytes.length} bytes for ${ENTRY.length} code units), so bytes and characters differ`);
  }

  // Written through a temporary file in the same directory (a rename within one file system is atomic),
  // chmod-ed to the mode the grader requires BEFORE the rename, and removed if anything goes wrong.
  const tempPath = `${outputDir}/.${ENTRY_NAME}.${process.pid}.tmp`;
  let wrote = false;
  try {
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(tempPath, bytes, { mode: FILE_MODE });
    fs.chmodSync(tempPath, FILE_MODE); // the process umask cannot lower this
    fs.renameSync(tempPath, outputPath);
    wrote = true;
  } finally {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }

  // Read back what the grader will read: the same bytes, the mode it requires, and nothing beside it.
  const back = fs.readFileSync(outputPath);
  const mode = fs.statSync(outputPath).mode & 0o777;
  const sha256 = crypto.createHash("sha256").update(back).digest("hex");
  const others = fs.readdirSync(outputDir).filter((name) => name !== ENTRY_NAME);

  if (!back.equals(bytes)) problems.push("the file read back differs from the entry's bytes");
  if (mode !== FILE_MODE) problems.push(`the file's mode is 0${mode.toString(8)}, not 0${FILE_MODE.toString(8)}`);
  if (others.length > 0) problems.push(`the output directory holds more than the artifact: ${others.join(", ")}`);

  process.stdout.write(
    `${wrote ? "wrote" : "failed to write"} ${outputPath}: ${back.length} bytes, ${chars} characters, ` +
      `mode 0${mode.toString(8)}, sha256 ${sha256}\n${ENTRY}\n`,
  );
  for (const problem of problems) process.stderr.write(`entry: ${problem}\n`);
  return problems.length === 0 ? 0 : 1;
}

main().then(
  (code) => {
    process.exitCode = code;
  },
  (error: unknown) => {
    process.stderr.write(`entry: the run failed: ${error instanceof Error ? (error.stack ?? error.message) : String(error)}\n`);
    process.exitCode = 1;
  },
);
