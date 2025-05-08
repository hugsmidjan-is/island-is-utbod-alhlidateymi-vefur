import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import { taxInterestCharges, taxOverviewConfirmation } from '../lib/messages'
import { InputFields, TaxFieldBaseProps } from '../lib/types'
import { Box, Column, Columns, Text } from '@island.is/island-ui/core'
import { DebtInputController } from '../components/input/DebtInputController'
import { formatDate } from '../lib/utils'
import { IncomeInterestTable } from '../components/IncomeGroupTable/IncomeInterestTable'

export const SecondInterestChargesScreen = ({
  application,
  goToScreen,
}: TaxFieldBaseProps) => {
  const { formatMessage: f } = useLocale()
  const { externalData } = application

  return (
    <FormScreen
      goToScreen={goToScreen}
      title={f(taxInterestCharges.interestChargesTitle)}
      intro={f(taxInterestCharges.interestChargesSubTitle)}
    >
      <IncomeInterestTable
        line={externalData.getTaxReturnData.data.prefill.debt.debtLines.filter(
          (item) => item.debtType.name === 'general',
        )}
      />
    </FormScreen>
  )
}
