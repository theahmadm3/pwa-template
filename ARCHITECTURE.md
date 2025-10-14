# Architecture Diagram

## Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      Root Layout (layout.tsx)                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ PWA Installation Logic                                │   │
│  │ - beforeinstallprompt handler                        │   │
│  │ - Device detection (mobile/touch)                    │   │
│  │ - Install button (conditional)                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                  │
│                           ▼                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Landing Page (page.tsx)                  │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  State: !showLogin                             │  │   │
│  │  │  ┌──────────────────────────────────────────┐  │  │   │
│  │  │  │  "Start the app" Button                  │  │  │   │
│  │  │  │  (with hover/tap animations)             │  │  │   │
│  │  │  └──────────────────────────────────────────┘  │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │                      ▼ (on click)                     │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  Loading State (3 seconds)                     │  │   │
│  │  │  ┌──────────────────────────────────────────┐  │  │   │
│  │  │  │  Spinner Animation                       │  │  │   │
│  │  │  │  "Real landing page is coming soon..."   │  │  │   │
│  │  │  └──────────────────────────────────────────┘  │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │                      ▼                                │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  State: showLogin                              │  │   │
│  │  │  ┌──────────────────────────────────────────┐  │  │   │
│  │  │  │  LoginForm Component                     │  │  │   │
│  │  │  │  (dynamically imported, SSR disabled)    │  │  │   │
│  │  │  └──────────────────────────────────────────┘  │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Login Component Architecture

```
┌──────────────────────────────────────────────────────────────┐
│            Login Page (auth/login/page.tsx)                  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Navigation Bar (Material-UI)                          │  │
│  │  Desktop: Location | Store | Login | Become a Shopper  │  │
│  │  Mobile:  Profile Icon | Menu Icon → Drawer           │  │
│  └────────────────────────────────────────────────────────┘  │
│                           │                                   │
│                           ▼                                   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Main Content Area                                     │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  Background Image (desktop only)                 │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  LoginForm Component (2 implementations)         │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

## Login Form Variants

### Variant 1: Motion-based (motionLogin.tsx)
```
┌─────────────────────────────────────────────┐
│  Container (h:400px, overflow:hidden)       │
│  ┌───────────────────────────────────────┐  │
│  │  Google Login Section (motion.div)    │  │
│  │  - Initial position: y=0              │  │
│  │  - Manual login: y=-100, opacity=0    │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │  Background Image (mobile)      │  │  │
│  │  │  "Welcome back!"               │  │  │
│  │  │  [Google Login Button]          │  │  │
│  │  │  [Switch to Manual Button]      │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
│  ┌───────────────────────────────────────┐  │
│  │  Manual Login Section (motion.div)    │  │
│  │  - Initial position: y=100, opacity=0 │  │
│  │  - Manual login: y=0, opacity=1       │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │  [Email Input]                  │  │  │
│  │  │  [Password Input]               │  │  │
│  │  │  "Forgot password?"             │  │  │
│  │  │  [Proceed Button]               │  │  │
│  │  │  [Switch to Google Button]      │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Variant 2: Scroll-based (login.tsx)
```
┌─────────────────────────────────────────────┐
│  Container (scrollable, h:400px)            │
│  ┌───────────────────────────────────────┐  │
│  │  Google Login Section                 │  │
│  │  (scroll position: top)               │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │  Background Image (mobile)      │  │  │
│  │  │  "Welcome back!"               │  │  │
│  │  │  [Google Login Button]          │  │  │
│  │  │  [Scroll to Manual Button]      │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
│  │                                           │
│  │  (scroll transition)                     │
│  │                                           │
│  ▼                                           │
│  ┌───────────────────────────────────────┐  │
│  │  Manual Login Section                 │  │
│  │  (scroll position: after first section)│ │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │  "Log in"                       │  │  │
│  │  │  [Email Input]                  │  │  │
│  │  │  [Password Input]               │  │  │
│  │  │  "Forgot password?"             │  │  │
│  │  │  [Proceed Button]               │  │  │
│  │  │  [Scroll to Google Button]      │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

## PWA Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      Browser / OS                             │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  beforeinstallprompt Event                             │  │
│  └────────────────────────────────────────────────────────┘  │
│                           │                                   │
│                           ▼                                   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  React App (layout.tsx)                                │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  Event Handlers:                                 │  │  │
│  │  │  - handleBeforeInstallPrompt (stores event)      │  │  │
│  │  │  - handleAppInstalled (updates state)            │  │  │
│  │  │  - checkStandalone (detects PWA mode)            │  │  │
│  │  │  - checkMobile (detects mobile device)           │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │                        │                                │  │
│  │                        ▼                                │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  Conditional Install Button                      │  │  │
│  │  │  Shown when:                                     │  │  │
│  │  │  - isMobile = true                               │  │  │
│  │  │  - deferredPrompt exists                         │  │  │
│  │  │  - !isAppInstalled                               │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
│                           │                                   │
│                           ▼                                   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Service Worker (sw.js)                                │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  Workbox Configuration:                          │  │  │
│  │  │  - Cache destination: public/                    │  │  │
│  │  │  - Auto-registration: enabled                    │  │  │
│  │  │  - Skip waiting: enabled                         │  │  │
│  │  │  - Max file size: 10MB                           │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
│                           │                                   │
│                           ▼                                   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  PWA Manifest (manifest.json)                          │  │
│  │  - Name: shoppergetit                                  │  │
│  │  - Theme: #3c7fec                                      │  │
│  │  - Display: standalone                                 │  │
│  │  - Icons: 512x512 (maskable & rounded)                │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow

```
User Action                 React State              UI Update
─────────────────────────────────────────────────────────────
Click "Start app"    →    isLoading = true     →    Show spinner
                                                      (3 seconds)
                                                           ▼
