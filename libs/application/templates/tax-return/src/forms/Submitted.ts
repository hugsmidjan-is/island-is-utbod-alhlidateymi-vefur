import {
  buildCustomField,
  buildForm,
  buildMultiField,
  buildSection,
} from '@island.is/application/core'
import { Form, FormModes } from '@island.is/application/types'
import { Routes } from '../lib/constants'
import { tax } from '../lib/messages'
export const Submitted: Form = buildForm({
  id: 'OfficialJournalOfIcelandApplication',
  mode: FormModes.IN_PROGRESS,
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
      id: Routes.COMPLETE,
      title: 'Umsókn lokið',
      children: [
        buildMultiField({
          children: [
            buildCustomField({
              id: 'submitted',
              component: 'SubmittedScreen',
            }),
          ],
        }),
      ],
    }),
  ],
})
