import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { createAcl } from '@/access/createAcl'
import { updateAcl } from '@/access/updateAcl'
import { deleteAcl } from '@/access/deleteAcl'
import { computeName } from './hooks/computeName'

export const Resources: CollectionConfig<'resources'> = {
  slug: 'resources',
  access: {
    create: ({ req, id }) => createAcl(req, 'resources'),
    delete: ({ req, id }) => deleteAcl(req, 'resources'),
    read: authenticatedOrPublished,
    update: ({ req, id }) => updateAcl(req, 'resources'),
  },
  defaultPopulate: {},
  admin: {
    defaultColumns: ['employee', 'opportunity', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      access: {
        read: () => {
          return true
        },
        update: () => {
          return false
        },
      },
    },
    {
      name: 'employee',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'opportunity',
      type: 'relationship',
      relationTo: 'opportunities',
      required: true,
    },
    {
      name: 'rateReceived',
      type: 'number',
      required: true,
    },
    {
      name: 'ratePaid',
      type: 'number',
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
  hooks: {
    beforeValidate: [computeName],
  },
  versions: {
    maxPerDoc: 50,
    drafts: false,
  },
}
