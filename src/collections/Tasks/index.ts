import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { createAcl } from '@/access/createAcl'
import { updateAcl } from '@/access/updateAcl'
import { deleteAcl } from '@/access/deleteAcl'

export const Tasks: CollectionConfig<'tasks'> = {
  slug: 'tasks',
  access: {
    create: ({ req, id }) => createAcl(req, 'tasks'),
    delete: ({ req, id }) => deleteAcl(req, 'tasks'),
    read: authenticatedOrPublished,
    update: ({ req, id }) => updateAcl(req, 'tasks'),
  },
  defaultPopulate: {},
  admin: {
    defaultColumns: ['title', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'dueDate',
      type: 'date',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'In Progress',
          value: 'inProgress',
        },
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Closed Complete',
          value: 'closedComplete',
        },
        {
          label: 'Closed Incomplete',
          value: 'closedIncomplete',
        },
      ],
      required: true,
    },
    {
      name: 'opportunity',
      type: 'relationship',
      relationTo: 'opportunities',
    },
  ],
  versions: {
    maxPerDoc: 50,
    drafts: false,
  },
}
