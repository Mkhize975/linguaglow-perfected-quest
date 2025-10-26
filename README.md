# Linguaglow — Perfected Quest

Linguaglow is a lightweight, privacy-first web app that helps users:
- Paraphrase text into clearer, more natural phrasing
- Generate working Excel formulas (IF, INDEX/MATCH, nested logic, dynamic arrays) from natural-language requests
- Proofread and translate paraphrases and formula instructions

Built by Mkhize975 for practical, client-first workflow: fast iterations, on-device inference where possible, and an emphasis on clear outputs that non-experts can use immediately.

Live project URL (Lovable): https://lovable.dev/projects/29968afa-679a-4dce-91de-876e7fafa2eb  



Excellent — this is an important requirement for the **Google Chrome Built-in AI Challenge 2025** submission. Let’s finalize this correctly so your project looks **professional, complete, and fully compliant** with the rules.

Here’s exactly what you need for the **GitHub repository setup**, including your open-source license, documentation, and test instructions 👇

---

## ✅ 1. Repository Essentials

Your public GitHub repository should contain:



```text
MIT License

Copyright (c) 2025 Mkhize975

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```


---

### 🧪 How Judges Can Test the Application

To help the judges test LinguaGlow quickly:

#### 1️⃣ **Clone the repository**

```bash
git clone https://github.com/Mkhize975/linguaglow-perfected-quest.git
cd linguaglow-perfected-quest
```

#### 2️⃣ **Install dependencies**

If using Node:

```bash
npm install
```

If using Python backend:

```bash
pip install -r backend/requirements.txt
```

#### 3️⃣ **Run the app**

```bash
npm run dev
```

Then open the URL shown in your terminal (usually `http://localhost:5173`).

#### 4️⃣ **Test these examples**

* Paraphrasing:
  Input → “The meeting was postponed due to bad weather.”
  Output → “The meeting was delayed because of poor weather conditions.”

* Excel Formula Generation:
  Input → “Show me total sales where quantity > 50.”
  Output → `=SUMIF(B2:B100, ">50", C2:C100)`

* Proofreader Demo:
  Input → “He go to school every day.”
  Output → “He goes to school every day.”

#### 5️⃣ **Offline & Privacy Test**

* Try paraphrasing text while disconnected from the internet — LinguaGlow still works thanks to Chrome’s built-in on-device AI.
* Verify that no external API calls are made (privacy-first processing).

---

## ✅ 4. Add Repository Metadata (for hackathon judges)

In your GitHub repo, click **Settings → General → Description** and add:

```
LinguaGlow — AI-powered Chrome web app for paraphrasing, rewriting, and Excel formula generation using Chrome Built-in AI APIs (Gemini Nano).
```

Then add:

* ✅ Topics: `chrome-ai`, `gemini-nano`, `built-in-ai`, `paraphrasing`, `excel-formula-generator`, `ai-extension`, `hackathon2025`
* ✅ Public visibility
* ✅ Pin a demo screenshot (from `/demo/demo-video.mp4` or `demo/screenshot.png`)

---

## ✅ 5. Optional (but highly recommended)

### 🎥 Add a Demo Video

Record a short **2–3 minute demo video** showing:

* App launch
* Paraphrasing example
* Excel formula generation
* Quick voice tutor clip (if included)
  Upload it to `/demo/demo-video.mp4` or host it unlisted on YouTube and link it in the README.

### 🏷️ Example Section to Add in README:


### 🎥 Demo Video
Watch a 3-minute demo here:
[▶️ Watch on YouTube]([https://youtu.be/YOUR_VIDEO_LINK](https://youtube.com/shorts/nr_be3iY_wo?si=Z14dyiax6oVU7tx9)
```
