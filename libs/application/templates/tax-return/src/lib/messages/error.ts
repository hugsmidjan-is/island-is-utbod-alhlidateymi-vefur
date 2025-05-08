import { defineMessages } from 'react-intl'

export const errorMessages = defineMessages({
  email: {
    id: 'tax.application:error.email',
    defaultMessage: 'Athugaðu hvort netfang sé rétt slegið inn',
    description: 'Error message when email is invalid or not present',
  },
  phone: {
    id: 'tax.application:error.phone',
    defaultMessage: 'Athugaðu hvort símanúmer sé rétt slegið inn',
    description: 'Error message when phone is invalid or not present',
  },
})
