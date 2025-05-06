import { useEffect } from 'react'
import { useLocale } from '@island.is/localization'
import { useApplication } from '../hooks/useUpdateApplication'
import { FormScreen } from '../components/form/FormScreen'
import { taxEndOfYear, tax } from '../lib/messages'
import { InputFields, OJOIFieldBaseProps } from '../lib/types'
import { Box, Stack, Text } from '@island.is/island-ui/core'
import {
  Body,
  Data,
  Head,
  HeadData,
  Row,
  Table,
} from 'libs/island-ui/core/src/lib/Table/Table'
import { BaseInputController } from '../components/input/BaseInputController'
import { amountFormat, sumOfBaseEntity } from '../lib/utils'
export const EndOfYearScreen = (props: OJOIFieldBaseProps) => {
  const { formatMessage: f } = useLocale()
  const { updateApplicationV2 } = useApplication({
    applicationId: props.application.id,
  })

  // useEffect(() => {
  //   updateApplicationV2({
  //     path: InputFields.endOfYear.housing,
  //     value: [
  //       {
  //         title: '210-9876',
  //         details: 'Bláfjallagata 12',
  //         value: '52000000',
  //       },
  //     ],
  //   })
  //   updateApplicationV2({
  //     path: InputFields.endOfYear.vehicles,
  //     value: [
  //       {
  //         title: 'KB-521',
  //         details: '2021',
  //         value: '3100000',
  //       },
  //       {
  //         title: 'JU-329',
  //         details: '2012',
  //         value: '450000',
  //       },
  //     ],
  //   })
  // }, [])

  return (
    <FormScreen
      goToScreen={props.goToScreen}
      title={f(tax.lastIncomeTitle)}
      intro={f(tax.lastIncomeIntro)}
    >
      <Box>
        <Box marginBottom={2}>
          <Text fontWeight="semiBold" variant="h4">
            {f(taxEndOfYear.fasteignLabel)}
          </Text>
        </Box>
        <Stack space={0} dividers>
          <Table>
            <Head>
              <Row>
                <HeadData>
                  <Text variant="medium" fontWeight="semiBold">
                    {f(taxEndOfYear.fastanumer)}
                  </Text>
                </HeadData>
                <HeadData>
                  <Text variant="medium" fontWeight="semiBold">
                    {f(taxEndOfYear.fasteign)}
                  </Text>
                </HeadData>
                <HeadData align="right">
                  <Text variant="medium" fontWeight="semiBold">
                    {f(taxEndOfYear.fasteignamat)}
                  </Text>
                </HeadData>
              </Row>
            </Head>
            <Body>
              {props.application?.answers?.endOfYear?.housing?.map(
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
                        name={`${InputFields.endOfYear.housing}[${i}].value`}
                        id={`${InputFields.endOfYear.housing}[${i}].value`}
                      />
                    </Data>
                  </Row>
                ),
              )}
            </Body>
          </Table>
        </Stack>
      </Box>
      <Box>
        <Box marginBottom={2}>
          <Text fontWeight="semiBold" variant="h4">
            {f(taxEndOfYear.vehicleLabel)}
          </Text>
        </Box>
        <Stack space={0} dividers>
          <Table>
            <Head>
              <Row>
                <HeadData>
                  <Text variant="medium" fontWeight="semiBold">
                    {f(taxEndOfYear.numer)}
                  </Text>
                </HeadData>
                <HeadData>
                  <Text variant="medium" fontWeight="semiBold">
                    {f(taxEndOfYear.kaupar)}
                  </Text>
                </HeadData>
                <HeadData align="right">
                  <Text variant="medium" fontWeight="semiBold">
                    {f(taxEndOfYear.verd)}
                  </Text>
                </HeadData>
              </Row>
            </Head>
            <Body>
              {props.application?.answers?.endOfYear?.vehicles?.map(
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
                        name={`${InputFields.endOfYear.vehicles}[${i}].value`}
                        id={`${InputFields.endOfYear.vehicles}[${i}].value`}
                      />
                    </Data>
                  </Row>
                ),
              )}
              <Row>
                <Data style={{ borderBottom: 'none' }}>
                  <Text variant="medium" fontWeight="semiBold">
                    Samtals
                  </Text>
                </Data>
                <Data style={{ borderBottom: 'none' }}></Data>
                <Data style={{ paddingRight: 0, borderBottom: 'none' }}>
                  <Text
                    variant="medium"
                    fontWeight="semiBold"
                    textAlign="right"
                  >
                    {sumOfBaseEntity(
                      props.application?.answers?.endOfYear?.vehicles,
                    )}
                  </Text>
                </Data>
              </Row>
            </Body>
          </Table>
        </Stack>
      </Box>
    </FormScreen>
  )
}
