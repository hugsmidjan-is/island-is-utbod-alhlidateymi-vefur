import {
  buildDataProviderItem,
  buildExternalDataProvider,
  buildForm,
  buildSection,
  buildSubmitField,
} from '@island.is/application/core'
import { TaxReturnApi, TaxNationalRegistryApi } from '../dataProviders'
import { DefaultEvents, Form, FormModes } from '@island.is/application/types'
import { Routes } from '../lib/constants'
import { tax, requirements } from '../lib/messages'

export const Requirements: Form = buildForm({
  id: 'TaxReturnRequirementsForm',
  title: tax.applicationName,
  mode: FormModes.NOT_STARTED,
  renderLastScreenButton: true,
  children: [
    buildSection({
      id: Routes.REQUIREMENTS,
      title: tax.dataRequirements,
      children: [
        buildExternalDataProvider({
          title: requirements.general.title,
          id: 'approveExternalData',
          subTitle: requirements.general.subTitle,
          checkboxLabel: requirements.inputs.accept,
          submitField: buildSubmitField({
            id: 'submit',
            placement: 'footer',
            refetchApplicationAfterSubmit: true,
            actions: [
              {
                event: DefaultEvents.SUBMIT,
                name: 'Halda áfram',
                type: 'primary',
              },
            ],
          }),
          dataProviders: [
            buildDataProviderItem({
              provider: TaxReturnApi,
              title: requirements.general.taxProviderTitle,
              subTitle: requirements.general.taxProviderSubTitle,
            }),
            buildDataProviderItem({
              provider: TaxNationalRegistryApi,
              title: requirements.general.taxNatRegProviderTitle,
              subTitle: requirements.general.taxNatRegProviderSubTitle,
            }),
          ],
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
