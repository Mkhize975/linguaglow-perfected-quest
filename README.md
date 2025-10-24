# Linguaglow — Perfected Quest

Hi — I'm Mkhize975. This repo contains my app that paraphrases information and generates Excel formulas using on-device AI. I like things simple, practical, and focused on building features fast. Below is what the project is, how it uses client-side Web AI (including the Chrome Built-in AI APIs), how to run it locally, and what you'll need if you're submitting this as an entry to the Google Chrome Built-in AI Challenge 2025.

## Project info

Project URL: https://lovable.dev/projects/29968afa-679a-4dce-91de-876e7fafa2eb  
Repository: https://github.com/Mkhize975/linguaglow-perfected-quest

What the app does
- Paraphrases user-provided text into clearer or alternate phrasings.
- Generates Excel formulas (e.g., nested IFs, INDEX/MATCH, dynamic array formulas) from natural-language requests or structured examples.
- Offers proofreading and multilingual support for paraphrased outputs and formula instructions.

Why this matters
- Saves time turning messy notes into usable spreadsheet logic.
- Helps non-experts produce correct Excel formulas from plain English.
- Works client-side for privacy, speed, and offline resiliency.

## Chrome Built-in AI Challenge 2025 — How this app uses the APIs

This project is built around client-side Web AI and is designed to be compatible with Chrome’s Built-in AI (Gemini Nano and related APIs). The core idea: do as much inference on-device as possible for privacy and responsiveness, while allowing optional hybrid server usage for heavier tasks or mobile reach.

APIs used in the project (examples of what I integrate):
- Prompt API — generate structured prompts for paraphrasing and for formula synthesis; accept multimodal inputs if available.
- Proofreader API — grammar and clarity corrections for paraphrased text and formula instructions.
- Summarizer API — distill long descriptions into concise steps used to derive formulas.
- Writer API / Rewriter API — produce alternate phrasings, interface copy, or multiple formula variants.
- Translator API — translate user input or outputs to/from multiple languages.
- (Optional) Gemini Nano — run inference client-side for low-latency paraphrasing and formula generation.

Design benefits:
- Client-side inference for privacy and offline operation.
- Low latency and cost-efficiency (no server inference required for many flows).
- Hybrid option: integrate Firebase AI Logic or Gemini Developer API for heavier server-side tasks or mobile compatibility.

Note: I ensure this is a new project and concept for the 2025 hackathon — it’s not reusing any 2024 submission.

## TL;DR — Get running locally

1. Clone the repo
```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Use nvm and install dependencies
```sh
nvm install --lts
nvm use --lts
npm install
```

3. Start the dev server
```sh
npm run dev
```
Open the address printed by the dev server (usually http://localhost:5173).

## How I edit this project

- Lovable: Open the project link and edit inside Lovable — changes sync back to this repo automatically.
- Local IDE: Clone, edit, commit, and push. I keep small commits with clear messages.
- GitHub web: Quick edits via the pencil icon.
- Codespaces: Use Code → Codespaces → New codespace if I need a ready remote dev environment.

## Developer notes (my preferences)

- Node: Use the latest LTS (Node 18+). Use nvm.
- Install: npm install
- Start (dev): npm run dev
- Build: npm run build
- Preview production build locally: npm run preview (if available)
- Tests: add tests for formula generation logic and paraphrase correctness if you change the core model prompts.

If you add dependencies that affect the build or runtime, run a quick security audit and test before merging.

## Tech stack

- Vite
- TypeScript (majority of the code)
- React
- shadcn-ui
- Tailwind CSS

Language composition: mostly TypeScript.

## Deploying

I usually publish from Lovable: open the project and click Share → Publish. Alternatively, build locally and deploy the `dist` folder to any static host that supports Vite builds.

## Custom domain

In Lovable: Project → Settings → Domains → Connect Domain. Docs: https://docs.lovable.dev/features/custom-domain#custom-domain

## Google Chrome Built-in AI Challenge 2025 — Submission guidance

If you're submitting this project (or a fork) to the challenge, include the following in your submission package and text description:

1. Short summary (1–2 paragraphs):
   - What the app does (paraphrasing + Excel formula generation).
   - The problem it solves and who benefits.

2. Technical details:
   - Which Chrome Built-in AI APIs were used (Prompt API, Proofreader, Summarizer, Writer, Rewriter, Translator, Gemini Nano).
   - How APIs are used client-side for privacy and offline support.
   - Any hybrid or server components (e.g., Firebase AI Logic or Gemini Developer API) and why they are optional.

3. Demo instructions:
   - How to run locally (TL;DR above).
   - Example inputs and expected outputs (sample text and the formula the app generates).
   - Short screencast or GIF showing paraphrase → formula flow (strongly recommended).

4. New/original confirmation:
   - Statement that the project is new for 2025 and not a re-use of a 2024 project or concept.

5. Links:
   - Repo URL and deployed demo URL (Lovable publish link or static host).
   - Any design docs or additional notes.

Hackathon checklist (what I include when submitting)
- [ ] Working web app or Chrome Extension that demonstrates the APIs
- [ ] Text description with features, APIs used, and problem statement
- [ ] Demo video or GIF
- [ ] Deployment URL (Lovable published link or other host)
- [ ] Confirmation this is a new 2025 project

## Contributing / Contact

Want to contribute? Open an issue or a pull request. Mention @Mkhize975 in the PR or issue for a quicker review. I merge small incremental improvements, tests, and documentation patches.

---

Small, practical, and focused on getting things working — this README explains how the app uses Chrome Built-in AI APIs for paraphrasing and Excel formula generation, how to run it, and what to include for a Google Chrome Built-in AI Challenge 2025 submission.
