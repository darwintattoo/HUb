# TattooStencilPro

## Overview

TattooStencilPro is a centralized Hub platform designed for tattoo artists, serving as the main portal to access multiple AI-powered tattoo design applications. The platform will continuously expand as new tools and applications are added. Currently features a landing page showcasing tools like stencil generation and AI image editing, with more applications to be integrated over time. It's built as a full-stack application with a React frontend and Express backend, supporting both English and Spanish languages.

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
- **Centralized Hub**: Main portal for accessing all tattoo design applications, designed to scale as new tools are added
- **Internationalization**: Built-in support for English and Spanish languages
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- **Email Integration**: Mailchimp integration for user notifications and updates
- **SEO Optimization**: Meta tags, Open Graph, and Twitter Card support
- **Code Protection**: JavaScript obfuscation system for intellectual property protection
- **External Tool Integration**: Links to functional stencil generator and AI image editor applications (with capacity for unlimited future tools)
- **Professional Navigation**: Comprehensive navigation menu with product dropdown, mobile-responsive design, and sticky header
- **Clean Landing Page**: Focused landing page showcasing functional tools with modern video presentation and floating image design

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
- **Email Marketing**: Mailchimp integration for subscriber management
- **Font Loading**: Google Fonts (Inter family)
- **Analytics**: Google Search Console verification
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