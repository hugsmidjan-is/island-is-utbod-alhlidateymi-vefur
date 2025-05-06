import { Application, FieldBaseProps } from '@island.is/application/types'
import { Routes } from './constants'
import { partialSchema2 } from './dataSchema'

export const InputFields = {
  [Routes.GENERAL_INFO]: {
    user: 'generalInfo.user',
    contact: {
      email: 'generalInfo.contact.email',
      phone: 'generalInfo.contact.phone',
    },
  },
  // [Routes.ADVERT]: {
  //   department: 'advert.department',
  //   mainType: 'advert.mainType',
  //   type: 'advert.type',
  //   title: 'advert.title',
  //   html: 'advert.html',
  //   requestedDate: 'advert.requestedDate',
  //   categories: 'advert.categories',
  //   channels: 'advert.channels',
  //   message: 'advert.message',
  //   involvedPartyId: 'advert.involvedPartyId',
  //   additions: 'advert.additions',
  // },
  // [Routes.SIGNATURE]: {
  //   regular: 'signature.regular',
  //   committee: 'signature.committee',
  // },
  // [Routes.MISC]: {
  //   signatureType: 'misc.signatureType',
  //   selectedTemplate: 'misc.selectedTemplate',
  //   asDocument: 'misc.asDocument',
  //   titlePrefix: 'misc.titlePrefix',
  //   asRoman: 'misc.asRoman',
  // },
}

// export const RequiredInputFieldsNames = {
//   [Routes.ADVERT]: {
//     department: 'Deild',
//     type: 'Tegund',
//     title: 'Titill',
//     html: 'Auglýsing',
//     requestedDate: 'Útgáfudagur',
//     categories: 'Efnisflokkar',
//   },
// }

export enum TemplateApiActions {
  departments = 'getDepartments',
  types = 'getAdvertTypes',
  postApplication = 'postApplication',
}

export type NestedType<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? NestedType<T[K]>
    : string
}

export type Override<T1, T2> = Omit<T1, keyof T2> & T2

export type ErrorSchema = NestedType<partialSchema2>

export type OJOIApplication = Override<
  Application,
  {
    answers: partialSchema2
  }
>

export type OJOIFieldBaseProps = Override<
  FieldBaseProps,
  {
    application: OJOIApplication
    errors: ErrorSchema
  }
>