Timer completes      →    isLoading = false    →    Hide spinner
                          showLogin = true           Show LoginForm
                                                           ▼
Click "Switch"       →    isManualLogin = true →    Transition to
(motion variant)                                     manual login
                                                     (y: 0→100)
                                                           ▼
OR Click "Switch"    →    Trigger scroll       →    Smooth scroll
(scroll variant)                                     to manual section

Install Button Click →    Call prompt()        →    Show system
                          Wait for choice           install dialog
                                                           ▼
User accepts         →    isAppInstalled=true  →    Hide install
                                                     button
```

## Component Hierarchy

```
RootLayout (layout.tsx)
│
├─── HTML Head
│    ├─── manifest.json link
│    ├─── apple-mobile-web-app-capable meta
│    ├─── apple-touch-icon link
│    └─── theme-color meta
│
├─── Body
│    ├─── {children} (page content)
│    │    │
│    │    └─── LandingPage (page.tsx)
│    │         ├─── Start Button (motion)
│    │         ├─── Loading Spinner (motion)
│    │         └─── LoginForm (dynamic import)
│    │              │
│    │              └─── Login (auth/login/page.tsx)
│    │                   ├─── AppBar (MUI)
│    │                   ├─── Drawer (MUI)
│    │                   ├─── Background Image
│    │                   └─── LoginForm (ui/login.tsx)
│    │                        OR
│    │                   └─── MotionLoginForm (motionLogin.tsx)
│    │
│    └─── Install Button (conditional)
│
└─── Service Worker Registration (automatic)
```

## Technology Integration Map

```
┌────────────────────────────────────────────────────┐
│              Application Layers                     │
├────────────────────────────────────────────────────┤
│  UI Layer:                                         │
│  ┌──────────────────────────────────────────────┐ │
│  │ React 19 Components                          │ │
│  │ Material-UI Components                       │ │
│  │ Motion Animations                            │ │
│  └──────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────┤
│  Styling Layer:                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │ Tailwind CSS (utility classes)               │ │
│  │ Emotion (CSS-in-JS for MUI)                  │ │
│  │ Custom CSS (globals.css)                     │ │
│  │ Google Fonts (Comfortaa)                     │ │
│  └──────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────┤
│  Framework Layer:                                  │
│  ┌──────────────────────────────────────────────┐ │
│  │ Next.js 15 (App Router)                      │ │
│  │ TypeScript (type safety)                     │ │
│  │ ESLint (code quality)                        │ │
│  └──────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────┤
│  PWA Layer:                                        │
│  ┌──────────────────────────────────────────────┐ │
│  │ next-pwa (PWA configuration)                 │ │
│  │ Workbox (service worker)                     │ │
│  │ Web App Manifest                             │ │
│  └──────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────┘
```

---

*This diagram supplements the detailed commit report (COMMIT_REPORT.md)*
