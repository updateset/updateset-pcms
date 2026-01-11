import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { createAcl } from '@/access/createAcl'
import { updateAcl } from '@/access/updateAcl'
import { deleteAcl } from '@/access/deleteAcl'
import { workflow } from '@/hooks/workflow'

export const Tasks: CollectionConfig<'tasks'> = {
  slug: 'tasks',
  access: {
    create: ({ req }) => createAcl(req, 'tasks'),
    delete: ({ req }) => deleteAcl(req, 'tasks'),
    read: authenticatedOrPublished,
    update: ({ req }) => updateAcl(req, 'tasks'),
  },
  defaultPopulate: { assignedTo: true, opportunity: true },
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
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
    },
  ],
  hooks: {
    afterChange: [workflow],
  },
  versions: {
    maxPerDoc: 50,
    drafts: false,
  },
  timestamps: true,
}
