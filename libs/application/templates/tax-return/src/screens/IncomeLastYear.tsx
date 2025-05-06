import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import { tax } from '../lib/messages'
import { OJOIFieldBaseProps } from '../lib/types'
import { Box, Stack, Text } from '@island.is/island-ui/core'
import { Property } from '../components/property/Property'
export const IncomeLastYearScreen = (props: OJOIFieldBaseProps) => {
  const { formatMessage: f } = useLocale()

  return (
    <FormScreen
      goToScreen={props.goToScreen}
      title={f(tax.lastIncomeTitle)}
      intro={f(tax.lastIncomeIntro)}
    >
      <Box>
        <Box marginBottom={2}>
          <Text fontWeight="semiBold" variant="h4">
            {f(tax.lastIncomeLabel)}
          </Text>
        </Box>
      </Box>
      <Stack space={0} dividers>
        <Property
          name={'Norðurljós Software ehf'}
          type={'input'}
          value="9360000"
        />
        <Property name={'Mús og merki'} type={'input'} value="960000" />
      </Stack>
      <Box>
        <Box marginBottom={2}>
          <Text fontWeight="semiBold" variant="h4">
            {f(tax.extraIncomeLabel)}
          </Text>
        </Box>
      </Box>
      <Stack space={0} dividers>
        <Property name={'Ökutækjastyrkur'} type={'input'} value="0" />
        <Property name={'Dagpeningar'} type={'input'} value="120000" />
        <Property name={'Húsnæðishlunnindi'} type={'input'} value="0" />
      </Stack>
      <Box>
        <Box marginBottom={2}>
          <Text fontWeight="semiBold" variant="h4">
            {f(tax.pensionIncomeLabel)}
          </Text>
          <Text fontWeight="semiBold" variant="h4">
            {f(tax.pensionIncomeLabelTwo)}
          </Text>
        </Box>
      </Box>
      <Stack space={0} dividers>
        <p>Insert table</p>
      </Stack>
    </FormScreen>
  )
}
