import {
  buildCustomField,
  buildForm,
  buildMultiField,
  buildSection,
  buildSubmitField,
} from '@island.is/application/core'
import { DefaultEvents, Form, FormModes } from '@island.is/application/types'
import { Routes } from '../lib/constants'
import { tax, requirements } from '../lib/messages'

export const Requirements: Form = buildForm({
  id: 'OfficialJournalOfIcelandApplication',
  title: tax.applicationName,
  mode: FormModes.NOT_STARTED,
  children: [
    buildSection({
      id: Routes.REQUIREMENTS,
      title: tax.dataRequirements,
      children: [
        buildMultiField({
          id: Routes.REQUIREMENTS,
          children: [
            buildCustomField({
              id: Routes.REQUIREMENTS,
              component: 'RequirementsScreen',
            }),
            buildSubmitField({
              id: 'continueFromRequirements',
              refetchApplicationAfterSubmit: true,
              actions: [
                {
                  event: DefaultEvents.SUBMIT,
                  name: requirements.buttons.continue,
                  type: 'primary',
                },
              ],
            }),
          ],
        }),
        buildMultiField({
          id: '',
          children: [],
        }),
      ],
    }),
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
    // buildSection({
    //   id: Routes.CAPITAL_INCOME,
    //   title: tax.capitalIncomeTitle,
    //   children: [],
    // }),
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
  ],
})
