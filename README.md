# All Nations Christian Center — website (Release 1)

Fast, mobile-first, accessible front end for All Nations Christian Center,
Kaneshie, Accra. Built with React + Vite. All content lives in plain JS
data files so a CMS can replace them later with no code changes.

---

## 1. Folder & file structure

```
all-nations-church/
├─ index.html
├─ package.json
├─ vite.config.js
├─ .gitignore
├─ README.md
├─ public/
│  └─ favicon.svg
└─ src/
   ├─ main.jsx                 # App entry — mounts React + Router
   ├─ App.jsx                  # Routes + scroll-to-top
   ├─ styles/
   │  ├─ tokens.css            # Design tokens (colors, spacing, radii)
   │  └─ global.css            # Base + component styles (mobile-first)
   ├─ utils/
   │  └─ date.js               # Shared date helpers
   ├─ data/                    # <-- content lives here (CMS-ready)
   │  ├─ site.js               # Church name, address, service times, giving
   │  ├─ ministries.js         # All ministries + groups
   │  ├─ events.js             # Upcoming/past events
   │  ├─ sermons.js            # Latest media
   │  └─ announcements.js      # Weekly announcements
   ├─ components/              # Shared, reusable UI
   │  ├─ Layout.jsx            # Header + Outlet + Footer wrapper
   │  ├─ Header.jsx            # Sticky header with Ministries dropdown
   │  ├─ Footer.jsx            # Site footer
   │  ├─ WelcomeBanner.jsx
   │  ├─ LiveBar.jsx           # Shows only when site.live.isLive = true
   │  ├─ ServiceInfo.jsx       # Service times + location card
   │  ├─ SermonCard.jsx
   │  ├─ EventCard.jsx
   │  ├─ MinistryCard.jsx
   │  ├─ Announcement.jsx
   │  ├─ GivingPrompt.jsx
   │  ├─ JoinForm.jsx          # Used on joinable ministries
   │  └─ ContactForm.jsx       # Used on committees + Connect page
   └─ pages/
      ├─ Home.jsx              # Section order matches the brief
      ├─ About.jsx
      ├─ Ministries.jsx        # Groups: fellowship / service / committee
      ├─ MinistryPage.jsx      # ONE template reused by every ministry
      ├─ Events.jsx
      ├─ Connect.jsx
      └─ NotFound.jsx
```

### Where to add content later

| What            | Edit this file                 |
| --------------- | ------------------------------ |
| Church details  | `src/data/site.js`             |
| Ministries      | `src/data/ministries.js`       |
| Events          | `src/data/events.js`           |
| Sermons / media | `src/data/sermons.js`          |
| Announcements   | `src/data/announcements.js`    |

When the CMS is wired up, each file can be replaced with an API fetch
returning the same shape — the UI will not need to change.

---

## 2. Running the site on your computer

Prerequisites: **Node.js 18 or newer** (comes with npm).
Check with `node -v` in PowerShell.

Step-by-step (PowerShell on Windows):

```powershell
# 1. go into the project folder
cd C:\Users\edwar\all-nations-church

# 2. install dependencies (one-time)
npm install

# 3. start the dev server
npm run dev
```

Vite will open `http://localhost:5174` in your browser automatically.
Any edit to a file hot-reloads instantly.

To make a production build:

```powershell
npm run build        # output goes to dist/
npm run preview      # serves the built site at http://localhost:4173
```

---

## 3. What's included (quick tour)

- **Home** — welcome banner, live-now bar, service times, latest sermon,
  upcoming events, ministries preview, announcements, giving prompt.
- **About** — our story, beliefs, values, visit CTA.
- **Ministries** — grouped list (Fellowship / Service / Committee).
- **Ministry page** — one template used by every ministry: banner,
  quick facts, about, leaders, schedule, upcoming events, latest media,
  and a **join form** — except the committee, which shows a
  **contact option** instead (`joinable: false` in the data).
- **Events** — upcoming + recent.
- **Connect** — plan a visit + contact form + giving info.
- **Header** — mobile menu, Ministries mega-dropdown grouped by type,
  plus **disabled placeholders for Media, Give, Members** (reserved for
  later releases per the brief).

### Accessibility & performance notes

- Mobile-first CSS, no CSS framework — ships only a few KB of styles.
- Skip-link, focus ring, semantic landmarks, aria-labels on nav/forms.
- `prefers-color-scheme` not enabled (brand is navy/gold/white, one theme).
- No image assets — placeholder "cover" blocks render instantly on slow
  connections. Swap for real images when the CMS lands.
- Router bundle code-split via `manualChunks` in `vite.config.js`.

---

## 4. Assumptions I made

1. **Brand colors.** The brief listed both "white and gold" and
   "navy and gold." I used **navy (#0b2545)** + **gold (#c6a15b)** +
   **white/cream** — navy anchors the header/footer, gold is the accent,
   white/cream are the page backgrounds. Change in
   `src/styles/tokens.css` if you prefer white-dominant.
2. **Framework choice.** You said "react." I used **Vite + React 18**
   (no TypeScript, no CSS framework) to keep the bundle small for slow
   mobile connections.
3. **Routing.** React Router v6 with client-side nav. Deep-linking to
   `/ministries/<slug>` works in dev; for static hosting (Netlify,
   Vercel, GitHub Pages), add a rewrite so any unknown path serves
   `index.html`.
4. **Forms.** `JoinForm` and `ContactForm` currently show a success
   state on submit — no backend yet. When the CMS/API is picked, swap
   the `handleSubmit` body for a `fetch` call.
5. **Live indicator.** `site.live.isLive` is a plain boolean. The CMS
   can toggle it; later a scheduled job or embed check can set it
   automatically.
6. **Placeholder content.** Leader names, phone, email, event dates,
   sermon titles and the committee email are placeholders — replace
   them in the data files.
7. **Future releases reserved.** Media centre, online giving and members
   area appear in the header as disabled labels and in the footer under
   "Coming soon." No real routes exist for them yet.
8. **Images.** None included to keep the first paint fast. The ministry
   banner and sermon cover are solid-color blocks you can swap for
   real images (`<img loading="lazy" />` recommended).
9. **No analytics or cookie banner** in release 1 — add when a provider
   is chosen.
