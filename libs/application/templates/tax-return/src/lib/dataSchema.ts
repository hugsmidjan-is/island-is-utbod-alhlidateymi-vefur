import { z } from 'zod'

export const additionSchema = z.array(
  z
    .object({
      id: z.string().optional(),
      title: z.string().optional(),
      content: z.string().optional(),
      type: z.enum(['html', 'file']).optional(),
    })
    .partial(),
)

export const memberItemSchema = z
  .object({
    name: z.string().optional(),
    before: z.string().optional(),
    below: z.string().optional(),
    above: z.string().optional(),
    after: z.string().optional(),
  })
  .partial()

export const membersSchema = z.array(memberItemSchema).optional()

const signatureRecordItemSchema = z.object({
  institution: z.string().optional(),
  signatureDate: z.string().optional(),
  chairman: memberItemSchema.optional(),
  members: membersSchema.optional(),
  additional: z.string().optional(),
})

const signatureRecordSchema = z.object({
  records: z.array(signatureRecordItemSchema).optional(),
})

export const regularSignatureItemSchema = z
  .object({
    date: z.string().optional(),
    institution: z.string().optional(),
    members: membersSchema.optional(),
    html: z.string().optional(),
  })
  .partial()

export const baseEntitySchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
})

export const channelSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
  })
  .partial()

const generalInfoSchema = z
  .object({
    user: z.object({
      name: z.string().optional(),
      nationalId: z.string().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
    }),
    contact: z.object({
      email: z.string().optional(),
      phone: z.string().optional(),
    }),
  })
  .partial()

export const partialSchema2 = z.object({
  generalInfo: generalInfoSchema.optional(),
})

// export type partialSchema = z.infer<typeof partialSchema>
export type partialSchema2 = z.infer<typeof partialSchema2>

export type SignatureMemberKey = keyof z.infer<typeof memberItemSchema>
export type SignatureInstitutionKey = keyof Pick<
  z.infer<typeof signatureRecordItemSchema>,
  'institution' | 'signatureDate' | 'additional'
>

export type SignatureRecordSchema = z.infer<typeof signatureRecordItemSchema>

export type SignatureMemberSchema = z.infer<typeof memberItemSchema>
export type SignatureSchema = z.infer<typeof signatureRecordSchema>
