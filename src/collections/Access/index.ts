import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'

export const Access: CollectionConfig<'access'> = {
  slug: 'access',
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOnly,
    update: adminOnly,
  },

  defaultPopulate: {
    collection: true,
  },

  admin: {
    defaultColumns: ['collection', 'updatedAt'],
    useAsTitle: 'collection',
  },
  fields: [
    {
      name: 'collection',
      type: 'select',
      unique: true,
      index: true,
      options: [
        { label: 'Access', value: 'access' },
        { label: 'Categories', value: 'categories' },
        { label: 'Groups', value: 'groups' },
        { label: 'Media', value: 'media' },
        { label: 'Pages', value: 'pages' },
        { label: 'Posts', value: 'posts' },
        { label: 'Users', value: 'users' },
      ],
      required: true,
    },
    {
      name: 'create',
      type: 'array',
      fields: [
        {
          name: 'group',
          type: 'relationship',
          relationTo: 'groups',
        },
      ],
    },
    {
      name: 'read',
      type: 'array',
      fields: [
        {
          name: 'group',
          type: 'relationship',
          relationTo: 'groups',
        },
      ],
    },
    {
      name: 'update',
      type: 'array',
      fields: [
        {
          name: 'group',
          type: 'relationship',
          relationTo: 'groups',
        },
      ],
    },
    {
      name: 'delete',
      type: 'array',
      fields: [
        {
          name: 'group',
          type: 'relationship',
          relationTo: 'groups',
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
