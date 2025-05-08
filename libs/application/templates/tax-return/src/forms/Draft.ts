import {
  buildCustomField,
  buildForm,
  buildMultiField,
  buildSection,
  buildSubmitField,
} from '@island.is/application/core'
import { DefaultEvents, Form, FormModes } from '@island.is/application/types'
import { Routes } from '../lib/constants'
import { tax } from '../lib/messages'
import logo from '../assets/logo'
export const Draft: Form = buildForm({
  id: 'OfficialJournalOfIcelandApplication',
  title: '',
  mode: FormModes.IN_PROGRESS,
  renderLastScreenBackButton: true,
  logo: logo,
  renderLastScreenButton: true,
  children: [
    buildSection({
      id: Routes.GENERAL_INFO,
      title: tax.generalInfoTitle,
      draftPageNumber: 1,
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
      draftPageNumber: 2,
      children: [
        buildCustomField({
          id: Routes.INCOME_LAST_YEAR,
          component: 'IncomeLastYearScreen',
        }),
      ],
    }),
    buildSection({
      id: Routes.END_OF_YEAR,
      title: tax.endOfYearTitle,
      draftPageNumber: 3,
      children: [
        buildCustomField({
          id: Routes.END_OF_YEAR,
          component: 'EndOfYearScreen',
        }),
      ],
    }),
    buildSection({
      id: Routes.INTEREST_CHARGES,
      title: tax.interestChargesTitle,
      draftPageNumber: 4,

      children: [
        buildCustomField({
          id: Routes.INTEREST_CHARGES,
          component: 'InterestChargesScreen',
        }),
        buildCustomField({
          id: Routes.INTEREST_CHARGES,
          component: 'SecondInterestChargesScreen',
        }),
      ],
    }),
    buildSection({
      id: Routes.CONFIRMATION,
      title: tax.confirmationTitle,
      draftPageNumber: 5,
      children: [
        buildMultiField({
          id: 'ConfirmationPreview',
          children: [
            buildCustomField({
              id: Routes.CONFIRMATION_PREVIEW,
              component: 'ConfirmationPreviewScreen',
            }),
            buildSubmitField({
              id: 'submit',
              placement: 'footer',
              refetchApplicationAfterSubmit: true,
              actions: [
                {
                  event: DefaultEvents.SUBMIT,
                  name: 'Senda inn framtal',
                  type: 'primary',
                },
              ],
            }),
          ],
        }),
      ],
    }),
  ],
})
