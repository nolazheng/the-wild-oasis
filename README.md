# The Wild Oasis: Luxury Cabin Reservation System

<img width="60" src="/public/logo.png" alt="The Wild Oasis Dashboard" />

https://the-wild-oasis-one-ruddy.vercel.app/

The Wild Oasis is a Next.js application that allows users to browse, reserve, and manage luxury cabin rentals in a beautiful natural setting.

This project is built with Next.js, React, and TypeScript, providing a modern and responsive web application for cabin rentals. It features user authentication, cabin browsing, reservation management, and a user profile system.

## Repository Structure

```
.
├── app/
│   ├── _components/
│   ├── _context/
│   ├── _hooks/
│   ├── _lib/
│   ├── _styles/
│   ├── about/
│   ├── account/
│   ├── api/
│   ├── cabins/
│   └── login/
├── public/
├── commitlint.config.ts
├── eslint.config.mjs
├── middleware.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

### Key Files:

- `app/layout.tsx`: Main application layout
- `app/page.tsx`: Home page component
- `app/_lib/auth.ts`: Authentication configuration
- `app/_lib/data-service.ts`: Data fetching and manipulation
- `app/api/`: API routes for server-side operations
- `middleware.ts`: Request middleware for authentication checks
- `next.config.ts`: Next.js configuration
- `tailwind.config.ts`: Tailwind CSS configuration

## Usage Instructions

### Installation

Prerequisites:

- Node.js (v14 or later)
- npm (v6 or later)

Steps:

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```

### Getting Started

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Configuration

The application uses environment variables for configuration. Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Replace the placeholder values with your actual configuration.

### Testing & Quality

To run the linter:

```bash
npm run lint
```

### Troubleshooting

Common issues:

1. Authentication errors:

   - Ensure that your Google OAuth credentials are correctly set up in the Google Cloud Console.
   - Verify that the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` environment variables are correctly set.

2. Supabase connection issues:

   - Check that your Supabase project is running and accessible.
   - Verify that the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables are correct.

3. Build errors:
   - Make sure all dependencies are installed by running `npm install`.
   - Clear the Next.js cache by running `npm run clean` followed by `npm run build`.

For debugging, you can enable verbose logging by setting the `DEBUG` environment variable:

```bash
DEBUG=* npm run dev
```

## Data Flow

The Wild Oasis application follows a client-server architecture with Next.js handling both client-side and server-side rendering.

1. User requests a page (e.g., /cabins)
2. Next.js server receives the request
3. Middleware checks for authentication if required
4. Page component fetches data from Supabase via data-service functions
5. Server renders the initial HTML
6. Client receives the HTML and hydrates the React components
7. Client-side navigation and data fetching occur for subsequent interactions

```
[Browser] <-> [Next.js Server] <-> [Supabase]
    ^                ^
    |                |
    v                v
[Client-side JS] [Server-side API Routes]
```

Note: Authentication is handled via NextAuth.js, which integrates with Google OAuth for user sign-in.

## Deployment

The Wild Oasis can be deployed to various platforms that support Next.js applications, such as Vercel or Netlify.

Prerequisites:

- A Vercel or Netlify account
- Your project's GitHub repository

Steps:

1. Connect your GitHub repository to your Vercel or Netlify account
2. Configure the build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
3. Set up the environment variables in the deployment platform's settings
4. Deploy the application

After deployment, monitor the application logs and performance metrics provided by your hosting platform to ensure smooth operation.
