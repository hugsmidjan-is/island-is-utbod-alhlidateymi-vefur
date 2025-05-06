import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import { tax } from '../lib/messages'
import { OJOIFieldBaseProps } from '../lib/types'
export const EndOfYearScreen = (props: OJOIFieldBaseProps) => {
  const { formatMessage: f } = useLocale()

  return (
    <FormScreen
      goToScreen={props.goToScreen}
      title={f(tax.lastIncomeTitle)}
      intro={f(tax.lastIncomeIntro)}
    >
      <p>End of year screen</p>
    </FormScreen>
  )
}
