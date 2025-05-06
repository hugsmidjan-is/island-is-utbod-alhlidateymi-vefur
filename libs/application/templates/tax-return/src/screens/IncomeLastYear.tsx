import { useEffect } from 'react'
import { useLocale } from '@island.is/localization'
import { useApplication } from '../hooks/useUpdateApplication'
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
import { TaxReturnInputController } from '../components/input/TaxReturnInputController'
import { InputController } from '@island.is/shared/form-fields'
export const IncomeLastYearScreen = (props: OJOIFieldBaseProps) => {
  const { formatMessage: f } = useLocale()

  // const { updateApplicationV2 } = useApplication({
  //   applicationId: props.application.id,
  // })

  // useEffect(() => {
  //   updateApplicationV2({
  //     path: InputFields.incomeLastYear.salary,
  //     value: [
  //       {
  //         title: 'Norðurljós Software ehf',
  //         value: '9360000',
  //       },
  //       {
  //         title: 'Mús og merki',
  //         value: '960000',
  //       },
  //     ],
  //   })
  //   updateApplicationV2({
  //     path: InputFields.incomeLastYear.benefits,
  //     value: [
  //       {
  //         title: 'Ökutækjastyrkur',
  //         value: '0',
  //       },
  //       {
  //         title: 'Dagpeningar',
  //         value: '120000',
  //       },
  //       {
  //         title: 'Húsnæðishlunnindi',
  //         value: '0',
  //       },
  //     ],
  //   })
  //   updateApplicationV2({
  //     path: InputFields.incomeLastYear.compensation,
  //     value: [
  //       {
  //         title: 'Norðurljós Software ehf',
  //         value: '12000',
  //         details: 'Íþróttastyrkur',
  //       },
  //     ],
  //   })
  // }, [])

  console.log('props', props)
  console.log(
    'InputFields.incomeLastYear.compensation',
    InputFields.incomeLastYear.compensation,
  )

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
                // inputName={InputFields.incomeLastYear.benefits[i]}
                id={`incomeLastYear.salary[${i}].value`}
                inputName={`incomeLastYear.salary[${i}].value`}
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
                inputName={`incomeLastYear.benefits[${i}].value`}
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
                <HeadData>{f(tax.launagreidandi)}</HeadData>
                <HeadData>{f(tax.fyrirhvad)}</HeadData>
                <HeadData align="right">{f(tax.upphaed)}</HeadData>
              </Row>
            </Head>
            <Body>
              {props.application?.answers?.incomeLastYear?.compensation?.map(
                (item, i) => (
                  <Row>
                    <Data>{item.title}</Data>
                    <Data size={16}>{item.details}</Data>
                    <Data width={228}>
                      <TaxReturnInputController
                        name={`incomeLastYear.compensation[0].value`}
                        label={''}
                        defaultValue={item.value}
                        textarea={false}
                        maxLength={180}
                        type={'number'}
                        id={`incomeLastYear.compensation[0].value`}
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
