import {
  buildCustomField,
  buildForm,
  buildSection,
} from '@island.is/application/core'
import { Form, FormModes } from '@island.is/application/types'
import { Routes } from '../lib/constants'
import { tax } from '../lib/messages'
export const Rejected: Form = buildForm({
  id: 'OfficialJournalOfIcelandAdvertOfIcelandApplication',
  title: 'Skilyrði',
  mode: FormModes.REJECTED,
  renderLastScreenBackButton: true,
  renderLastScreenButton: true,
  children: [
    buildSection({
      id: Routes.GENERAL_INFO,
      title: tax.generalInfoTitle,
      children: [],
    }),
    buildSection({
      id: Routes.INCOME_LAST_YEAR,
      title: tax.lastIncomeTitle,
      children: [],
    }),
    buildSection({
      id: Routes.CAPITAL_INCOME,
      title: tax.capitalIncomeTitle,
      children: [],
    }),
    buildSection({
      id: Routes.END_OF_YEAR,
      title: tax.endOfYearTitle,
      children: [],
    }),
    buildSection({
      id: Routes.INTEREST_CHARGES,
      title: tax.interestChargesTitle,
      children: [],
    }),
    buildSection({
      id: Routes.REJECTED,
      title: 'Umsókn hafnað',
      children: [
        buildCustomField({
          id: 'rejected',
          component: 'RejectScreen',
        }),
      ],
    }),
  ],
})
