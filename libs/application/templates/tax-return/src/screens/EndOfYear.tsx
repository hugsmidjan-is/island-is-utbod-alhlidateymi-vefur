import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import { taxEndOfYear, tax } from '../lib/messages'
import { OJOIFieldBaseProps } from '../lib/types'
import { Box, Stack, Text } from '@island.is/island-ui/core'
import {
  Body,
  Data,
  Head,
  HeadData,
  Row,
  Table,
} from 'libs/island-ui/core/src/lib/Table/Table'
import { TaxReturnInputController } from '../components/input/TaxReturnInputController'
export const EndOfYearScreen = (props: OJOIFieldBaseProps) => {
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
              <Row>
                <Data>
                  <Text variant="medium">210-9876</Text>
                </Data>
                <Data>
                  <Text variant="medium">Bláfjallagata 12</Text>
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
              <Row>
                <Data>
                  <Text variant="medium">KB-521</Text>
                </Data>
                <Data>
                  <Text variant="medium">2021</Text>
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
              <Row>
                <Data>
                  <Text variant="medium">JU-329</Text>
                </Data>
                <Data>
                  <Text variant="medium">2012</Text>
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
                    3.530.000 kr.
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
