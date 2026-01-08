import type { FieldHook } from 'payload'
import { APIError } from 'payload'

export const futureDate: FieldHook = async ({ value, operation, field, previousValue }) => {
  if ((operation === 'create') || (operation === 'update' && (previousValue == '' || previousValue == null))) {
    var inputDate = new Date(value)
    if (inputDate && inputDate < new Date()) {
      throw new APIError(`${field.label} cannot be in the past`, 400, value, true)
    }
  }

  return value
}