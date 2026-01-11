# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Payload CMS website template built with Next.js 15, featuring a full-stack application with an admin panel and a production-ready frontend. The project is named "freeflow" and uses PostgreSQL with Vercel Blob storage.

**Stack:**
- Payload CMS 3.69.0 (headless CMS)
- Next.js 15.4.10 (App Router)
- React 19.1.0
- TypeScript 5.7.3
- PostgreSQL (via `@payloadcms/db-postgres`)
- Vercel Blob Storage for media
- TailwindCSS 4.1.18
- Lexical editor for rich text
- pnpm as package manager

## Commands

### Development
```bash
pnpm dev              # Start dev server with Turbo (http://localhost:3000)
pnpm build            # Build for production
pnpm start            # Run production server
pnpm dev:prod         # Clean build and start production locally
```

### Code Quality
```bash
pnpm lint             # Run ESLint
pnpm lint:fix         # Run ESLint with auto-fix
```

### Testing
```bash
pnpm test             # Run all tests (integration + e2e)
pnpm test:int         # Run integration tests (vitest)
pnpm test:e2e         # Run end-to-end tests (Playwright)
```

### Payload CMS
```bash
pnpm payload migrate:create    # Create a new database migration
pnpm payload migrate           # Run pending migrations
pnpm payload generate:types    # Generate TypeScript types from config
pnpm payload generate:importmap # Generate import map
```

### Database Utilities
```bash
pnpm getCollections    # Utility to extract collection slugs
pnpm dbDataTransfer    # Transfer data between databases (uses SOURCE_DB and DEST_DB env vars)
```

### Maintenance
```bash
pnpm ii               # Install dependencies (ignoring workspace)
pnpm reinstall        # Clean install (removes node_modules and lock file)
```

## Architecture

### Payload CMS Configuration

The CMS is configured in `src/payload.config.ts` and uses:
- **PostgreSQL** with UUID-based IDs
- **Migrations** stored in `src/db/migrations`
- **Push mode enabled** for development (auto-sync schema changes)
- **Blocks as JSON** for layout builder compatibility

### Custom Access Control System

This project implements a **sophisticated group-based ACL system** that goes beyond Payload's built-in access control:

**Key Collections:**
- `Access`: Defines CRUD permissions per collection mapped to groups
- `Groups`: User groups with owners and members
- `Users`: Auth-enabled users with admin flag and group membership

**How ACLs Work:**
1. Most collections use `createAcl`, `updateAcl`, `deleteAcl` functions in their access config
2. These functions check if the user belongs to groups that have permission for that operation
3. The `Access` collection stores arrays of groups for create/read/update/delete per collection
4. Admin users (`isAdmin: true`) bypass all ACL checks
5. The system uses nested queries to find user groups, then compares them against allowed groups

**Example:** Pages collection uses `createAcl(req, 'pages')` which:
- Queries `groups` collection for groups containing the user
- Queries `access` collection for the 'pages' entry
- Compares groups to determine if create permission exists

### Collections

**Core Collections:**
- `Pages`: Layout builder with blocks (Hero, CallToAction, Content, MediaBlock, Archive, FormBlock), drafts, live preview, SEO
- `Posts`: Blog posts with Lexical editor, categories, authors, related posts
- `Media`: Upload collection for images/files with Vercel Blob storage
- `Categories`: Nested taxonomy for organizing posts
- `Users`: Authentication with firstName/lastName, admin flag, email-based login

**Custom Business Collections:**
- `Companies`: Business entities with account owners, addresses, social media
- `Opportunities`: Business opportunities (ACL-protected)
- `People`: Contacts/people (ACL-protected)
- `Resources`: Resources management (ACL-protected)
- `Tasks`: Task tracking (ACL-protected)
- `WebServiceUsers`: API/service users

**Utility Collections:**
- `Access`: Group-based permissions for each collection
- `Groups`: User groups with owners and members

### Globals

- `Header`: Navigation links and header data
- `Footer`: Footer content and links

### Plugins

Configured in `src/plugins/index.ts`:
- **SEO Plugin**: Meta tags, OpenGraph, with custom generateTitle/generateURL
- **Redirects Plugin**: URL redirects for pages and posts
- **Nested Docs Plugin**: Hierarchical categories
- **Form Builder Plugin**: Dynamic forms with Lexical confirmation messages
- **Search Plugin**: Full-text search for posts with beforeSync hook
- **Import/Export Plugin**: Bulk import/export for business collections (groups, opportunities, people, resources, tasks, companies)
- **Payload Cloud Plugin**: Cloudflare caching integration

### Frontend Architecture

