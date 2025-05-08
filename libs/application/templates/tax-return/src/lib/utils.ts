import { z } from 'zod'
import { FAST_TRACK_DAYS } from './constants'
import { MessageDescriptor } from 'react-intl'
import { BaseEntityType } from './dataSchema'
import format from 'date-fns/format'
import is from 'date-fns/locale/is'
import parseISO from 'date-fns/parseISO'

export const formatDate = (date: string, f = 'dd.MM.yyyy') => {
  return format(parseISO(date), f, {
    locale: is,
  })
}

export const parseZodIssue = (issue: z.ZodCustomIssue) => {
  const path = issue.path.join('.')
  return {
    message: issue?.params as MessageDescriptor,
  }
}

export const numberFormat = (value: number): string =>
  value
    .toString()
    .split('.')[0] // remove decimals
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')

export const amountFormat = (value?: number | null): string =>
  typeof value === 'number' ? numberFormat(value) + ' kr.' : ''

export const sumOfBaseEntity = (baseEntities?: BaseEntityType[]) => {
  if (!baseEntities) {
    return ''
  }
  return amountFormat(
    baseEntities?.reduce((acc, item) => {
      return acc + (Number(item.value) || 0)
    }, 0) || 0,
  )
}
