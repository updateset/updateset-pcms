import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'

export const Groups: CollectionConfig<'groups'> = {
  slug: 'groups',
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOnly,
    update: adminOnly,
  },

  defaultPopulate: {
    name: true,
  },

  admin: {
    defaultColumns: ['name', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'Owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'users',
      type: 'array',
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          required: true,
        },
      ],
      required: true,
    },
  ],
  hooks: {},
  versions: {
    maxPerDoc: 50,
    drafts: false,
  },
  timestamps: true,
}
