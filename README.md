# Budget Tracker

A modern, full-stack, monorepo web application for personal finance management. Track your income and expenses, categorize transactions, and visualize your spending patterns with intuitive charts and summaries.

## Tech Stack

### Frontend
- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [TanStack Query](https://tanstack.com/query/latest) - Data fetching and state management
- [TanStack Form](https://tanstack.com/form/latest) - Form handling
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shadcn/ui](https://ui.shadcn.com/) - UI components

### Backend
- [Hono](https://hono.dev/) - Lightweight, ultrafast web framework
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [Better Auth](https://better-auth.dev/) - Authentication solution
- [Zod](https://zod.dev/) - Schema validation

### Infrastructure
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Turborepo](https://turbo.build/) - Monorepo management
- [PNPM](https://pnpm.io/) - Package management
- [Railway](https://railway.app/) - Backend deployment
- [Vercel](https://vercel.com/) - Frontend deployment

## Getting Started

### Prerequisites

- Node.js v22
- PNPM v10.2.1

### Installation

1. Clone the repository

```bash
git clone https://github.com/radekskrabucha/budget-tracker
cd budget-tracker
```

2. Install dependencies

```bash
pnpm install
```

3. Set up environment variables

Copy and fill with your own values the `.env.example` files to `.env` in both `apps/api` and `apps/web` directories:

```bash
cp apps/api/.env.example apps/api/.env
```
```bash
cp apps/web/.env.example apps/web/.env
```

4. Start the application

```bash
pnpm dev
```


The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

## Project Structure

budget-tracker
├── apps
|   ├── api # Backend application
|   └── web # Frontend application
└── packages
    ├── ui # Shared UI components
    └── utils # Shared utilities
