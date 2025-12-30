import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { createAcl } from '@/access/createAcl'
import { updateAcl } from '@/access/updateAcl'
import { deleteAcl } from '@/access/deleteAcl'

export const Companies: CollectionConfig<'companies'> = {
  slug: 'companies',
  access: {
    create: ({ req, id }) => createAcl(req, 'companies'),
    delete: ({ req, id }) => deleteAcl(req, 'companies'),
    read: authenticatedOrPublished,
    update: ({ req, id }) => updateAcl(req, 'companies'),
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {},
  admin: {
    defaultColumns: ['name', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'accountOwner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'address',
          label: 'Address',
          fields: [
            {
              name: 'address',
              type: 'text',
            },
            {
              name: 'city',
              type: 'text',
            },
            {
              name: 'state',
              type: 'text',
            },
            {
              name: 'county',
              type: 'text',
            },
            {
              name: 'zip-code',
              type: 'number',
            },
          ],
        },
        {
          name: 'socialMedia',
          label: 'Social Media',
          fields: [
            {
              name: 'website',
              type: 'text',
            },
            {
              name: 'linked-in',
              type: 'text',
            },
            {
              name: 'facebook',
              type: 'text',
            },
            {
              name: 'x',
              type: 'text',
            },
            {
              name: 'instagram',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
  hooks: {},
  versions: {
    maxPerDoc: 50,
    drafts: false,
  },
  timestamps: true,
}
