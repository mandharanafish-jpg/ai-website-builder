# 🚀 WebCraftAI – AI Website Builder

A complete, free-to-run AI website builder built with **Next.js 15**, **React**, **Tailwind CSS**, and **TypeScript**.

## ✨ Features

- **AI Website Generator** – Type a prompt, get a complete responsive website instantly
- **6 Templates** – Business, Portfolio, Restaurant, Shop, Blog, News
- **Live Preview Panel** – See your website in real-time
- **Code Editor Panel** – Edit HTML directly in the browser
- **Download as ZIP** – Get your complete website file
- **Dark / Light Mode** – Fully themed UI
- **Local Storage Projects** – Save and load projects in the browser
- **Pricing Packages** – ₹400 / ₹600 / ₹800 plans
- **Order System** – 3-step order form with WhatsApp integration
- **No Login Required** – Works instantly
- **Mobile Friendly** – Fully responsive design

## 📦 Pages

| Page | URL |
|------|-----|
| Home + AI Builder | `/` |
| Pricing | `/pricing` |
| Order Website | `/order` |
| Portfolio | `/portfolio` |
| Contact | `/contact` |

## 🛠️ Setup & Run

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Steps

```bash
# 1. Clone or unzip the project
cd ai-website-builder

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# → http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## 🚀 Deploy to Vercel (Free)

1. Push code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Click **"Deploy"** — Vercel auto-detects Next.js

No environment variables needed. 100% free on Vercel's hobby plan.

## 💰 Pricing Packages

| Package | Price | Pages | Delivery |
|---------|-------|-------|----------|
| Starter | ₹400 | 1 page | 1–2 days |
| Standard | ₹600 | 3 pages | 2–3 days |
| Premium | ₹800 | 5 pages | 3–5 days |

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Home + AI Builder
│   ├── pricing/          # Pricing page
│   ├── order/            # Order form
│   ├── portfolio/        # Portfolio showcase
│   ├── contact/          # Contact form
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── builder/
│   │   └── WebsiteBuilder.tsx   # Core AI builder UI
│   └── layout/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       └── ThemeProvider.tsx
├── lib/
│   ├── generator.ts      # Template generator engine
│   ├── storage.ts        # localStorage helpers
│   ├── packages.ts       # Pricing data
│   └── utils.ts          # Utility functions
└── types/
    └── index.ts          # TypeScript types
```

## 🎨 Templates Available

- **Business** – Corporate website with features, services, testimonials
- **Restaurant** – Menu, gallery, reservations, contact
- **Portfolio** – Dark theme, project showcase, skills
- **Shop** – E-commerce product grid, categories, cart UI
- **Blog** – Editorial layout, sidebar, categories
- **News** – News portal with featured story and listings

## ⚙️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **ZIP Download**: JSZip + FileSaver.js
- **Storage**: Browser localStorage (no backend needed)
- **Fonts**: Inter + Syne + JetBrains Mono (Google Fonts)

## 📞 WhatsApp Integration

Orders are sent directly via WhatsApp. Update the number in:
- `src/components/layout/Footer.tsx`
- `src/app/order/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/pricing/page.tsx`

Change `919876543210` to your WhatsApp number (country code + number, no `+`).

## 📄 License

MIT — free to use, modify, and deploy.
