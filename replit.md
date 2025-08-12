# Restaurant Menu & Delivery App

## Overview

This is a full-stack restaurant web application that combines menu browsing, online ordering, and secure payment processing. The app allows customers to browse the restaurant's menu, add items to their cart, and complete orders through Stripe payment integration. It features a responsive design built with React and shadcn/ui components, serving authentic Italian cuisine with delivery service.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side navigation
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: React Context API for cart management
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript throughout the entire stack
- **API Design**: RESTful endpoints for menu items and order processing
- **Data Storage**: In-memory storage implementation with interface for future database integration
- **Session Management**: Express session handling with PostgreSQL session store configuration

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Two main tables - menu_items and orders
- **Migration System**: Drizzle Kit for schema migrations
- **Connection**: Neon Database serverless PostgreSQL

### Payment Processing
- **Provider**: Stripe payment platform
- **Integration**: Stripe Elements for secure payment forms
- **Flow**: Payment Intent creation with order validation
- **Security**: Server-side payment processing with client-side confirmation

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **Payment Processing**: Stripe API for payment intents and checkout
- **UI Framework**: Radix UI primitives for accessible components
- **Development**: Replit-specific tooling and error handling

### Third-Party Services
- **Image Hosting**: Unsplash for menu item and promotional images
- **Fonts**: Google Fonts (Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono)
- **Icons**: Lucide React icon library

### Build and Development Tools
- **TypeScript**: Full-stack type safety
- **ESBuild**: Production bundling for server code
- **PostCSS**: CSS processing with Tailwind and Autoprefixer
- **Zod**: Runtime type validation for API schemas