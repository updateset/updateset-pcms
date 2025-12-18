import type { CollectionBeforeValidateHook } from 'payload'

export const computeTotal: CollectionBeforeValidateHook = async ({ data }) => {
  if (data) {
    let total = 0

    if (data.services && data.services.length > 0) {
      for (let i = 0; i < data.services.length; i++) {
        total += parseInt(data.services[i].amount)
      }
    }

    if (data.resell && data.resell.length > 0) {
      for (let j = 0; j < data.resell.length; j++) {
        total += parseInt(data.resell[j].amount)
      }
    }

    data.totalValue = total
  }
}
