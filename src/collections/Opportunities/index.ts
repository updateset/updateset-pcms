import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { createAcl } from '@/access/createAcl'
import { updateAcl } from '@/access/updateAcl'
import { deleteAcl } from '@/access/deleteAcl'
import { computeTotal } from './hooks/computeTotal'

export const Opportunities: CollectionConfig<'opportunities'> = {
  slug: 'opportunities',
  access: {
    create: ({ req }) => createAcl(req, 'opportunities'),
    delete: ({ req }) => deleteAcl(req, 'opportunities'),
    read: authenticatedOrPublished,
    update: ({ req }) => updateAcl(req, 'opportunities'),
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {},
  admin: {
    defaultColumns: ['name', 'company', 'updatedAt'],
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
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
      required: true,
    },
    {
      name: 'totalValue',
      type: 'number',
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
      name: 'dueDate',
      type: 'date',
    },
    {
      name: 'awardDate',
      type: 'date',
    },
    {
      name: 'startDate',
      type: 'date',
    },
    {
      name: 'stage',
      type: 'select',
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'Screening',
          value: 'screening',
        },
        {
          label: 'Meeting',
          value: 'meeting',
        },
        {
          label: 'Proposal',
          value: 'proposal',
        },
        {
          label: 'Customer',
          value: 'customer',
        },
        {
          label: 'Closed',
          value: 'closed',
        },
        {
          label: 'Rejected',
          value: 'rejected',
        },
      ],
    },
    {
      name: 'pointOfContact',
      type: 'relationship',
      relationTo: 'people',
      required: true,
    },
    {
      name: 'services',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'text',
          required: true,
        },
        {
          name: 'module',
          type: 'text',
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
          name: 'amount',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'resell',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'text',
          required: true,
        },
        {
          name: 'module',
          type: 'text',
        },
        {
          name: 'sku',
          type: 'text',
        },
        {
          name: 'amount',
          type: 'number',
          required: true,
        },
        {
          name: 'margin',
          type: 'number',
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
          name: 'reoccurring',
          type: 'checkbox',
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [computeTotal],
  },
  versions: {
    maxPerDoc: 50,
    drafts: false,
  },
  timestamps: true,
}
