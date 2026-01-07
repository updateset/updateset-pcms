import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { myUserRecord } from '../../access/myUserRecord'
import { computeName } from './hooks/computeName'
import ResetPassword from './templates/resetPassword'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: myUserRecord,
    delete: myUserRecord,
    read: myUserRecord,
    update: myUserRecord,
  },
  admin: {
    defaultColumns: ['email', 'name', 'updatedAt'],
    useAsTitle: 'email',
  },
  auth: {
    forgotPassword: {
      generateEmailHTML: (args) => {
        const { token } = args || {}
        // Use the token provided to allow your user to reset their password
        const resetPasswordURL = `https://www.updateset.com.com/admin/reset/${token}`
        return ResetPassword({ resetPasswordURL })
      },
    }
  },
  fields: [
    {
      name: 'email',
      type: 'text',
      required: true,
    },
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
      name: 'isAdmin',
      type: 'checkbox',
    },
  ],
  hooks: {
    beforeValidate: [computeName],
  },
  timestamps: true,
}
