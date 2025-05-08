import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import { taxInterestCharges, taxOverviewConfirmation } from '../lib/messages'
import { TaxFieldBaseProps } from '../lib/types'
import { format as formatNationalId } from 'kennitala'
import {
  formatCurrency,
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
}: TaxFieldBaseProps) => {
  const { formatMessage: f } = useLocale()

  const chapterIncomeMap = [
    taxOverviewConfirmation.salarySubChapter,
    taxOverviewConfirmation.grantsSubChapter,
    taxOverviewConfirmation.otherRevenueSubChapter,
  ]

  const chapterPropertyMap = [
    taxOverviewConfirmation.localPropertySubChapter,
    taxOverviewConfirmation.vehiclesSubChapter,
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
      title={f(taxOverviewConfirmation.title)}
      intro={f(taxOverviewConfirmation.intro)}
    >
      <FormChapter
        onClick={goToScreen ? () => goToScreen(Routes.GENERAL_INFO) : undefined}
        title={f(taxOverviewConfirmation.generalInfoChapter)}
      >
        <Stack space={3}>
          <Box width="full" display="flex">
            <Box width="half">
              <Text fontWeight="semiBold">
                {f(taxOverviewConfirmation.name)}
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
                {f(taxOverviewConfirmation.nationalId)}
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
                {f(taxOverviewConfirmation.address)}
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
                {f(taxOverviewConfirmation.municipality)}
              </Text>
              <Text>
                {`${application.externalData.getTaxNationalRegistryData.data.person.address?.postalCode} ${application.externalData.getTaxNationalRegistryData.data.person.address?.city}`}
              </Text>
            </Box>
          </Box>
          <Box width="full" display="flex">
            <Box width="half">
              <Text fontWeight="semiBold">
                {f(taxOverviewConfirmation.email)}
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
                {f(taxOverviewConfirmation.phone)}
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
      <FormChapter title={f(taxOverviewConfirmation.annualIncomeChapter)}>
        {application.externalData.getTaxReturnData.data.groupedIncome.length >
          0 &&
          application.externalData.getTaxReturnData.data.groupedIncome.map(
            (income, i) => {
              return (
                <>
                  <Box marginBottom={2} marginTop={i === 0 ? 3 : 5}>
                    <Text variant="h4">{f(chapterIncomeMap[i])}</Text>
                  </Box>
                  <Box marginBottom={2}>
                    <DisplayTable
                      headData={[
                        i === 0
                          ? 'Greiðandi'
                          : i === 1
                          ? 'Tegund'
                          : 'Launagreiðandi',
                        'Upphæð',
                      ]}
                      bodyData={income.items.map((i) => [
                        i.label,
                        formatCurrency(i.value.toString()),
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
      <FormChapter title={f(taxOverviewConfirmation.yearEndAssetsChapter)}>
        {application.externalData.getTaxReturnData.data.groupedProperty.length >
          0 &&
          application.externalData.getTaxReturnData.data.groupedProperty.map(
            (property, i) => {
              return (
                <>
                  <Box marginBottom={2} marginTop={i === 0 ? 3 : 5}>
                    <Text variant="h4">{f(chapterPropertyMap[i])}</Text>
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
                          formatCurrency(i.value.toString()),
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
      <FormChapter title={f(taxOverviewConfirmation.debtsChapter)}>
        <Box marginBottom={2} marginTop={3}>
          <Text variant="h4" fontWeight="semiBold">
            {f(taxOverviewConfirmation.loansSubChapter)}
          </Text>
        </Box>
        <Box marginTop={1}>
          <Text variant="h5" fontWeight="light">
            {f(taxInterestCharges.filledBy)}
          </Text>
        </Box>
        <Box marginTop={2}>
          {propertyDepts.length > 0 &&
            propertyDepts.map((dept, i) => (
              <>
                <Box marginBottom={6} marginTop={2}>
                  <Table>
                    <Body>
                      <Row>
                        <Data align={'left'} width={'50%'}>
                          <Text variant="h5" fontWeight="semiBold">
                            Staðsetning íbúðarhúsnæðis
                          </Text>
                        </Data>
                        <Data align="left" width="50%" weight="light">
                          {dept.label}
                        </Data>
                      </Row>
                      <Row>
                        <Data align={'left'} width={'50%'}>
                          <Text variant="h5" fontWeight="semiBold">
                            Kaupár
                          </Text>
                        </Data>
                        <Data align={'left'} width={'50%'} weight="light">
                          <Text>
                            {formatDate(
                              dept.originationDate.toString(),
                              'yyyy',
                            )}
                          </Text>
                        </Data>
                      </Row>
                      <Row>
                        <Data align={'left'} width={'50%'}>
                          <Text variant="h5" fontWeight="semiBold">
                            Lánsnúmer
                          </Text>
                        </Data>
                        <Data align={'left'} width={'50%'} weight="light">
                          <Text>{dept.identifier}</Text>
                        </Data>
                      </Row>
                      <Row>
                        <Data align={'left'} width={'50%'}>
                          <Text variant="h5" fontWeight="semiBold">
                            Lánsveitandi
                          </Text>
                        </Data>

                        <Data align={'left'} width={'50%'} weight="light">
                          <Text>{dept.creditorName}</Text>
                        </Data>
                      </Row>
                      <Row>
                        <Data align={'left'} width={'50%'}>
                          <Text variant="h5" fontWeight="semiBold">
                            Kennitala Lánsveitanda
                          </Text>
                        </Data>
                        <Data align={'left'} width={'50%'} weight="light">
                          <Text>{formatNationalId(dept.creditorId)}</Text>
                        </Data>
                      </Row>
                      <Row>
                        <Data align={'left'} width={'50%'}>
                          <Text variant="h5" fontWeight="semiBold">
                            Lántökudagur
                          </Text>
                        </Data>
                        <Data align={'left'} width={'50%'} weight="light">
                          <Text>
                            {formatDate(
                              dept.originationDate.toString(),
                              'dd.MMM yyyy',
                            )}
                          </Text>
                        </Data>
                      </Row>
                      <Row>
                        <Data align={'left'} width={'50%'}>
                          <Text variant="h5" fontWeight="semiBold">
                            Lánstími í árum
                          </Text>
                        </Data>
                        <Data align={'left'} width={'50%'} weight="light">
                          <Text>{dept.term / 12} ár</Text>
                        </Data>
                      </Row>
                      <Row>
                        <Data align={'left'} width={'50%'}>
                          <Text variant="h5" fontWeight="semiBold">
                            Yfirtökudagur
                          </Text>
                        </Data>
                        <Data align={'left'} width={'50%'} weight="light">
                          <Text>-</Text>
                        </Data>
                      </Row>
                    </Body>
                  </Table>
                </Box>
                <Box marginBottom={4}>
                  <Text variant="h5" fontWeight="light">
                    Ef hluti af láninu fer til annars en íbúðarhúsnæðis, þá þarf
                    að tilgreina hversu mikið af láninu var notað til að kaupa
                    eða byggja íbúðarhúsnæði.
                  </Text>
                </Box>
                <Box marginBottom={6}>
                  <Table>
                    <Body>
                      <Row>
                        <Data align={'left'} width={'50%'}>
                          <Text variant="h5" fontWeight="semiBold">
                            Lánshlutfall
                          </Text>
                        </Data>
                        <Data align={'left'} width={'50%'} weight="light">
                          {/* TODO: ??? */}
                          100%
                        </Data>
                      </Row>
                      <Row>
                        <Data align={'left'} width={'50%'}>
                          <Text variant="h5" fontWeight="semiBold">
                            Heildargreiðslur ársins
                          </Text>
                        </Data>
                        <Data align={'left'} width={'50%'}>
                          <Text>
                            {formatCurrency(dept.annualTotalPayment.toString())}
                          </Text>
                        </Data>
                      </Row>
                      <Row>
                        <Data align={'left'} width={'50%'}>
                          <Text variant="h5" fontWeight="semiBold">
                            Afborgun af nafnverði
                          </Text>
                        </Data>
                        <Data align={'left'} width={'50%'}>
                          <Text>
                            {formatCurrency(
                              dept.annualTotalPrincipalPayment.toString(),
                            )}
                          </Text>
                        </Data>
                      </Row>
                      <Row>
                        <Data align={'left'} width={'50%'}>
                          <Text variant="h5" fontWeight="semiBold">
                            Afföll
                          </Text>
                        </Data>
                        <Data align={'left'} width={'50%'}>
                          <Text>{dept.writeDown}</Text>
                        </Data>
                      </Row>
                      <Row>
                        <Data align={'left'} width={'50%'}>
                          <Text variant="h5" fontWeight="semiBold">
                            Lántökukostnaður
                          </Text>
                        </Data>
                        <Data align={'left'} width={'50%'}>
                          <Text>{dept.costOfLoan ?? '-'}</Text>
                        </Data>
                      </Row>
                      <Row>
                        <Data align={'left'} width={'50%'}>
                          <Text variant="h5" fontWeight="semiBold">
                            Vaxtagjöld
                          </Text>
                        </Data>
                        <Data align={'left'} width={'50%'}>
                          <Text>
                            {formatCurrency(dept.interestAmount.toString())}
                          </Text>
                        </Data>
                      </Row>
                      <Row>
                        <Data align={'left'} width={'50%'}>
                          <Text variant="h5" fontWeight="semiBold">
                            Eftirstöðvar skulda
                          </Text>
                        </Data>
                        <Data align={'left'} width={'50%'}>
                          <Text>
                            {formatCurrency(
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
        <Box marginBottom={4}>
          <Text variant="h4">
            {f(taxOverviewConfirmation.otherDebtsSubChapter)}
          </Text>
        </Box>
        <Box marginBottom={2}>
          <DisplayTable
            headData={['Tegund skulda', 'Vaxtagjöld', 'Eftirstöðvar skuldar']}
            bodyData={
              otherDepts.map((d, i) => {
                return [
                  d.label,
                  formatCurrency(d.interestAmount.toString()),
                  formatCurrency(d.outstandingPrincipal.toString()),
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
