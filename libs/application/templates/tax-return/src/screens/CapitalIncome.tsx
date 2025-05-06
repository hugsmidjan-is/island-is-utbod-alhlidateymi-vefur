import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import { tax } from '../lib/messages'
import { OJOIFieldBaseProps } from '../lib/types'
export const CapitalIncomeScreen = (props: OJOIFieldBaseProps) => {
  const { formatMessage: f } = useLocale()

  return (
    <FormScreen
      goToScreen={props.goToScreen}
      title={f(tax.lastIncomeTitle)}
      intro={f(tax.lastIncomeIntro)}
    >
      <p>CapitalIncomeScreen</p>
    </FormScreen>
  )
}
