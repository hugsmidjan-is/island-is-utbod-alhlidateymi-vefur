import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import { tax } from '../lib/messages'
import { InputFields, OJOIFieldBaseProps } from '../lib/types'
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
import { BaseInputController } from '../components/input/BaseInputController'
export const IncomeLastYearScreen = (props: OJOIFieldBaseProps) => {
  const { formatMessage: f } = useLocale()

  return (
    <FormScreen
      // goToScreen={props.goToScreen}
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
          {props.application?.answers?.incomeLastYear?.salary?.map(
            (item, i) => (
              <Property
                key={item.title}
                name={item.title}
                type="input"
                value={item.value}
                id={`${InputFields.incomeLastYear.salary}[${i}].value`}
                inputName={`${InputFields.incomeLastYear.salary}[${i}].value`}
              />
            ),
          )}
        </Stack>
      </Box>
      <Box>
        <Box marginBottom={2}>
          <Text fontWeight="semiBold" variant="h4">
            {f(tax.extraIncomeLabel)}
          </Text>
        </Box>
        <Stack space={0} dividers>
          {props.application?.answers?.incomeLastYear?.benefits?.map(
            (item, i) => (
              <Property
                key={item.title}
                name={item.title}
                inputName={`${InputFields.incomeLastYear.benefits}[${i}].value`}
                type="input"
                value={item.value}
              />
            ),
          )}
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
              {props.application?.answers?.incomeLastYear?.compensation?.map(
                (item, i) => (
                  <Row key={item.title}>
                    <Data>{item.title}</Data>
                    <Data size={16}>{item.details}</Data>
                    <Data width={228} style={{ paddingRight: 0 }}>
                      <BaseInputController
                        label={''}
                        defaultValue={item.value}
                        textarea={false}
                        maxLength={180}
                        type={'number'}
                        suffix=" kr."
                        name={`${InputFields.incomeLastYear.compensation}[${i}].value`}
                        id={`${InputFields.incomeLastYear.compensation}[${i}].value`}
                      />
                    </Data>
                  </Row>
                ),
              )}
            </Body>
          </Table>
        </Stack>
      </Box>
    </FormScreen>
  )
}
