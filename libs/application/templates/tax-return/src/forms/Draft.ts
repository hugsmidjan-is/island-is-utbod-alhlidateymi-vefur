import {
  buildCustomField,
  buildForm,
  buildSection,
  buildSubmitField,
} from '@island.is/application/core'
import { Form, FormModes } from '@island.is/application/types'
import { Routes } from '../lib/constants'
import { tax } from '../lib/messages'
export const Draft: Form = buildForm({
  id: 'OfficialJournalOfIcelandApplication',
  title: tax.applicationName,
  mode: FormModes.IN_PROGRESS,
  renderLastScreenBackButton: true,
  renderLastScreenButton: true,
  children: [
    buildSection({
      id: Routes.GENERAL_INFO,
      title: tax.generalInfoTitle,
      children: [
        buildCustomField({
          id: Routes.GENERAL_INFO,
          component: 'GeneralInfoScreen',
        }),
      ],
    }),
    buildSection({
      id: Routes.INCOME_LAST_YEAR,
      title: tax.lastIncomeTitle,
      children: [
        buildCustomField({
          id: Routes.INCOME_LAST_YEAR,
          component: 'IncomeLastYearScreen',
        }),
      ],
    }),
    buildSection({
      id: Routes.CAPITAL_INCOME,
      title: tax.capitalIncomeTitle,
      children: [
        buildCustomField({
          id: 'attachments',
          component: 'CapitalIncomeScreen',
        }),
      ],
    }),
    buildSection({
      id: Routes.END_OF_YEAR,
      title: tax.endOfYearTitle,
      children: [
        buildCustomField({
          id: 'preview',
          component: 'EndOfYearScreen',
        }),
      ],
    }),
    buildSection({
      id: Routes.INTEREST_CHARGES,
      title: tax.interestChargesTitle,
      children: [
        buildCustomField({
          id: Routes.INTEREST_CHARGES,
          component: 'InterestChargesScreen',
        }),
        buildCustomField({
          id: Routes.SECOND_INTEREST_CHARGES,
          component: 'SecondInterestChargesScreen',
        }),
      ],
    }),
    // buildSection({
    //   id: Routes.SUMMARY,
    //   title: summary.general.section,
    //   children: [
    //     buildMultiField({
    //       id: Routes.SUMMARY,
    //       children: [
    //         buildCustomField({
    //           id: Routes.SUMMARY,
    //           component: 'SummaryScreen',
    //         }),
    //         buildSubmitField({
    //           id: 'toComplete',
    //           placement: 'footer',
    //           refetchApplicationAfterSubmit: true,
    //           actions: [
    //             {
    //               event: DefaultEvents.SUBMIT,
    //               name: general.submitApplication,
    //               type: 'primary',
    //             },
    //           ],
    //         }),
    //       ],
    //     }),
    //   ],
    // }),
  ],
})
