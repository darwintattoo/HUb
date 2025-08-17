# TattooStencilPro

## Overview

TattooStencilPro is a centralized authentication hub for tattoo artists, providing secure access to multiple AI-powered tattoo design applications. The platform uses Supabase authentication to manage user sessions, plans, and credits across all connected applications. Currently provides authenticated access to stencil generation and AI image editing tools. The authentication system supports email/password and Google OAuth login methods.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, built using Vite
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent UI patterns
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **Animation**: Framer Motion for smooth animations and transitions
- **UI Components**: Comprehensive set of shadcn/ui components including modals, forms, buttons, and navigation elements

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: Hot reload development server with Vite integration
- **Build System**: ESBuild for production bundling

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon Database)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: @neondatabase/serverless for serverless PostgreSQL connections

### Development Tools
- **Build Tool**: Vite with React plugin and runtime error overlay
- **TypeScript**: Strict configuration with path mapping for clean imports
- **Code Quality**: ESLint and TypeScript strict mode
- **Asset Management**: Static asset serving with optimized bundling

### Application Structure
- **Shared Types**: Common schema definitions and types in `/shared`
- **Client**: React application in `/client` with component-based architecture
- **Server**: Express API server in `/server` with modular routing
- **Storage**: Abstracted storage interface supporting in-memory and database implementations

### Key Features
- **Authentication Hub**: Centralized authentication system using Supabase for secure user management
- **User Authentication**: Email/password and Google OAuth login methods
- **Session Management**: Secure session handling with access tokens and refresh tokens
- **User Profiles**: Plan and credits tracking system for each user
- **Application Handoff**: Secure token-based authentication transfer to connected applications
- **Spanish Interface**: Full Spanish language interface for Latin American market
- **External Tool Integration**: Direct links to Stencil Generator and AI Editor with session passthrough
- **Real-time Session Status**: Live session checking and user status display
- **Account Management**: User registration, login, logout, and profile viewing

## External Applications
- **Stencil Generator**: https://ink-stencil-darwintattoo1.replit.app/ - Functional stencil conversion tool
- **AI Image Editor**: https://darwinfluxkontext.replit.app/ - AI-powered tattoo generator and image editor

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **Build Tools**: Vite, TypeScript, ESBuild, PostCSS, Autoprefixer
- **Database**: Drizzle ORM, Neon Database, PostgreSQL connection pooling

### UI and Styling
- **Component Library**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with class variance authority for component variants
- **Icons**: Lucide React icon library
- **Animation**: Framer Motion for smooth animations

### Development and Quality
- **Type Safety**: TypeScript with strict configuration
- **Code Formatting**: Class merging utilities (clsx, tailwind-merge)
- **Development Tools**: Replit integration, hot reload, error overlays

### Third-party Services
- **Authentication**: Supabase for user authentication and session management
- **Database**: Supabase PostgreSQL for user profiles, plans, and credits
- **OAuth Provider**: Google OAuth for social login
- **Font Loading**: System fonts (system-ui, sans-serif)
- **Domain**: Custom domain with SSL (tattoostencilpro.app)

### Production Considerations
- **Code Protection**: JavaScript obfuscation for source code protection
- **Performance**: Asset optimization and lazy loading
- **SEO**: Complete meta tag implementation for search engine optimization
- **Security**: Environment variable management for sensitive configurations

## Deployment Configuration

### Issue and Resolution
The project had a deployment configuration mismatch where:
- Vite builds output to `dist/public` directory (configured in vite.config.ts)
- Replit static deployment expects files in `dist` directory (configured in .replit)

### Solution Implemented (August 17, 2025)
Created deployment fix scripts to resolve the mismatch:

1. **Node.js Script**: `scripts/deploy-fix.js` - Copies build files from `dist/public` to `dist`
2. **Bash Script**: `scripts/deploy-fix.sh` - Alternative shell script approach
3. **Documentation**: `DEPLOYMENT.md` - Complete deployment guide

### Deployment Process
1. Run `npm run build` to build the project
2. Run `node scripts/deploy-fix.js` to fix file locations
3. Deploy via Replit Deploy button

### Technical Details
- Cannot modify core config files (vite.config.ts, .replit, package.json) due to environment restrictions
- Solution preserves existing build configuration while ensuring deployment compatibility
- Scripts use ES modules syntax to match project configuration

## Authentication System Update (August 17, 2025)

### Changes Made
- Replaced React-based landing page with simple HTML authentication hub
- Integrated Supabase for centralized user authentication
- Added Spanish language interface for primary user base
- Implemented secure session handoff to external applications

### Current Architecture
- **Frontend**: Simple HTML/CSS/JavaScript authentication page
- **Authentication**: Supabase client-side SDK with direct API calls
- **Session Management**: Token-based authentication with access_token and refresh_token
- **External Apps**: Session tokens passed via URL hash parameters for secure handoff