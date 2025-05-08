import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import {
  AlertMessage,
  Box,
  Bullet,
  BulletList,
  Text,
} from '@island.is/island-ui/core'
import { tax, confirmation } from '../lib/messages'
import { TaxFieldBaseProps } from '../lib/types'
import format from 'date-fns/format'
import locale from 'date-fns/locale/is'

export const ConfirmationScreen = ({ application }: TaxFieldBaseProps) => {
  const { formatMessage: f } = useLocale()

  const { externalData } = application
  const date =
    externalData.postApplication?.data.timestamp ?? new Date().toISOString()

  const formattedDate = format(new Date(date), 'd.MMM yyyy', { locale })
  const formattedHours = format(new Date(date), 'HH:mm', { locale })
  console.log(externalData)

  return (
    <FormScreen title={f(tax.confirmationTitle)}>
      <Box>
        <AlertMessage
          title={f(confirmation.received)}
          message={f(confirmation.alert, {
            br: <br />,
            date: `${formattedDate} kl. ${formattedHours}`,
            number: externalData.postApplication?.data.id,
          })}
          type="success"
        />

        <Box marginTop={6}>
          <Text variant="h3"> {f(confirmation.whatHappensNext)}</Text>
          <Box marginTop={2}>
            <Text>{f(confirmation.disclaimer)}</Text>
          </Box>
          <Box marginTop={4}>
            <BulletList space={2}>
              <Bullet>
                <Text>{f(confirmation.results)}</Text>
              </Bullet>
              <Bullet>
                <Text>{f(confirmation.returnTooHigh)}</Text>
              </Bullet>
              <Bullet>
                <Text>{f(confirmation.notificationWhenAvailable)}</Text>
              </Bullet>
            </BulletList>
          </Box>
        </Box>
      </Box>
    </FormScreen>
  )
}
