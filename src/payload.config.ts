// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import { Access } from './collections/Access'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Groups } from './collections/Groups'
import { Companies } from './collections/Companies'
import { Opportunities } from './collections/Opportunities'
import { People } from './collections/People'
import { Tasks } from './collections/Tasks'
import { Resources } from './collections/Resources'
import { WebServiceUsers } from './collections/WebServiceUsers'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { Workflow } from './Workflow/config'
import { plugins } from './plugins'
import { importExportPlugin } from '@payloadcms/plugin-import-export'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
    },
    dashboard: {
      widgets: [
        {
          slug: 'user-stats',
          ComponentPath: '@/components/widgets/UserStats/index.tsx',
          minWidth: 'medium',
          maxWidth: 'full',
        },
        {
          slug: 'closed-opps',
          ComponentPath: '@/components/widgets/Opportunities/closedOpps.tsx',
          minWidth: 'medium',
          maxWidth: 'full',
        },
        {
          slug: 'closed-opps-by-company',
          ComponentPath: '@/components/widgets/Opportunities/closedOppsByCompany.tsx',
          minWidth: 'medium',
          maxWidth: 'full',
        },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  defaultDepth: 2,
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  email: nodemailerAdapter({
    defaultFromAddress: 'donotreply@updateset.com',
    defaultFromName: 'Updateset',
    // Nodemailer transportOptions
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    idType: 'uuid',
    migrationDir: './src/db/migrations',
    push: true,
    blocksAsJSON: true,
  }),
  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    Access,
    Groups,
    Companies,
    Opportunities,
    People,
    Resources,
    Tasks,
    WebServiceUsers,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, Workflow],
  plugins: [
    ...plugins,
    importExportPlugin({
      collections: ['groups', 'opportunities', 'people', 'resources', 'tasks', 'companies'],
    }),
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),

  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
