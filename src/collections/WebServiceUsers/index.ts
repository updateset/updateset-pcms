import type { CollectionConfig } from 'payload'

export const WebServiceUsers: CollectionConfig = {
  slug: 'webServiceUsers',
  auth: {
    useAPIKey: true,
  },
  fields: [],
  timestamps: true,
}
