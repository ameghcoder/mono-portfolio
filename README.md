# Mono Portfolio

A minimal, high-performance portfolio template for developers. Built with Next.js 16, Tailwind CSS v4, and Framer Motion—designed to be clean, code-centric, and easy to customize.

## Features

- **Built with Next.js 16 (App Router)** & **Turbopack**
- **Tailwind CSS v4** for next-gen styling
- **Framer Motion** for smooth, minimal animations
- **TypeScript** for type safety
- **Performance Optimized** (Lighthouse 100)
- **Centralized Configuration** (`src/data/portfolio.ts`) - Edit one file to update all content
- **Responsive Design** - Looks great on all devices
- **Cal.com Integration** - Built-in meeting scheduler
- **Project Case Studies** - Dedicated pages for detailed project breakdowns

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ameghcoder/mono-portfolio.git
   cd mono-portfolio
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization

The entire site is powered by a central configuration file located at `src/data/portfolio.ts`.

### 1. Update Your Profile

Open `src/data/portfolio.ts` and modify the `PORTFOLIO_DATA` object:

```typescript
export const PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: "Your Name",
    role: "Your Role",
    bio: "Your short bio...",
    location: "Your Location",
    availability: "Availability Status",
    email: "your.email@example.com",
    resume: "https://link-to-your-resume.pdf",
  },
  // ...
```

### 2. Add Projects

Add your projects to the `projects` array. Each project needs a unique `slug`.

### 3. Update Skills & Experience

Modify the `skills`, `experience`, `achievements`, and `education` arrays to match your background.

### 4. Configure Socials

Update your social media links in the `socials` array.

### 5. Setup Calendar (Optional)

If you use Cal.com, update the `calendarUrl` field with your Cal.com link (e.g., `username/event-type`). If you don't use it, you can remove the `Booker` component from `app/page.tsx` or leave the field blank (though keeping it valid avoids errors).

## Deployment

The easiest way to deploy is to use [Vercel](https://vercel.com).

1. Push your code to GitHub.
2. Import the project into Vercel.
3. Deploy!

## License

MIT License. Feel free to use this template for your personal portfolio.
