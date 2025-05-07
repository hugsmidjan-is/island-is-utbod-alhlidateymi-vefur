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

export const ConfirmationScreen = () => {
  const { formatMessage: f } = useLocale()

  return (
    <FormScreen title={f(tax.confirmationTitle)}>
      <Box>
        <AlertMessage
          title={f(confirmation.received)}
          message={f(confirmation.alert, {
            br: <br />,
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
