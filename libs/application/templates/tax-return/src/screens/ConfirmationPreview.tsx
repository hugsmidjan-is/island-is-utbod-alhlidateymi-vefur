import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import { taxInterestCharges, taxSecondInterestCharges } from '../lib/messages'
import { OJOIFieldBaseProps } from '../lib/types'
import { format as formatNationalId } from 'kennitala'
import {
  formatCurrencyWithoutSuffix,
  formatPhoneNumber,
} from '@island.is/application/ui-components'
import { Box, Button, Stack, Text } from '@island.is/island-ui/core'
import { DisplayTable } from '../components/DisplayTable/DisplayTable'
import { FormChapter } from '../components/FormChapter/FormChapter'
import { Body, Data, Row, Table } from 'libs/island-ui/core/src/lib/Table/Table'
import { Routes } from '../lib/constants'
import { formatDate } from '../lib/utils'

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

  const otherDepts =
    application.externalData.getTaxReturnData.data.prefill.debt.debtLines.filter(
      (line) => line.debtType.name !== 'property',
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
                      total={income.items.reduce(
                        (sum, item) => sum + Number(item.value),
                        0,
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
                        return [
                          i.identifier as string,
                          i.label,
                          formatCurrencyWithoutSuffix(i.value.toString()),
                        ]
                      })}
                      total={property.items.reduce(
                        (sum, item) => sum + Number(item.value),
                        0,
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
          <Text variant="small">{f(taxInterestCharges.filledBy)}</Text>
          {propertyDepts.length > 0 &&
            propertyDepts.map((dept, i) => (
              <>
                <Box marginBottom={6}>
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
                        <Data align={'right'}>
                          <Text>
                            {formatDate(
                              dept.originationDate.toString(),
                              'yyyy',
                            )}
                          </Text>
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

                        <Data align={'right'}>
                          <Text>{dept.creditorName}</Text>
                        </Data>
                      </Row>
                      <Row>
                        <Data align={'left'}>
                          <Text variant="medium" fontWeight="semiBold">
                            Kennitala Lánsveitanda
                          </Text>
                        </Data>
                        <Data align={'right'}>
                          <Text>{formatNationalId(dept.creditorId)}</Text>
                        </Data>
                      </Row>
                      <Row>
                        <Data align={'left'}>
                          <Text variant="medium" fontWeight="semiBold">
                            Lántökudagur
                          </Text>
                        </Data>
                        <Data align={'right'}>
                          <Text>
                            {formatDate(dept.originationDate.toString())}
                          </Text>
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
                <Box marginBottom={6}>
                  <Text variant="small">
                    Ef hluti af láninu fer til annars en íbúðarhúsnæðis, þá þarf
                    að tilgreina hversu mikið af láninu var notað til að kaupa
                    eða byggja íbúðarhúsnæði.
                  </Text>
                </Box>
                <Box marginBottom={6}>
                  <Table>
                    <Body>
                      <Row>
                        <Data align={'left'}>
                          <Text variant="medium" fontWeight="semiBold">
                            Lánshlutfall
                          </Text>
                        </Data>
                        <Data align={'right'}>
                          {/* TODO: ??? */}
                          100%
                        </Data>
                      </Row>
                      <Row>
                        <Data align={'left'}>
                          <Text variant="medium" fontWeight="semiBold">
                            Heildargreiðslur ársins
                          </Text>
                        </Data>
                        <Data align={'right'}>
                          <Text>
                            {formatCurrencyWithoutSuffix(
                              dept.annualTotalPayment.toString(),
                            )}
                          </Text>
                        </Data>
                      </Row>
                      <Row>
                        <Data align={'left'}>
                          <Text variant="medium" fontWeight="semiBold">
                            Afborgun af nafnverði
                          </Text>
                        </Data>
                        <Data align={'right'}>
                          <Text>
                            {formatCurrencyWithoutSuffix(
                              dept.annualTotalPrincipalPayment.toString(),
                            )}
                          </Text>
                        </Data>
                      </Row>
                      <Row>
                        <Data align={'left'}>
                          <Text variant="medium" fontWeight="semiBold">
                            Afföll
                          </Text>
                        </Data>
                        <Data align={'right'}>
                          <Text>{dept.writeDown}</Text>
                        </Data>
                      </Row>
                      <Row>
                        <Data align={'left'}>
                          <Text variant="medium" fontWeight="semiBold">
                            Lántökukostnaður
                          </Text>
                        </Data>
                        <Data align={'right'}>
                          <Text>{dept.costOfLoan ?? '-'}</Text>
                        </Data>
                      </Row>
                      <Row>
                        <Data align={'left'}>
                          <Text variant="medium" fontWeight="semiBold">
                            Vaxtagjöld
                          </Text>
                        </Data>
                        <Data align={'right'}>
                          <Text>
                            {formatCurrencyWithoutSuffix(
                              dept.interestAmount.toString(),
                            )}
                          </Text>
                        </Data>
                      </Row>
                      <Row>
                        <Data align={'left'}>
                          <Text variant="medium" fontWeight="semiBold">
                            Eftirstöðvar skulda
                          </Text>
                        </Data>
                        <Data align={'right'}>
                          <Text>
                            {formatCurrencyWithoutSuffix(
                              dept.outstandingPrincipal.toString(),
                            )}
                          </Text>
                        </Data>
                      </Row>
                    </Body>
                  </Table>
                </Box>
              </>
            ))}
        </Box>
      </FormChapter>
      <FormChapter
        title={f(taxSecondInterestCharges.annualIncomeChapter)}
        subTitle={f(taxSecondInterestCharges.otherDebtsSubChapter)}
      >
        <Box marginBottom={2}>
          <DisplayTable
            headData={['Tegund skulda', 'Vaxtagjöld', 'Eftirstöðvar skuldar']}
            bodyData={
              otherDepts.map((d, i) => {
                return [
                  d.label,
                  formatCurrencyWithoutSuffix(d.interestAmount.toString()),
                  formatCurrencyWithoutSuffix(
                    d.outstandingPrincipal.toString(),
                  ),
                  ,
                ]
              }) as string[][]
            }
            total={[
              otherDepts.reduce(
                (sum, item) => sum + Number(item.interestAmount),
                0,
              ),
              otherDepts.reduce(
                (sum, item) => sum + Number(item.outstandingPrincipal),
                0,
              ),
            ]}
          />
        </Box>
      </FormChapter>
    </FormScreen>
  )
}
