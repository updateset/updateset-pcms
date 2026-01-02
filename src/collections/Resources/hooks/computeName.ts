import type { CollectionBeforeValidateHook } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'

export const computeName: CollectionBeforeValidateHook = async ({ data }) => {
  if (data) {
    const payload = await getPayload({ config })

    try {
      const user = await payload.find({
        collection: 'users',
        where: {
          id: {
            equals: data.employee,
          },
        },
        select: {
          email: true,
        },
        limit: 1,
        depth: 0,
      })

      const opportunity = await payload.find({
        collection: 'opportunities',
        where: {
          id: {
            equals: data.opportunity,
          },
        },
        select: {
          name: true,
        },
        limit: 1,
        depth: 0,
      })

      data.name = `${user.docs[0].email} - ${opportunity.docs[0].name}`
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error getting data to compute name ${error.message}`)
    }
  }
  return data
}