Located in `src/app/(frontend)`:
- Uses **Next.js App Router** with React Server Components
- **TailwindCSS 4** with shadcn/ui components
- **Layout Builder Blocks**: Each block has config (schema) and Component (render)
- **Draft Preview**: Secure preview URLs for unpublished content
- **Live Preview**: Real-time editing preview in admin panel
- **Admin Bar**: Visible when authenticated for quick admin access
- **On-demand Revalidation**: Hooks trigger Next.js revalidation on content changes

**Block Pattern:**
```
src/blocks/[BlockName]/
  config.ts     # Payload block schema
  Component.tsx # Frontend rendering component
```

### Frontend Utilities

- `getServerSideURL()`: Determines correct server URL for previews/revalidation
- `generatePreviewPath()`: Creates preview URLs with draft access tokens
- Path alias `@/*` maps to `src/*`

### Key Hooks

- `populatePublishedAt`: Auto-sets publishedAt timestamp when content is published
- `revalidatePage`, `revalidatePost`: Trigger Next.js ISR after changes
- `populateAuthors`: Populate author data for posts (bypasses user ACL for GraphQL)
- `revalidateRedirects`: Rebuild redirects after changes

### Email Configuration

Uses Nodemailer with SMTP:
- Host/port/auth configured via env vars (SMTP_HOST, SMTP_USER, SMTP_PASS)
- Default sender: donotreply@updateset.com
- Custom reset password template in `src/collections/Users/templates/resetPassword`

### Jobs Queue

Configured for scheduled publishing with:
- Cron-based execution (limited to daily on Vercel)
- Bearer token authentication via `CRON_SECRET` env var
- Allows logged-in users or cron secret to execute jobs

## Environment Variables

Required in `.env`:
```
DATABASE_URI              # PostgreSQL connection string
PAYLOAD_SECRET            # Secret for JWT tokens
BLOB_READ_WRITE_TOKEN     # Vercel Blob storage token
SMTP_HOST                 # SMTP server host
SMTP_USER                 # SMTP username
SMTP_PASS                 # SMTP password
CRON_SECRET               # Secret for cron job authentication
```

Optional:
```
VERCEL_PROJECT_PRODUCTION_URL  # Auto-set by Vercel
SOURCE_DB                      # For dbDataTransfer utility
DEST_DB                        # For dbDataTransfer utility
```

## Database Migrations

**Important:** When working with PostgreSQL:
- Schema changes require migrations in production
- Development uses `push: true` for auto-sync (no migrations needed locally)
- Always create migrations before deploying schema changes
- Run migrations on server before starting the app

**Workflow:**
1. Make schema changes in collection configs
2. Create migration: `pnpm payload migrate:create`
3. Commit migration files in `src/db/migrations/`
4. Deploy and run: `pnpm payload migrate` before `pnpm start`

## TypeScript Configuration

- Strict mode enabled
- Path aliases: `@/*` → `src/*`, `@payload-config` → `src/payload.config.ts`
- ESM modules (type: "module" in package.json)
- Target: ES2022

## Testing

- **Integration tests**: Vitest with jsdom for component testing
- **E2E tests**: Playwright with custom config in `playwright.config.ts`
- Test environment configured in `test.env` and `vitest.setup.ts`

## Seeding

Database seeding available via admin panel (destructive operation):
- Creates demo author: demo-author@payloadcms.com / password
- Populates sample pages, posts, categories

## Deployment Notes

- Built for Vercel with Vercel Postgres and Blob storage adapters
- Can also deploy to Payload Cloud (Cloudflare caching enabled)
- Self-hosting supported (VPS, DigitalOcean, etc.)
- Jobs queue limited to daily cron on Vercel (configurable for self-hosted)
- Next.js caching disabled by default (Payload Cloud uses Cloudflare caching)

## Code Patterns

### Access Control Pattern
When creating new collections that need ACL protection:
```typescript
access: {
  create: ({ req }) => createAcl(req, 'collection-slug'),
  delete: ({ req }) => deleteAcl(req, 'collection-slug'),
  read: authenticatedOrPublished,  // or custom
  update: ({ req }) => updateAcl(req, 'collection-slug'),
}
```
Then add the collection to `Access` collection's select options.

### Block Pattern
Blocks are reusable content modules:
- Define schema in `config.ts` with `slug`, `interfaceName`, `fields`
- Create React component in `Component.tsx`
- Import block config into Pages/Posts layout field

### Hooks Pattern
Common hooks locations:
- Collection-level: `hooks: { beforeChange, afterChange, afterDelete }`
- Field-level: In field config `hooks: { beforeChange }`
- Used for revalidation, data population, validation

## Notes

- All `NODE_OPTIONS=--no-deprecation` in scripts suppress Node.js warnings
- Uses `cross-env` for cross-platform environment variables
- Engine requirements: Node.js ^18.20.2 || >=20.9.0, pnpm ^9 || ^10
- Lexical is the default rich text editor (configured in `src/fields/defaultLexical.ts`)
- shadcn/ui components configured via `components.json`
