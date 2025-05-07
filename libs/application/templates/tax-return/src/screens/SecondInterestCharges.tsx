import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import { taxSecondInterestCharges } from '../lib/messages'
import { OJOIFieldBaseProps } from '../lib/types'

export const SecondInterestChargesScreen = ({
  goToScreen,
}: OJOIFieldBaseProps) => {
  const { formatMessage: f } = useLocale()
  return (
    <FormScreen
      goToScreen={goToScreen}
      title={f(taxSecondInterestCharges.title)}
      intro={f(taxSecondInterestCharges.intro)}
    >
      <p>cool</p>
    </FormScreen>
  )
}
