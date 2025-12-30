import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { createAcl } from '@/access/createAcl'
import { updateAcl } from '@/access/updateAcl'
import { deleteAcl } from '@/access/deleteAcl'
import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: ({ req, id }) => createAcl(req, 'categories'),
    delete: ({ req, id }) => deleteAcl(req, 'categories'),
    read: anyone,
    update: ({ req, id }) => updateAcl(req, 'categories'),
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      position: undefined,
    }),
  ],
  timestamps: true,
}
