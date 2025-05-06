import { buildForm, buildSection } from '@island.is/application/core'
import { Form, FormModes } from '@island.is/application/types'
import { Routes } from '../lib/constants'
import { tax } from '../lib/messages'
import { complete } from '../lib/messages/complete'
import { buildFormConclusionSection } from '@island.is/application/ui-forms'
export const Complete: Form = buildForm({
  id: 'OfficialJournalOfIcelandAdvertOfIcelandApplication',
  title: 'Skilyrði',
  mode: FormModes.COMPLETED,
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
    buildFormConclusionSection({
      multiFieldTitle: complete.general.title,
      expandableDescription: complete.general.bullets,
    }),
  ],
})
