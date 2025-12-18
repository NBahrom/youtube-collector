# YouTube Channel Data Collector with AI Transcripts

This project collects structured data from YouTube channels using official APIs and generates video transcripts using free AI speech to text.

The system is designed to be stable, scalable, and compliant.

---

## Features

* Collects all public videos from a YouTube channel
* Extracts
  * Video URL
  * Title
  * Thumbnail
  * View count
  * Publish date
* Generates transcripts using AI speech to text
* Works even when YouTube captions are disabled
* Supports large channels
* Outputs data to CSV
* Built with Node.js

---

## Important Note About Transcripts

Transcripts are generated using AI from the video audio.

Advantages:

* Works for all videos
* Does not depend on YouTube captions
* Completely free
* High accuracy

Disadvantage:

* Transcription takes time
* Processing speed depends on video length and computer performance

This is expected behavior.

---

## System Requirements

### Required Software

You must install all of the following:

* Node.js 18 or newer
* Python 3.11 (important, do not use Python 3.12)
* FFmpeg
* yt-dlp

---

## Step 1: Install Node.js

Download and install from

[https://nodejs.org](https://nodejs.org)

Verify:

<pre class="overflow-visible! px-0!" data-start="1446" data-end="1486"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>node --version
npm --version
</span></span></code></div></div></pre>

---

## Step 2: Install Python 3.11 (Required)

Do not use Python 3.12. Whisper does not work correctly on Windows with Python 3.12.

Download Python 3.11 from

[https://www.python.org/downloads/release/python-3119/](https://www.python.org/downloads/release/python-3119/)

During installation:

* Check Add Python to PATH
* Select Install for all users

Verify:

<pre class="overflow-visible! px-0!" data-start="1793" data-end="1821"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>python --version
</span></span></code></div></div></pre>

Expected:

<pre class="overflow-visible! px-0!" data-start="1833" data-end="1858"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-text"><span><span>Python 3.11.x
</span></span></code></div></div></pre>

---

## Step 3: Install Whisper (AI Speech to Text)

Upgrade pip first:

<pre class="overflow-visible! px-0!" data-start="1932" data-end="1979"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>python -m pip install --upgrade pip
</span></span></code></div></div></pre>

Install Whisper:

<pre class="overflow-visible! px-0!" data-start="1998" data-end="2046"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>python -m pip install openai-whisper
</span></span></code></div></div></pre>

Verify:

<pre class="overflow-visible! px-0!" data-start="2056" data-end="2092"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>python -m whisper --</span><span>help</span><span>
</span></span></code></div></div></pre>

If help text appears, Whisper is installed correctly.

---

## Step 4: Install FFmpeg

Download from

[https://www.gyan.dev/ffmpeg/builds/](https://www.gyan.dev/ffmpeg/builds/)

Download:

<pre class="overflow-visible! px-0!" data-start="2244" data-end="2281"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>ffmpeg-release-essentials.zip
</span></span></code></div></div></pre>

Extract the folder and move it to:

<pre class="overflow-visible! px-0!" data-start="2318" data-end="2335"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>C:\ffmpeg</span><span>
</span></span></code></div></div></pre>

Make sure this file exists:

<pre class="overflow-visible! px-0!" data-start="2365" data-end="2397"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>C:\ffmpeg\bin\ffmpeg.exe</span><span>
</span></span></code></div></div></pre>

Add to PATH:

<pre class="overflow-visible! px-0!" data-start="2412" data-end="2433"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>C:\ffmpeg\bin</span><span>
</span></span></code></div></div></pre>

Restart terminal.

Verify:

<pre class="overflow-visible! px-0!" data-start="2462" data-end="2489"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>ffmpeg -version
</span></span></code></div></div></pre>

---

## Step 5: Install yt-dlp

Download yt-dlp.exe from

[https://github.com/yt-dlp/yt-dlp/releases/latest]()

Move it to:

<pre class="overflow-visible! px-0!" data-start="2612" data-end="2629"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>C:\yt-dlp</span><span>
</span></span></code></div></div></pre>

Add to PATH:

<pre class="overflow-visible! px-0!" data-start="2644" data-end="2661"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>C:\yt-dlp</span><span>
</span></span></code></div></div></pre>

Restart terminal.

Verify:

<pre class="overflow-visible! px-0!" data-start="2690" data-end="2718"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>yt-dlp --version
</span></span></code></div></div></pre>

---

## Step 6: Install Project Dependencies

Clone the repository:

<pre class="overflow-visible! px-0!" data-start="2788" data-end="2856"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>git </span><span>clone</span><span> YOUR_GITHUB_REPO_URL
</span><span>cd</span><span> youtube-data-extracter
</span></span></code></div></div></pre>

Install Node.js dependencies:

<pre class="overflow-visible! px-0!" data-start="2888" data-end="2911"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>npm install
</span></span></code></div></div></pre>

---

## Step 7: YouTube API Setup

1. Create a project in Google Cloud Console
2. Enable YouTube Data API v3
3. Create OAuth credentials
4. Download credentials.json
5. Place credentials.json in the project root
6. Run the app once and complete OAuth login
7. token.json will be created automatically

## YouTube API Authorization (Required)

This project uses the official YouTube Data API.

Authorization is required to access channel and video data.

---

## Step: Create Google API Credentials

1. Go to Google Cloud Console

   [https://console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable **YouTube Data API v3**
4. Go to **APIs and Services → Credentials**
5. Click **Create Credentials → OAuth client ID**
6. Choose **Desktop application**
7. Download the file and rename it to:

<pre class="overflow-visible! px-0!" data-start="813" data-end="837"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>credentials.json
</span></span></code></div></div></pre>

---

## Step: Place credentials.json

Copy the file to the  **root folder of the project** :

<pre class="overflow-visible! px-0!" data-start="931" data-end="1009"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>project-root/
├── credentials.json
├── </span><span>index</span><span>.js
├── src/
└── README.md
</span></span></code></div></div></pre>

Do not rename the file to anything else.

---

## Step: Authorize the Application

1. Run the project once:

<pre class="overflow-visible! px-0!" data-start="1119" data-end="1191"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>node index.js https://www.youtube.com/channel/UCxxxxxxxxxxxx
</span></span></code></div></div></pre>

2. A browser window will open asking for Google authorization
3. Log in with your Google account
4. Allow requested permissions
5. After successful login, the app will create a file:

<pre class="overflow-visible! px-0!" data-start="1379" data-end="1397"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>token.json
</span></span></code></div></div></pre>

This file stores your access token and will be reused automatically.

---

## Important Notes

* Authorization is required only once
* After `token.json` is created, no further login is needed
* Do not delete `token.json` unless you want to reauthorize
* Do not commit `credentials.json` or `token.json` to GitHub

---

## .gitignore Recommendation

Add the following lines to `.gitignore`:

<pre class="overflow-visible! px-0!" data-start="1791" data-end="1826"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>credentials.json
token.json
</span></span></code></div></div></pre>

This keeps your credentials safe.

---

## Common Authorization Issues

### Access denied or app not verified

* Add your Google account as a test user in Google Cloud Console
* Use OAuth in testing mode

### Quota exceeded

* Wait for daily quota reset
* Use direct channel ID URLs to reduce API usage

## Step 8: Run the Project

You must provide a channel URL in this format:

<pre class="overflow-visible! px-0!" data-start="3295" data-end="3349"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>https:</span><span>//www.youtube.com/channel/UCxxxxxxxxxxxx</span><span>
</span></span></code></div></div></pre>

Run:

<pre class="overflow-visible! px-0!" data-start="3356" data-end="3428"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>node index.js https://www.youtube.com/channel/UCxxxxxxxxxxxx
</span></span></code></div></div></pre>

---

## How Transcription Works

1. Video audio is downloaded using yt-dlp
2. Audio is processed by Whisper AI locally
3. Transcript is generated as text
4. Transcript is saved and added to CSV

Whisper is executed using:

<pre class="overflow-visible! px-0!" data-start="3652" data-end="3681"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>python -m whisper
</span></span></code></div></div></pre>

This avoids PATH issues on Windows.

---

## Output

* CSV file containing all video data
* Transcript column included
* If transcription fails, transcript is marked as unavailable

---

## Performance Notes

* Processing time depends on total video duration
* Short videos process quickly
* Long videos may take hours
* This is normal for free AI transcription

---

## Troubleshooting

### Whisper not recognized

Make sure Python 3.11 is installed and:

<pre class="overflow-visible! px-0!" data-start="4138" data-end="4174"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="@w-xl/main:top-9 sticky top-[calc(--spacing(9)+var(--header-height))]"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>python -m whisper --</span><span>help</span><span>
</span></span></code></div></div></pre>

### yt-dlp not found

Ensure yt-dlp.exe is in PATH and terminal was restarted

### FFmpeg not found

Ensure C:\ffmpeg\bin is in PATH

---

## Disclaimer

This project does not scrape YouTube captions.

Transcripts are generated from audio using AI.

Usage must comply with YouTube terms and content permissions.

---

## Repository

Please check this GitHub repository for:

* Full source code
* Clean structure
* Ongoing updates

Feel free to open an issue or contact me if you need help or customization.
