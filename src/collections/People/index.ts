import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { createAcl } from '@/access/createAcl'
import { updateAcl } from '@/access/updateAcl'
import { deleteAcl } from '@/access/deleteAcl'

export const People: CollectionConfig<'people'> = {
  slug: 'people',
  access: {
    create: ({ req, id }) => createAcl(req, 'people'),
    delete: ({ req, id }) => deleteAcl(req, 'people'),
    read: authenticatedOrPublished,
    update: ({ req, id }) => updateAcl(req, 'people'),
  },
  defaultPopulate: {},
  admin: {
    defaultColumns: ['firstName', 'updatedAt'],
    useAsTitle: 'firstName',
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'jobTitle',
      type: 'text',
    },
    {
      name: 'phoneNumber',
      type: 'text',
    },
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
      required: true,
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
  versions: {
    maxPerDoc: 50,
    drafts: false,
  },
  timestamps: true,
}
