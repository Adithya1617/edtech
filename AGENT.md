# AGENT.md - EdTech Platform Development Guide

## Build & Commands
- **Dev**: `npm run dev` - Start development server on localhost:3000
- **Build**: `npm run build` - Build for production
- **Lint**: `npm run lint` - Run ESLint with Next.js config
- **Start**: `npm run start` - Start production server
- **No test command** - No testing framework configured

## Architecture
- **Next.js 15** app router with TypeScript
- **Auth**: NextAuth.js with Google OAuth + role-based routing (admin/user)
- **UI**: Radix UI components + shadcn/ui patterns
- **Styling**: Tailwind CSS with custom color palette (navy, beige, gold)
- **State**: React hooks + Context API (SelectionContext)

## Code Style
- **Imports**: `@/` path alias for root, absolute imports preferred
- **Components**: Function components with TypeScript, Radix UI patterns
- **Styling**: Tailwind classes, `cn()` utility for conditional classes
- **Types**: Strict TypeScript, interface exports, React.FC avoided
- **Files**: kebab-case for files, PascalCase for components
- **Fonts**: Lato (sans), Playfair Display (serif)
- **No comments** unless complex logic requires explanation
