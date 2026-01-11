import type { GlobalConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'
import { collectionChoices } from '@/utilities/collectionChoices'

export const Workflow: GlobalConfig = {
    slug: 'workflow',
    access: {
        read: () => true,
        update: adminOnly,
    },
    fields: [
        {
            name: 'collections',
            type: 'array',
            fields: [
                {
                    name: 'collection',
                    type: 'select',
                    options: collectionChoices,
                },
                {
                    name: 'path',
                    type: 'text',
                },
            ],
        },
    ],
}
