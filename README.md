<div align="center">

<a href="./docs/assets/banner.svg">
  <img src="./docs/assets/banner.svg" alt="BailSETU Banner — Your Bridge to Legal Information" width="100%"/>
</a>

<br/>
<br/>

# [BailSETU](https://bailsetu.vercel.app/)
<!-- TODO: Replace with production live deployment URL if different -->

**Your Bridge to Legal Information — bilingual legal awareness and bail eligibility platform.**

[![readme-typing-svg](https://readme-typing-svg.demolab.com?font=Inter&size=16&pause=1200&color=F97316&center=true&vCenter=true&multiline=false&width=500&lines=Search+IPC+and+BNS+sections;Check+bail+eligibility+and+legal+status;Find+experienced+criminal+advocates;Apply+for+free+legal+aid+support)](https://git.io/typing-svg)

<br/>

![Next.js](https://img.shields.io/badge/Next.js-15.3.9-black?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=flat-square&logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Last Commit](https://img.shields.io/github/last-commit/valiantProgrammer/BailSetu?style=flat-square)
[![GitHub Stars](https://img.shields.io/github/stars/valiantProgrammer/BailSetu?style=flat-square&logo=github)](https://github.com/valiantProgrammer/BailSetu/stargazers)

<br/>

**[Features](#features) · [Screenshots](#screenshots) · [Getting Started](#getting-started) · [Tech Stack](#tech-stack) · [Architecture](#architecture) · [Roadmap](#roadmap) · [Contributing](#contributing)**

</div>

---

<img src="./docs/assets/divider.svg" alt="" width="100%"/>

## About

BailSETU is a full-stack civic legal information platform built for Indian citizens, undertrials, law students, and legal-aid seekers. It bridges the gap between intricate criminal statutes and everyday understanding by translating complex penal provisions under both the Indian Penal Code (IPC, 1860) and Bharatiya Nyaya Sanhita (BNS, 2023) into clear bail metrics, procedural timelines, and directory contacts. Available fully bilingually in English and Hindi (हिंदी), it simplifies case classification, connects litigants with verified legal counsel, and digitizes the application intake for free legal aid.

> This project provides legal information for educational purposes only. It is not legal advice. Consult a qualified advocate for your case.

<img src="./docs/assets/divider.svg" alt="" width="100%"/>

## Links 
<details>
  <summary>Show Links</summary>
 <ul>
  <li>Website URL: <a href="https://bail-setu.vercel.app/">https://bail-setu.vercel.app/</a></li>
  <li>For Mobile Experience scan this qr code : 
  <img src="./bailsetu_qr_dark_gold.png" alt="QR Code for Mobile Experience" width="300" height="300"/></li>
  </ul>
</details>

<img src="./docs/assets/divider.svg" alt="" width="100%"/>

## Features

<table>
<tr>
<td width="33%">

🔍 **Dual Search Modes**<br/>
Query legal provisions by factual incident description ("stole a mobile phone") or exact statutory code ("379", "BNS 303").

</td>
<td width="33%">

⚖️ **IPC &amp; BNS Mapping**<br/>
Instant penal code cross-referencing with color-coded status badges: Bailable, Non-Bailable, Depends, and Cognizable.

</td>
<td width="33%">

📜 **Section Dossiers**<br/>
Statutory detail views specifying imprisonment terms, trial courts, bail types, landmark judgments, and official code citations.

</td>
</tr>
<tr>
<td width="33%">

👨‍⚖️ **Advocate Discovery**<br/>
Filter verified legal practitioners by jurisdiction (Kolkata, Delhi), practice specialisation, and languages with callback requests.

</td>
<td width="33%">

📝 **4-Step Legal Aid Intake**<br/>
Structured application form under the Legal Services Authorities Act with applicant KYC, offence data, and document uploads.

</td>
<td width="33%">

📊 **User Workspace &amp; Tracking**<br/>
Personalized dashboard with search history, bookmarked sections, real-time application milestone tracking, and bilingual toggling.

</td>
</tr>
</table>

<details>
<summary>More details</summary>

- **Authentication**: NextAuth.js v4 managing sessions with Credentials provider and Google / GitHub OAuth integrations.
- **Internationalization (i18n)**: Dedicated `LanguageContext` supporting English and Hindi (`हिंदी`) with automatic `localStorage` persistence.
- **Data Architecture**: Structured JSON repositories in `json-folder/` for IPC sections and advocates, decoupled behind an extensible service layer in `src/services/`.
- **Form State &amp; Validation**: Client validation driven by React Hook Form coupled with Zod schema verification for legal aid intake.
- **Accessibility &amp; Design**: WCAG-compliant color-coded status chips, semantic HTML5 elements, and custom typography fallbacks for Devanagari script.

</details>

<img src="./docs/assets/divider.svg" alt="" width="100%"/>

## Screenshots

### Landing and Search

<table>
<tr>
<td width="50%">
  <a href="./public/screenshorts/01-home-desktop.png">
    <img src="./public/screenshorts/01-home-desktop.png" alt="BailSETU Landing Page Desktop" width="100%"/>
  </a>
  <p align="center"><sub>Home — hero banner with search, quick-action tiles, and Supreme Court motif</sub></p>
</td>
<td width="50%">
  <a href="./public/screenshorts/02-search-desktop.png">
    <img src="./public/screenshorts/02-search-desktop.png" alt="Search and Offence Input Desktop" width="100%"/>
  </a>
  <p align="center"><sub>Search — dual query mode and 8 color-tinted category cards</sub></p>
</td>
</tr>
</table>

### Results and Section Details

<table>
<tr>
<td width="50%">
  <a href="./public/screenshorts/03-results-desktop.png">
    <img src="./public/screenshorts/03-results-desktop.png" alt="Search Results Desktop" width="100%"/>
  </a>
  <p align="center"><sub>Results — bail eligibility summary strip and IPC/BNS filtered listings</sub></p>
</td>
<td width="50%">
  <a href="./public/screenshorts/04-section-details-desktop.png">
    <img src="./public/screenshorts/04-section-details-desktop.png" alt="Legal Section Details Desktop" width="100%"/>
  </a>
  <p align="center"><sub>Section Details — status cards, punishment matrix, and landmark precedents</sub></p>
</td>
</tr>
</table>

### Advocates and Legal Aid

<table>
<tr>
<td width="50%">
  <a href="./public/screenshorts/07-find-advocate-desktop.png">
    <img src="./public/screenshorts/07-find-advocate-desktop.png" alt="Find Advocates Directory Desktop" width="100%"/>
  </a>
  <p align="center"><sub>Find Advocates — city and domain filters with verified lawyer cards</sub></p>
</td>
<td width="50%">
  <a href="./public/screenshorts/08-apply-legal-aid-desktop.png">
    <img src="./public/screenshorts/08-apply-legal-aid-desktop.png" alt="Apply for Legal Aid Desktop" width="100%"/>
  </a>
  <p align="center"><sub>Legal Aid — 4-step wizard for pro-bono defense under Section 12 NALSA</sub></p>
</td>
</tr>
</table>

### Dashboard and Tracking

<table>
<tr>
<td width="50%">
  <a href="./public/screenshorts/06-dashboard-desktop.png">
    <img src="./public/screenshorts/06-dashboard-desktop.png" alt="User Dashboard Desktop" width="100%"/>
  </a>
  <p align="center"><sub>User Dashboard — activity metric cards, recent queries, and saved provisions</sub></p>
</td>
<td width="50%">
  <a href="./public/screenshorts/09-track-application-desktop.png">
    <img src="./public/screenshorts/09-track-application-desktop.png" alt="Track Application Desktop" width="100%"/>
  </a>
  <p align="center"><sub>Track Application — milestone stepper from submission to advocate assignment</sub></p>
</td>
</tr>
</table>

### Account and Help

<table>
<tr>
<td width="50%">
  <a href="./public/screenshorts/05-login-desktop.png">
    <img src="./public/screenshorts/05-login-desktop.png" alt="Login and Sign Up Desktop" width="100%"/>
  </a>
  <p align="center"><sub>Authentication — split brand panel with Google OAuth and credentials</sub></p>
</td>
<td width="50%">
  <a href="./public/screenshorts/10-faq-desktop.png">
    <img src="./public/screenshorts/10-faq-desktop.png" alt="FAQ and Knowledge Base Desktop" width="100%"/>
  </a>
  <p align="center"><sub>FAQ — searchable accordion categories explaining bail jurisprudence</sub></p>
</td>
</tr>
</table>

### Mobile Views

<table>
<tr>
<td width="23%">
  <a href="./public/screenshorts/01-home-mobile.png">
    <img src="./public/screenshorts/01-home-mobile.png" alt="Home Mobile" width="100%"/>
  </a>
  <p align="center"><sub>Home</sub></p>
</td>
<td width="23%">
  <a href="./public/screenshorts/02-search-mobile.png">
    <img src="./public/screenshorts/02-search-mobile.png" alt="Search Mobile" width="100%"/>
  </a>
  <p align="center"><sub>Search</sub></p>
</td>
<td width="23%">
  <a href="./public/screenshorts/03-results-mobile.png">
    <img src="./public/screenshorts/03-results-mobile.png" alt="Results Mobile" width="100%"/>
  </a>
  <p align="center"><sub>Results</sub></p>
</td>
<td width="23%">
  <a href="./public/screenshorts/04-section-details-mobile.png">
    <img src="./public/screenshorts/04-section-details-mobile.png" alt="Section Details Mobile" width="100%"/>
  </a>
  <p align="center"><sub>Details</sub></p>
</td>
</tr>
<tr>
<td width="23%">
  <a href="./public/screenshorts/05-find-advocate-mobile.png">
    <img src="./public/screenshorts/05-find-advocate-mobile.png" alt="Find Advocate Mobile" width="100%"/>
  </a>
  <p align="center"><sub>Advocates</sub></p>
</td>
<td width="23%">
  <a href="./public/screenshorts/06-apply-legal-aid-mobile.png">
    <img src="./public/screenshorts/06-apply-legal-aid-mobile.png" alt="Legal Aid Mobile" width="100%"/>
  </a>
  <p align="center"><sub>Legal Aid</sub></p>
</td>
<td width="23%">
  <a href="./public/screenshorts/07-login-mobile.png">
    <img src="./public/screenshorts/07-login-mobile.png" alt="Login Mobile" width="100%"/>
  </a>
  <p align="center"><sub>Login</sub></p>
</td>
<td width="23%">
  <a href="./public/screenshorts/08-dashboard-mobile.png">
    <img src="./public/screenshorts/08-dashboard-mobile.png" alt="Dashboard Mobile" width="100%"/>
  </a>
  <p align="center"><sub>Dashboard</sub></p>
</td>
</tr>
<tr>
<td width="23%">
  <a href="./public/screenshorts/09-saved-sections-mobile.png">
    <img src="./public/screenshorts/09-saved-sections-mobile.png" alt="Saved Sections Mobile" width="100%"/>
  </a>
  <p align="center"><sub>Saved</sub></p>
</td>
<td width="23%">
  <a href="./public/screenshorts/10-track-application-mobile.png">
    <img src="./public/screenshorts/10-track-application-mobile.png" alt="Track Application Mobile" width="100%"/>
  </a>
  <p align="center"><sub>Tracking</sub></p>
</td>
<td width="23%">
  <a href="./public/screenshorts/11-faq-mobile.png">
    <img src="./public/screenshorts/11-faq-mobile.png" alt="FAQ Mobile" width="100%"/>
  </a>
  <p align="center"><sub>FAQ</sub></p>
</td>
<td width="23%">
  <a href="./public/screenshorts/12-about-mobile.png">
    <img src="./public/screenshorts/12-about-mobile.png" alt="About Mobile" width="100%"/>
  </a>
  <p align="center"><sub>About</sub></p>
</td>
</tr>
</table>

<img src="./docs/assets/divider.svg" alt="" width="100%"/>

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | Next.js `15.3.9` (App Router) |
| Core Library | React `^19.0.0` / React DOM `^19.0.0` |
| UI &amp; Styling | Tailwind CSS `^4.0.0` with `@tailwindcss/postcss` `^4.0.0` |
| Icons | Lucide React `^1.55.0` &amp; React Icons `^5.5.0` |
| Animation | Framer Motion `^12.23.0` |
| Internationalization | Custom `LanguageContext` (EN &amp; हिंदी) with `localStorage` |
| Forms &amp; Validation | React Hook Form `^7.59.0` &amp; Zod `^4.6.5` |
| Routing | Next.js file-based App Router |
| Backend &amp; API | Next.js Serverless Route Handlers (`app/api/`) |
| Database Layer | MongoDB Driver `^7.0.0` &amp; Mongoose `^8.16.1` |
| Authentication | NextAuth.js `^4.24.13` (Google, GitHub, Credentials) |
| AI &amp; Embeddings | `@google/generative-ai` `^0.24.1` &amp; `@xenova/transformers` `^2.17.2` |
| Messaging &amp; Email | Nodemailer `^7.0.4` &amp; Twilio `^5.7.1` |
| Tooling &amp; Quality | ESLint `^9.0.0` with `eslint-config-next` `15.3.4` |

<img src="./docs/assets/divider.svg" alt="" width="100%"/>

## Architecture

```mermaid
flowchart TD
    Client["Client Browser<br/>(Desktop / Mobile)"] --> Routing["Next.js App Router & Middleware"]

    subgraph Presentation["Presentation & State"]
        Routing --> Pages["App Pages<br/>(/, /search, /section, /advocates, /legal-aid)"]
        Pages --> LangCtx["LanguageContext<br/>(EN / हिंदी Toggle & localStorage)"]
        Pages --> Forms["React Hook Form + Zod"]
    end

    subgraph ServiceLayer["Service Abstraction Layer"]
        Pages --> LegalSvc["LegalService<br/>(IPC/BNS Search & Filters)"]
        Pages --> AdvocateSvc["AdvocateService<br/>(Discovery & Filters)"]
        Pages --> LegalAidSvc["LegalAidService<br/>(Intake & Tracking)"]
        Pages --> UserSvc["UserService<br/>(Saved Items & Metrics)"]
    end

    subgraph ApiAndAuth["API & Authentication"]
        Routing --> NextAuth["NextAuth.js Layer<br/>(/api/auth/[...nextauth])"]
        Routing --> ApiHandlers["Next.js Route Handlers<br/>(/api/faqs, /api/messages)"]
    end

    subgraph DataTier["Data & Integration Sources"]
        LegalSvc --> JsonData["Static Data Repositories<br/>(ipc_sections.json, advocates.json)"]
        AdvocateSvc --> JsonData
        NextAuth --> MongoDb[("MongoDB Database<br/>(Users, Sessions)")]
        ApiHandlers --> MongoDb
        LegalAidSvc -.-> MongoDb
        ApiHandlers -.-> GeminiAI["Google Gemini API<br/>(@google/generative-ai)"]
    end
```

<img src="./docs/assets/divider.svg" alt="" width="100%"/>

## Getting Started

### Prerequisites

<!-- TODO: Add "engines" field to package.json or create an .nvmrc file -->
- **Node.js**: `v18.18.0` or `v20.x` or higher
- **npm**: `v9.x` or higher (or compatible pnpm / yarn)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/valiantProgrammer/BailSetu.git
   cd BailSetu
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Launch development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) (or the port allocated in your terminal, e.g. [http://localhost:3001](http://localhost:3001)) in your browser.

### Environment Variables

<details>
<summary>Configure environment credentials</summary>

> [!WARNING]
> Never commit `.env.local` or share active production credentials. All values below represent illustrative templates.

| Variable | Purpose | Example Placeholder |
|---|---|---|
| `NEXTAUTH_SECRET` | Cryptographic secret for signing NextAuth session JWTs | `4ee654127dbc8fbd44f6452290343350...` |
| `NEXTAUTH_URL` | Canonical public URL of the application | `http://localhost:3000` |
| `MONGODB_URI` | Connection URI for MongoDB cluster | `mongodb+srv://user:pass@cluster.mongodb.net/bailsetu` |
| `GOOGLE_CLIENT_ID` | Google Cloud Console OAuth 2.0 Client ID | `123456789-example.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google Cloud Console OAuth 2.0 Client Secret | `GOCSPX-exampleSecretKey12345` |
| `GITHUB_ID` | GitHub Developer App Client ID | `Ov23exampleAppId01` |
| `GITHUB_SECRET` | GitHub Developer App Client Secret | `exampleGithubSecretKey67890` |
| `GEMINI_API_KEY` | API Key for Google Generative AI | `AIzaSyExampleGeminiKey_AbCdEf` |
| `EMAIL_USER` | SMTP server sender email address | `notifications@bailsetu.in` |
| `EMAIL_PASS` | App-specific password for SMTP authentication | `abcd efgh ijkl mnop` |

</details>

### Available Scripts

| Script | Command | Purpose |
|---|---|---|
| `dev` | `next dev` | Starts local Next.js development server |
| `build` | `next build` | Creates optimized production build |
| `start` | `next start` | Runs production server after build |
| `lint` | `next lint` | Executes ESLint analysis on codebase |
| `import:ipc-sections` | `node scripts/import-ipc-sections.js` | Imports legal sections from CSV into data store |

<!-- TODO: Add test script (e.g., "test": "vitest") to package.json -->

<img src="./docs/assets/divider.svg" alt="" width="100%"/>

## Project Structure

<details>
<summary>Click to view full repository file tree</summary>

```text
BailSetu/
├── app/                                 # Next.js App Router root directory
│   ├── about/                           # About BailSETU and Contact Us page
│   ├── advocates/                       # Find Advocates discovery page
│   ├── api/                             # Serverless API routes (auth, faqs, messages)
│   ├── components/                      # Shared frontend components
│   │   ├── layout/                      # BrandLogo, Navbar, and Footer components
│   │   └── ui/                          # Design system primitives (StatusBadge, etc.)
│   ├── context/                         # LanguageContext provider for EN/HI toggle
│   ├── dashboard/                       # User dashboard with stats and saved sections
│   ├── faq/                             # FAQ accordion knowledge base page
│   ├── legal-aid/                       # 4-step Legal Aid application wizard
│   ├── login/                           # Route alias to signin page
│   ├── saved/                           # Bookmarked sections and search history page
│   ├── search/                          # Search input and results pages
│   │   └── results/                     # Filterable penal provisions listing
│   ├── section/                         # Section details dossier route
│   │   └── [id]/                        # Dynamic legal section profile component
│   ├── signin/                          # Authentication page with OAuth and form
│   ├── track-application/               # Milestone tracking portal for legal aid
│   ├── globals.css                      # Global styles and design tokens
│   ├── layout.js                        # Root HTML structure and font loaders
│   └── providers.js                     # NextAuth and LanguageProvider wrapper
├── docs/                                # Documentation assets
│   └── assets/                          # SVG illustrations and graphics
│       ├── banner.svg                   # Handcrafted 1200x300 hero banner
│       ├── divider.svg                  # Thin gradient section divider line
│       └── status-dot.svg               # Live status indicator pill
├── json-folder/                         # Core legal and advocate datasets
│   ├── advocates.json                   # Advocate records and credentials
│   ├── arbitrators.json                 # Arbitrator listings
│   └── ipc_sections.json                # Structured IPC statutory dataset
├── lib/                                 # Server utility helpers
│   ├── embedder.js                      # Local vector embeddings helper
│   ├── gemini.js                        # Google Generative AI integration
│   ├── mongo.js                         # MongoDB connection utility
│   └── translator.js                    # Multi-language translation utility
├── public/                              # Publicly served static assets
│   ├── advocates/                       # Advocate headshot portraits
│   ├── screenshorts/                    # Interface gallery images
│   ├── svgs/                            # Custom architectural vector graphics
│   ├── logo.png                         # Primary BailSETU logo asset
│   └── supreme_court_hero.jpg           # Hero section illustration
├── scripts/                             # Automation scripts
│   └── import-ipc-sections.js           # CSV dataset import utility script
├── src/                                 # Client-side service layer
│   ├── data/                            # Client mock datasets
│   │   └── mockData.js                  # Sections, advocates, user, and FAQ data
│   └── services/                        # Service abstraction layer
│       ├── advocateService.js           # Advocate filtering and query handler
│       ├── legalAidService.js           # Legal aid submission and tracking handler
│       ├── legalService.js              # Section search and classification handler
│       └── userService.js               # User statistics and bookmarks handler
├── .env.local.example                   # Environment configuration template
├── package.json                         # Project dependencies, scripts, and metadata
├── postcss.config.mjs                   # PostCSS processing pipeline configuration
└── tailwind.config.js                   # Tailwind CSS styling configuration
```

</details>

<img src="./docs/assets/divider.svg" alt="" width="100%"/>

## Roadmap

- [x] Responsive layout matching legal information architecture across desktop and mobile
- [x] Dual search support for offence descriptions and statutory section numbers
- [x] IPC and BNS penal code cross-mapping with color-coded status badges
- [x] Legal section dossiers with punishment matrices, trial courts, and precedents
- [x] Find Advocates directory with practice area filters and contact modals
- [x] 4-step Legal Aid application wizard with input validation
- [x] Application tracking portal with milestone timeline steppers
- [x] User dashboard with saved sections and search history management
- [x] English and Hindi (हिंदी) bilingual interface with `localStorage` persistence
- [ ] Direct production database binding for real-time court case diary sync
- [ ] SMS and WhatsApp case notification dispatch via Twilio
- [ ] Additional regional language support (Bengali, Marathi, Tamil, Telugu)
- [ ] Offline progressive web application (PWA) cache for legal provisions

<img src="./docs/assets/divider.svg" alt="" width="100%"/>

## Contributing

1. **Fork the repository** to your personal GitHub account.
2. **Create a feature branch:**
   ```bash
   git checkout -b feat/statutory-bns-enhancement
   ```
3. **Execute linting and code quality checks:**
   ```bash
   npm run lint
   ```
4. **Commit your modifications** using conventional commit standards (`feat:`, `fix:`, `docs:`, `refactor:`).
5. **Submit a Pull Request** targeting the `main` branch with detailed release notes.

<img src="./docs/assets/divider.svg" alt="" width="100%"/>

## License

No formal `LICENSE` file currently exists in the repository root. The project metadata refers to the MIT License.
<!-- TODO: Choose and commit an official LICENSE file (e.g., MIT) to the root directory -->

---

<div align="center">

<img src="./docs/assets/status-dot.svg" alt="Live Status" height="18"/>
<br/>
<br/>

*Built with Next.js, React, Tailwind CSS, and MongoDB.*

<br/>

[![GitHub Profile](https://img.shields.io/badge/GitHub-valiantProgrammer-181717?style=flat-square&logo=github)](https://github.com/valiantProgrammer)

</div>