# Janii

A free, offline Windows app for wedding photographers: it reads a folder of RAW and JPEG photographs from a shoot, groups them into moments, and proposes the story and the memories, with a reason for every frame.

Live: https://arling.sk/janii/

## What it is

Janii is a free public beta for Windows. Point it at a folder of RAW and/or JPEG files from one wedding and it reads every photograph where it is (never opening one for writing), groups frames shot close together in time into "moments", and measures each frame. From that it proposes two tiers: the **story**, the best photographs that also cover the day, seeded to a target count with no padding; and the **memories**, the story plus enough more that nobody who was actually there is left with zero photographs. Every frame carries a stated reason: `send this one`, `your eyes` (too close to call), `already covered` (a near duplicate that lost), or `only shot once` (protected).

- **Reads the embedded preview first.** Nearly every RAW file carries a ready-made JPEG preview; Janii reads that instead of decoding the full sensor data, and only falls back when a file has none.
- **Groups into moments** so a burst of fifteen collapses to the two or three that actually differ.
- **Coverage per person**, so a bridal party of ten is not crowded out by whoever posed for every frame.
- **Never copies, moves, renames or deletes a photograph.** There is no delete function. Everything Janii creates lives in one `.janii` folder beside the photographs.
- **Never uses the network.**
- **Hands off cleanly.** Write XMP sidecars for Lightroom/Bridge/Capture One, or deliver a new JPEG gallery, without ever opening an original for writing.

## What's in this repo

| File | Purpose |
|---|---|
| `index.html` | The landing page: hero, what it does, an honest "what it does not do yet" section, how to run it, download, price, email signup, FAQ, and a Slovak summary |
| `docs/` | The step-by-step user guide, in English, with real screenshots from the current beta |
| `subscribe.js` | Wires the opt-in "notify me" email form to the ARLing homelab subscribe API |
| `assets/`, `docs/img/` | Screenshots from the app (WebP), and generated site images |
| `brand/` | Source icon files (SVG and PNG at several sizes) the favicon and app icons are built from |
| `robots.txt`, `sitemap.xml` | Search-engine and crawler hygiene; AI crawlers explicitly allowed |
| `manifest.json` | Web app manifest (installable-tab metadata, not a PWA) |
| `favicon.svg` / `.ico`, `favicon-16/32/64.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` | Icons |
| `og-image.png` | 1200×630 Open Graph / Twitter card image |
| `404.html` | Styled not-found page |
| `health.json` | Uptime check target |
| `llms.txt` / `llms-full.txt` | Short and full machine-readable summaries for AI crawlers and assistants |
| `.nojekyll` | Disables Jekyll processing on GitHub Pages |
| `launch/launch-posts.md` | Researched launch communities and ready-to-post text |

This repository is the landing page and docs only. It does not contain Janii's Flutter/Python engine source, which is developed privately; only the compiled Windows build is attached here as a GitHub Release.

## What it does not do (yet)

- **No straightening, cropping or colour grading.** Selection only, for now. The engine measures colour but changes no pixel; finish the picked frames in Lightroom, Capture One or Bridge as usual.
- **Windows only.** No macOS or Linux build.
- **CPU only, no GPU.** A first pass over a big wedding (several thousand RAW files) can run for hours. No public benchmark is published yet.
- **No face recognition yet.** The detector and matcher both work in internal testing on permissively licensed models; grouping photographs by person is held back on the legal question around identifying people (GDPR Article 9), not a technical one.
- **Beta, as-is.** It can be wrong, it can be slow, and the interface will keep changing. Keep an independent backup of the photographs regardless.

## Download

Free public beta, Windows only, direct download.

**Windows.** ZIP, about 130 MB. Unzip the whole folder and run `Janii.bat` from inside it; no installer, no admin rights.
https://github.com/AndryRoby/janii/releases/latest

SHA-256 checksum for this beta build:
```
a33c3588bda3e4c5207aafaa2e1115485fd9cb980834e3aa640b1e6644651742  Janii-beta-win64.zip
```

Docs: step-by-step guide at https://arling.sk/janii/docs/.

## Run this landing page locally

There is no build step for this repo. It's static files.

```bash
git clone https://github.com/AndryRoby/janii.git
cd janii
python -m http.server
# or just open index.html directly in a browser
```

This only runs the landing page; Janii itself (the Windows app) is downloaded, not built from this repo. There is no automated test suite for this static site.

## Privacy

Janii the application never opens a network connection; every photograph stays on the device it runs on and is only ever read, never copied, moved, renamed or deleted. This landing page is static and uses a self-hosted Umami instance with no cookies, for anonymous page-view and click counts only, never what you download or type. The optional "notify me" email signup is voluntary, used for nothing else, and any reply unsubscribes you.

## Report a problem

Found something broken on this page, a download link that fails, or a bug in the app itself? Open an issue at https://github.com/AndryRoby/janii/issues, or write to andrej@arling.sk. For an app bug, include roughly how many RAW files you ran, which camera(s) shot them, and what you expected versus what happened; a screenshot helps.

## License

All rights reserved, © 2026 ARLing s. r. o. (Bratislava, Slovakia), for this landing page and for Janii itself. The hosted site and the compiled beta build are free to use, for any purpose, at no cost. Reading this repository's files is reading the entire site, and that's fine, learn from it. Rehosting this page, repackaging Janii's build as your own, or using the Janii or ARLing name for your own project is not; for anything else, write to andrej@arling.sk.

---

ARLing s. r. o., Bratislava, Slovakia. andrej@arling.sk

Hub and sibling tools: https://arling.sk/ · https://arling.sk/bookapp/
