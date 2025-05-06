import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import { tax } from '../lib/messages'
import { OJOIFieldBaseProps } from '../lib/types'
import { Box, Stack, Text } from '@island.is/island-ui/core'
import { Property } from '../components/property/Property'
import {
  Body,
  Data,
  Head,
  HeadData,
  Row,
  Table,
} from 'libs/island-ui/core/src/lib/Table/Table'
import { TaxReturnInputController } from '../components/input/TaxReturnInputController'
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

        <Stack space={0} dividers>
          <Property
            name={'Norðurljós Software ehf'}
            type={'input'}
            value="9360000"
          />
          <Property name={'Mús og merki'} type={'input'} value="960000" />
        </Stack>
      </Box>
      <Box>
        <Box marginBottom={2}>
          <Text fontWeight="semiBold" variant="h4">
            {f(tax.extraIncomeLabel)}
          </Text>
        </Box>
        <Stack space={0} dividers>
          <Property name={'Ökutækjastyrkur'} type={'input'} value="0" />
          <Property name={'Dagpeningar'} type={'input'} value="120000" />
          <Property name={'Húsnæðishlunnindi'} type={'input'} value="0" />
        </Stack>
      </Box>
      <Box>
        <Box marginBottom={2}>
          <Text fontWeight="semiBold" variant="h4">
            {f(tax.pensionIncomeLabel)}
          </Text>
          <Text fontWeight="semiBold" variant="h4">
            {f(tax.pensionIncomeLabelTwo)}
          </Text>
        </Box>
        <Stack space={0} dividers>
          <Table>
            <Head>
              <Row>
                <HeadData>
                  <Text variant="medium" fontWeight="semiBold">
                    {f(tax.launagreidandi)}
                  </Text>
                </HeadData>
                <HeadData>
                  <Text variant="medium" fontWeight="semiBold">
                    {f(tax.fyrirhvad)}
                  </Text>
                </HeadData>
                <HeadData align="right">
                  <Text variant="medium" fontWeight="semiBold">
                    {f(tax.upphaed)}
                  </Text>
                </HeadData>
              </Row>
            </Head>
            <Body>
              <Row>
                <Data>
                  <Text variant="medium">Norðurljós Software ehf</Text>
                </Data>
                <Data>
                  <Text variant="medium">Íþróttastyrkur</Text>
                </Data>
                <Data width={204} style={{ paddingRight: 0 }}>
                  <TaxReturnInputController
                    name={'name'}
                    label={''}
                    defaultValue={'123'}
                    textarea={false}
                    maxLength={180}
                    type={'number'}
                  />
                </Data>
              </Row>
            </Body>
          </Table>
        </Stack>
      </Box>
    </FormScreen>
  )
}
