import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import { tax } from '../lib/messages'
import { InputFields, OJOIFieldBaseProps } from '../lib/types'
import { IncomeGroupTable } from '../components/IncomeGroupTable/IncomeGroupTable'
export const CapitalIncomeScreen = ({
  application,
  goToScreen,
}: OJOIFieldBaseProps) => {
  const { formatMessage: f } = useLocale()
  const { externalData } = application
  return (
    <FormScreen
      goToScreen={goToScreen}
      title={f(tax.capitalIncomeTitleYr)}
      intro={f(tax.capitalIncomeTitle)}
    >
      Fjármagnstekjur???
    </FormScreen>
  )
}
