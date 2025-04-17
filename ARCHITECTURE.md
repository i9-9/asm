# ASM Studio Website Architecture

## Technology Stack

- **Framework**: Next.js 15.1.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Data Handling**: Static JSON files
- **Deployment**: Vercel

## Application Structure

### Directory Structure

```
asm/
├── app/                      # Next.js App Directory
│   ├── components/           # Reusable UI components
│   ├── projects/             # Dynamic project routes
│   │   └── [project]/        # Dynamic route for individual projects
│   └── page.tsx              # Home page
├── data/                     # Data files
│   └── projects/             # Project data in JSON format
├── public/                   # Static assets
│   ├── fonts/                # Custom fonts
│   ├── icons/                # SVG icons
│   │   └── icons2/           # Additional icons for animations
│   ├── img/                  # General images
│   ├── marquee-vertical/     # Marquee assets
│   ├── misc/                 # Miscellaneous assets
│   └── projects/             # Project-specific images
│       └── kostume/          # Images for the Kostüme project
└── tailwind.config.ts        # Tailwind configuration
```

## Key Components

### Core Layout Components

- **Navbar**: Navigation component with dynamic logo behavior, time display, and mega menu.
- **ModulosLogo**: SVG logo with animation states and theme support.
- **AnimatedIcons**: Icon animations for the mega menu with various transition effects.
- **SplashScreen**: Initial loading screen with animations.

### Page Sections

- **HeroNew/Hero**: Homepage hero section with the main logo and theme toggle.
- **AboutSection**: Company information with animated text appearance.
- **ProjectsSection**: Showcases selected works with hover interactions.
- **ContactSection**: Contact information with pixel background and "hacker" text effect.

### Project Display

- **ProjectTemplate**: Template for displaying individual project details.
- **Dynamic Routing**: Uses Next.js App Router's dynamic routes for individual project pages.

## Data Flow

1. **Static Data**: Projects and content are stored in JSON files in the `data/projects/` directory.
2. **Server-Side Data Fetching**: Using Next.js App Router's data fetching mechanisms.
3. **Dynamic Rendering**: Project pages are generated based on available JSON files.

## Theme System

- **Dual Theme**: Supports dark and light themes.
- **Theme Storage**: Theme preference is stored in localStorage.
- **Theme Toggle**: User-controlled theme switching with animated toggle.
- **CSS Variables**: Theme colors are defined as CSS variables.

## Animation Strategy

- **Scroll-Based Animations**: Elements animate as they come into view.
- **Interactive Animations**: Hover effects and click animations for enhanced interactivity.
- **Page Transitions**: Smooth transitions between sections and pages.
- **Logo Animations**: Special attention to logo animations for branding.

## Responsive Design

- **Mobile-First Approach**: All components are designed with mobile compatibility.
- **Grid System**: Uses Tailwind's grid system with 4-column mobile and 12-column desktop layouts.
- **Adaptive Content**: Content adapts to different screen sizes while maintaining visual integrity.

## Performance Considerations

- **Static Generation**: Project pages are statically generated for performance.
- **Optimized Images**: Image components use Next.js Image for optimization.
- **Code Splitting**: Automatic code splitting through Next.js.
- **Minimal JavaScript**: CSS animations and transitions used where possible to reduce JS load. 

## Design System Standards

### Spacing and Margins
- **Global Margins**: Consistent horizontal padding of `px-[30px]` across all main sections.
- **Component Spacing**: Standardized gap of `gap-[20px]` between related elements.
- **Vertical Rhythm**: Consistent spacing between sections using multiples of the base spacing unit.

### Colors
- **Light Theme**: 
  - Background: `#F3F1E4` (warm off-white)
  - Text: Various dark colors
  - Accent: `#DB4C40` (brand red)
- **Dark Theme**:
  - Background: `#202021` (dark charcoal)
  - Text: Light colors 
  - Accent: Same brand red `#DB4C40` 