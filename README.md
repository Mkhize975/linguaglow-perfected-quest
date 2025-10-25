# Linguaglow — Perfected Quest

Linguaglow is a lightweight, privacy-first web app that helps users:
- Paraphrase text into clearer, more natural phrasing
- Generate working Excel formulas (IF, INDEX/MATCH, nested logic, dynamic arrays) from natural-language requests
- Proofread and translate paraphrases and formula instructions

Built by Mkhize975 for practical, client-first workflow: fast iterations, on-device inference where possible, and an emphasis on clear outputs that non-experts can use immediately.

Live project URL (Lovable): https://lovable.dev/projects/29968afa-679a-4dce-91de-876e7fafa2eb  


Table of contents
- Features
- Quickstart (run locally)
- Usage and examples
- How it uses Chrome Built-in AI APIs
- Architecture & tech stack
- Privacy & offline behavior
- Testing & developer notes
- Deployment

Features
- Paraphrasing: Rewrites user-provided text for clarity, tone, or concision.
- Excel formula generation: Convert natural-language descriptions or examples into Excel formulas (supports nested IFs, INDEX/MATCH, XLOOKUP, dynamic arrays where available).
- Proofreading: Grammar and clarity checks for both paraphrased text and formula instructions.
- Multilingual support: Translate inputs/outputs across common languages.
- Local-first & hybrid options: Designed to run inference client-side (Gemini Nano / local Web AI) with optional server/hybrid fallbacks for heavier tasks.

Quickstart — run locally
1. Clone
   git clone https://github.com/Mkhize975/linguaglow-perfected-quest.git
   cd linguaglow-perfected-quest

2. Node via nvm
   nvm install --lts
   nvm use --lts

3. Install
   npm install

4. Start dev server
   npm run dev
   Open the URL printed by the dev server (typically http://localhost:5173).

5. Build for production
   npm run build
   npm run preview   # if available to preview a production build locally

Usage — UX flows & examples
- Paraphrase flow
  1. Paste or type source text.
  2. Pick tone (formal, casual, concise) and language.
  3. Click Paraphrase → get 1–3 variants. Use Proofread to check grammar.

  Example input:
  "We need to find customers with more than three purchases and flag them for a VIP campaign."
  Example paraphrase:
  "Identify customers who have made more than three purchases and mark them as VIP candidates."

- Excel formula generation flow
  1. Provide a plain-English requirement or a few example rows.
  2. Choose target spreadsheet platform (Excel, Google Sheets).
  3. Click Generate → app returns a formula and a short explanation.

  Example 1 (simple):
  Natural language: "Return 'Yes' if Sales > 1000, otherwise 'No'."
  Generated Excel formula:
  =IF(B2>1000,"Yes","No")

  Example 2 (lookup):
  Natural language: "Find the price for product ID in A2 from a table with IDs in D and prices in E."
  Generated Excel formula (INDEX/MATCH):
  =INDEX($E$2:$E$100, MATCH(A2, $D$2:$D$100, 0))

  Example 3 (dynamic array — Excel 365 / Google Sheets):
  Natural language: "List unique customers from column B who have purchases > 100."
  Generated formula (Excel 365):
  =UNIQUE(FILTER(B2:B100, C2:C100>100))

- Proofreading & translator usage
  - Submit paraphrased text to the Proofreader API for grammar fixes and clarity suggestions.
  - Translate outputs with the Translator API for multilingual needs.

How Linguaglow uses Chrome Built-in AI (2025)
This project is intentionally compatible with Chrome’s Built-in AI tooling (Gemini Nano and related Browser APIs) and uses a client-first strategy:
- Prompt API: Build structured prompts for paraphrase and formula generation. Supports multimodal inputs where available.
- Proofreader API: Grammar and clarity corrections for paraphrases and formula descriptions.
- Summarizer API: Distill long descriptions into concise derivation steps used to synthesize formulas.
- Writer / Rewriter API: Produce alternate phrasings and multiple formula variants for review.
- Translator API: Translate inputs or outputs as needed.
- Gemini Nano (optional): Client-side inference for low-latency paraphrasing and formula generation on capable devices.

Hybrid/server options
- For heavy workloads or mobile compatibility, you can optionally use a server-side fallback (e.g., Gemini Developer API or Firebase AI Logic). The UI supports plugging in server keys—but defaults to client-side inference wherever possible.

Architecture & tech stack
- Frontend: Vite + React + TypeScript
- UI: shadcn-ui + Tailwind CSS
- Language composition in this repo: TypeScript (~96%), PLpgSQL, CSS, and small other files
- Client-side inference integrations for low latency and privacy-first behavior

Privacy, security & offline behavior
- Default behavior: run inference client-side so user data stays on device.
- Offline support: Basic paraphrasing and simple formula synthesis can work offline on devices that support Gemini Nano or an equivalent on-device engine.
- Hybrid mode (optional): If you enable server APIs, avoid sending personally-identifying or sensitive data unless explicitly required and consented to by your users.
- If adding third-party dependencies that affect runtime, run `npm audit` and test before merging.

Developer notes & preferences
- Node: Use the latest LTS (Node 18+). Use nvm for environment management.
- Install: npm install
- Dev: npm run dev
- Build: npm run build
- Preview: npm run preview
- Tests: Add tests for formula generation logic and paraphrase correctness when changing core prompts or parsers.

Configuration & environment variables
- Many features run client-side with no env variables required.
- Optional server/hybrid integrations may require API keys:
  - GEMINI_DEV_API_KEY (if you add server-side Gemini)
  - FIREBASE_* (if enabling Firebase AI Logic)
  - Place config in a .env file (do not commit keys)

Deployment
- Lovable: Open the project in Lovable and click Share → Publish for a single-click deploy.
- Static hosts: Build with `npm run build` and deploy the `dist` folder to Netlify, Vercel, GitHub Pages, or any static host.
- If deploying a hybrid backend, ensure server endpoints are hosted on secure infrastructure and keys are kept secret.

Hackathon / submission guidance (Chrome Built-in AI Challenge 2025)
If you plan to submit this project:
- Short summary: What the app does (paraphrase + Excel formula generation) and who benefits
- Technical details: Which Chrome Built-in AI APIs were used and how (Prompt API, Proofreader, Summarizer, Writer, Rewriter, Translator, Gemini Nano)
- Demo instructions: How to run locally and sample inputs → outputs
- New/original confirmation: Statement that this is a new 2025 project (not a re-use of a 2024 submission)
- Links: Repo URL and deployed demo URL, design docs or notes
- Include a short screencast/GIF showing paraphrase → formula flow

Contributing
- Found a bug or want to add a small improvement? Open an issue or submit a PR.
- Mention @Mkhize975 in PRs or issues for a faster review.
- Prefer small, focused PRs with clear commit messages and tests where applicable.

Testing ideas
- Unit tests for the parser that converts examples + natural language into prompt templates
- End-to-end tests for UI flows (paraphrase, generate formula, apply proofreader)
- Golden-file tests for example formula outputs to detect regressions in prompt changes

Known limitations & future work
- Formula generation is as good as the prompt templates and on-device model capabilities—always validate generated formulas before using on production spreadsheets.
- UX improvements: interactive example-to-formula mapping, step-by-step formula derivations, more formula variants.
- Expand support for more spreadsheet functions and regional function name variants.


Contact
Author: @Mkhize975  


Thanks for checking out Linguaglow — small, practical, and focused on making paraphrasing and spreadsheet logic fast and accessible.
