import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import { taxSecondInterestCharges } from '../lib/messages'
import { OJOIFieldBaseProps } from '../lib/types'
import {
  formatCurrencyWithoutSuffix,
  formatPhoneNumber,
} from '@island.is/application/ui-components'
import { Box, Button, Stack, Text } from '@island.is/island-ui/core'
import { DisplayTable } from '../components/DisplayTable/DisplayTable'
import { FormChapter } from '../components/FormChapter/FormChapter'
import { Body, Data, Row, Table } from 'libs/island-ui/core/src/lib/Table/Table'
import { Routes } from '../lib/constants'

export const ConfirmationPreviewScreen = ({
  application,
  goToScreen,
}: OJOIFieldBaseProps) => {
  const { formatMessage: f } = useLocale()

  const chapterIncomeMap = [
    taxSecondInterestCharges.salarySubChapter,
    taxSecondInterestCharges.grantsSubChapter,
    taxSecondInterestCharges.otherRevenueSubChapter,
  ]

  const chapterPropertyMap = [
    taxSecondInterestCharges.localPropertySubChapter,
    taxSecondInterestCharges.vehiclesSubChapter,
  ]

  const propertyDepts =
    application.externalData.getTaxReturnData.data.prefill.debt.debtLines.filter(
      (line) => line.debtType.name === 'property',
    )

  return (
    <FormScreen
      goToScreen={goToScreen}
      title={f(taxSecondInterestCharges.title)}
      intro={f(taxSecondInterestCharges.intro)}
    >
      <FormChapter
        onClick={goToScreen ? () => goToScreen(Routes.GENERAL_INFO) : undefined}
        title={f(taxSecondInterestCharges.generalInfoChapter)}
      >
        <Stack space={3}>
          <Box width="full" display="flex">
            <Box width="half">
              <Text fontWeight="semiBold">
                {f(taxSecondInterestCharges.name)}
              </Text>
              <Text>
                {
                  application.externalData.getTaxNationalRegistryData.data
                    .person.name
                }
              </Text>
            </Box>

            <Box width="half">
              <Text fontWeight="semiBold">
                {f(taxSecondInterestCharges.nationalId)}
              </Text>
              <Text>
                {
                  application.externalData.getTaxNationalRegistryData.data
                    .person.nationalId
                }
              </Text>
            </Box>
          </Box>
          <Box width="full" display="flex">
            <Box width="half">
              <Text fontWeight="semiBold">
                {f(taxSecondInterestCharges.address)}
              </Text>
              <Text>
                {
                  application.externalData.getTaxNationalRegistryData.data
                    .person.address?.address
                }
              </Text>
            </Box>
            <Box width="half">
              <Text fontWeight="semiBold">
                {f(taxSecondInterestCharges.municipality)}
              </Text>
              <Text>
                {`${application.externalData.getTaxNationalRegistryData.data.person.address?.postalCode} ${application.externalData.getTaxNationalRegistryData.data.person.address?.city}`}
              </Text>
            </Box>
          </Box>
          <Box width="full" display="flex">
            <Box width="half">
              <Text fontWeight="semiBold">
                {f(taxSecondInterestCharges.email)}
              </Text>
              <Text>
                {
                  application.externalData.getTaxNationalRegistryData.data
                    .person.email
                }
              </Text>
            </Box>
            <Box width="half">
              <Text fontWeight="semiBold">
                {f(taxSecondInterestCharges.phone)}
              </Text>
              <Text>
                {`+354 ${formatPhoneNumber(
                  application.externalData.getTaxNationalRegistryData.data
                    .person.phoneNumber ?? '',
                )}`}
              </Text>
            </Box>
          </Box>
        </Stack>
      </FormChapter>
      <FormChapter title={f(taxSecondInterestCharges.annualIncomeChapter)}>
        {application.externalData.getTaxReturnData.data.groupedIncome.length >
          0 &&
          application.externalData.getTaxReturnData.data.groupedIncome.map(
            (income, i) => {
              return (
                <>
                  <Box marginBottom={4}>
                    <Text variant="h5">{f(chapterIncomeMap[i])}</Text>
                  </Box>
                  <Box marginBottom={2}>
                    <DisplayTable
                      headData={['Greiðandi', 'Upphæð']}
                      bodyData={income.items.map((i) => [
                        i.label,
                        formatCurrencyWithoutSuffix(i.value.toString()),
                      ])}
                      total={formatCurrencyWithoutSuffix(
                        income.items
                          .reduce((sum, item) => sum + Number(item.value), 0)
                          .toString(),
                      )}
                      key={income.name}
                    />
                  </Box>
                </>
              )
            },
          )}
      </FormChapter>
      <FormChapter title={f(taxSecondInterestCharges.yearEndAssetsChapter)}>
        {application.externalData.getTaxReturnData.data.groupedProperty.length >
          0 &&
          application.externalData.getTaxReturnData.data.groupedProperty.map(
            (property, i) => {
              return (
                <>
                  <Box marginBottom={4}>
                    <Text variant="h5">{f(chapterPropertyMap[i])}</Text>
                  </Box>
                  <Box marginBottom={2}>
                    <DisplayTable
                      headData={
                        i === 0
                          ? ['Fastanúmer eignar', 'Fasteign', 'Upphæð']
                          : ['Númer', 'Kaupár', 'Upphæð']
                      }
                      bodyData={property.items.map((i) => {
                        console.log('property.items', i)
                        return [
                          i.identifier as string,
                          i.label,
                          formatCurrencyWithoutSuffix(i.value.toString()),
                        ]
                      })}
                      total={formatCurrencyWithoutSuffix(
                        property.items
                          .reduce((sum, item) => sum + Number(item.value), 0)
                          .toString(),
                      )}
                      key={property.name}
                    />
                  </Box>
                </>
              )
            },
          )}
      </FormChapter>
      <FormChapter
        title={f(taxSecondInterestCharges.debtsChapter)}
        subTitle={f(taxSecondInterestCharges.loansSubChapter)}
      >
        <Box marginBottom={6}>
          <Text variant="small">Fyllist út af Ríkisskattstjóra</Text>
          {propertyDepts.length > 0 &&
            propertyDepts.map((dept, i) => (
              <Box>
                <Table>
                  <Body>
                    <Row>
                      <Data align={'left'}>
                        <Text variant="medium" fontWeight="semiBold">
                          Staðsetning íbúðarhúsnæðis
                        </Text>
                      </Data>
                      <Data align={'right'}>{dept.label}</Data>
                    </Row>
                    <Row>
                      <Data align={'left'}>
                        <Text variant="medium" fontWeight="semiBold">
                          Kaupár
                        </Text>
                      </Data>
                      {/* TODO: Use formatDate to get year*/}
                      <Data align={'right'}>
                        <Text>{dept.originationDate.toString()}</Text>
                      </Data>
                    </Row>
                    <Row>
                      <Data align={'left'}>
                        <Text variant="medium" fontWeight="semiBold">
                          Lánsnúmer
                        </Text>
                      </Data>
                      <Data align={'right'}>
                        <Text>{dept.identifier}</Text>
                      </Data>
                    </Row>
                    <Row>
                      <Data align={'left'}>
                        <Text variant="medium" fontWeight="semiBold">
                          Lánsveitandi
                        </Text>
                      </Data>
                      {/* TODO: Change to creditorName */}
                      <Data align={'right'}>
                        <Text>{dept.creditorId}</Text>
                      </Data>
                    </Row>
                    <Row>
                      <Data align={'left'}>
                        <Text variant="medium" fontWeight="semiBold">
                          Kennitala Lánsveitanda
                        </Text>
                      </Data>
                      <Data align={'right'}>
                        <Text>{dept.creditorId}</Text>
                      </Data>
                    </Row>
                    <Row>
                      <Data align={'left'}>
                        <Text variant="medium" fontWeight="semiBold">
                          Lántökudagur
                        </Text>
                      </Data>
                      {/* TODO: Use formatDate */}
                      <Data align={'right'}>
                        <Text>{dept.originationDate.toString()}</Text>
                      </Data>
                    </Row>
                    <Row>
                      <Data align={'left'}>
                        <Text variant="medium" fontWeight="semiBold">
                          Lánstími í árum
                        </Text>
                      </Data>
                      <Data align={'right'}>
                        <Text>{dept.term / 12}</Text>
                      </Data>
                    </Row>
                    <Row>
                      <Data align={'left'}>
                        <Text variant="medium" fontWeight="semiBold">
                          Lánstími í árum
                        </Text>
                      </Data>
                      <Data align={'right'}>
                        <Text>-</Text>
                      </Data>
                    </Row>
                  </Body>
                </Table>
              </Box>
            ))}
        </Box>
      </FormChapter>
    </FormScreen>
  )
}
