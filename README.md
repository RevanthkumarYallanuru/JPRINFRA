# JPR INFRAWORKS - Construction & Infrastructure Website

## Project Overview

This is a modern, responsive website for JPR INFRAWORKS, a leading construction and infrastructure development company. The website showcases services, projects, and provides contact information for potential clients.

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library for building user interfaces
- **React Router** - Client-side routing
- **shadcn-ui** - High-quality component library
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack Query** - Data fetching and state management

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
cd jpr-infrabuild
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production

```sh
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```sh
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable React components
├── pages/          # Page components
├── lib/            # Utility functions and data
├── assets/         # Images and static assets
├── hooks/          # Custom React hooks
└── App.tsx         # Main application component
```

## Configuration

All company information, contact details, and content can be updated from a single file:

**`src/lib/data.ts`** - Centralized configuration file containing:
- Company information
- Contact details
- Navigation links
- Services
- Social media links
- SEO metadata

Update this file to change website content without searching through multiple components.

## Features

- Responsive design for all devices
- Modern UI with smooth animations
- Contact form with validation
- Project showcase
- Service listings
- About page with company information
- Quotation request page

## Development

### Linting

```sh
npm run lint
```

## License

© 2024 JPR INFRAWORKS. All rights reserved.
