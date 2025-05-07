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

export const countDaysAgo = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  return Math.floor(diff / (1000 * 3600 * 24))
}

type IsHolidayMap = Record<string, true | undefined>
const holidayCache: Record<number, IsHolidayMap | undefined> = {}

export const getEmptyMember = () => ({
  name: '',
  above: '',
  after: '',
  before: '',
  below: '',
})

export enum TitlePrefix {
  Appendix = 'Viðauki',
  Attachment = 'Fylgiskjal',
}

export const parseZodIssue = (issue: z.ZodCustomIssue) => {
  const path = issue.path.join('.')
  return {
    // name: getValueViaPath(RequiredInputFieldsNames, path) as string,
    message: issue?.params as MessageDescriptor,
  }
}

export const getFastTrack = (date?: Date) => {
  const now = new Date()
  if (!date)
    return {
      fastTrack: false,
      now,
    }

  const diff = date.getTime() - now.getTime()
  const diffDays = diff / (1000 * 3600 * 24)
  let fastTrack = false

  if (diffDays <= FAST_TRACK_DAYS) {
    fastTrack = true
  }
  return {
    fastTrack,
    now,
  }
}

export const base64ToBlob = (base64: string, mimeType = 'application/pdf') => {
  if (!base64) {
    return null
  }

  const byteCharacters = Buffer.from(base64, 'base64')
  return new Blob([byteCharacters], { type: mimeType })
}

export const convertNumberToRoman = (num: number) => {
  const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  return roman[num - 1]
}

export const cleanTypename = (obj: {
  __typename?: string
  id: string
  title: string
  slug: string
}) => {
  const { __typename: _, ...rest } = obj
  return rest
}

export const capitalizeText = (text?: string | null): string => {
  if (!text) {
    return ''
  }

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
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
