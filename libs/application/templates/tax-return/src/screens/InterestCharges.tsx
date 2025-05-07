import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import { format as formatNationalId } from 'kennitala'
import { taxInterestCharges } from '../lib/messages'
import { InputFields, OJOIFieldBaseProps } from '../lib/types'
import {
  AlertMessage,
  Box,
  Column,
  Columns,
  Divider,
  Text,
} from '@island.is/island-ui/core'
import {
  Body,
  Data,
  Head,
  HeadData,
  Row,
  Table,
} from 'libs/island-ui/core/src/lib/Table/Table'
import { BaseInputController } from '../components/input/BaseInputController'
import { DebtInputController } from '../components/input/DebtInputController'
export const InterestChargesScreen = ({
  application,
  goToScreen,
}: OJOIFieldBaseProps) => {
  const { formatMessage: f } = useLocale()
  const { externalData } = application

  return (
    <FormScreen
      goToScreen={goToScreen}
      title={f(taxInterestCharges.interestChargesTitle)}
    >
      <Box>
        {externalData.getTaxReturnData.data.prefill.debt.debtLines
          .filter((line) => line.debtType.name === 'property')
          .map((line, i) => {
            return (
              <Box key={line.id}>
                <Columns space={3}>
                  <Column>
                    <DebtInputController
                      label="Staðsetning íbúðarhúsnæðis"
                      defaultValue={`${line.label}`}
                      type="text"
                      field={`${InputFields.interestCharges.propertyLoan}[${i}].address`}
                    />
                  </Column>
                  <Column>
                    <DebtInputController
                      label="Kaupár"
                      defaultValue={`${new Date(
                        line.originationDate,
                      ).getFullYear()}`}
                      type="text"
                      field={`${InputFields.interestCharges.propertyLoan}[${i}].buyYear`}
                    />
                  </Column>
                  <Column>
                    <DebtInputController
                      label="Lánsnúmer"
                      defaultValue={`${line.identifier}`}
                      type="text"
                      field={`${InputFields.interestCharges.propertyLoan}[${i}].loanNr`}
                    />
                  </Column>
                </Columns>
                <Box paddingBottom={3} />
                <Columns space={3}>
                  <Column>
                    <DebtInputController
                      label="Lánveitandi"
                      defaultValue={`${line.label}`}
                      type="text"
                      field={`${InputFields.interestCharges.propertyLoan}[${i}].address`}
                    />
                  </Column>
                  <Column>
                    <DebtInputController
                      label="Kennitala lánveitanda"
                      defaultValue={`${formatNationalId(line.creditorId)}`}
                      type="text"
                      field={`${InputFields.interestCharges.propertyLoan}[${i}].creditorId`}
                    />
                  </Column>
                  <Column>
                    <DebtInputController
                      label="Lántökudagur"
                      defaultValue={`${line.originationDate}`}
                      type="text"
                      field={`${InputFields.interestCharges.propertyLoan}[${i}].originationDate`}
                    />
                  </Column>
                </Columns>
                <Box paddingBottom={3} />
                <Columns space={3}>
                  <Column>
                    <DebtInputController
                      label="Lánstími í árum"
                      defaultValue={`${line.term / 12}`}
                      type="text"
                      field={`${InputFields.interestCharges.propertyLoan}[${i}].term`}
                    />
                  </Column>
                  <Column>
                    <DebtInputController
                      label="Yfirtökudagur"
                      defaultValue="-"
                      type="text"
                      field={`${InputFields.interestCharges.propertyLoan}[${i}].takeoverDate`}
                    />
                  </Column>
                  <Column>{''}</Column>
                </Columns>
                <Box marginTop={2} marginBottom={2}>
                  <Text fontWeight="semiBold">
                    Ef hluti af láninu er nýttur til annars en öflunar...
                  </Text>
                </Box>
                <Columns space={3}>
                  <Column>
                    <DebtInputController
                      label="Lánshlutfall"
                      defaultValue={`${line.annualTotalPayment}`}
                      type="number"
                      suffix="%"
                      field={`${InputFields.interestCharges.propertyLoan}[${i}].annualTotalPayment`}
                    />
                  </Column>
                  <Column>
                    <DebtInputController
                      label="Heildargreiðslur ársins"
                      defaultValue={`${line.annualTotalPayment}`}
                      type="number"
                      prefix={'+ '}
                      field={`${InputFields.interestCharges.propertyLoan}[${i}].annualTotalPayment`}
                    />
                  </Column>
                  <Column>
                    <DebtInputController
                      label="Afborgun af nafnverði"
                      defaultValue={`${line.annualTotalPrincipalPayment}`}
                      type="number"
                      prefix="​- ​"
                      field={`${InputFields.interestCharges.propertyLoan}[${i}].annualTotalPrincipalPayment`}
                    />
                  </Column>
                </Columns>
                <Box paddingBottom={3} />
                <Columns space={3}>
                  <Column>
                    <DebtInputController
                      label="Afföll"
                      defaultValue={`${line.interestAmount}`}
                      type="number"
                      prefix={'+ '}
                      field={`${InputFields.interestCharges.propertyLoan}[${i}].interestAmount`}
                    />
                  </Column>
                  <Column>
                    <DebtInputController
                      label="Lántökukostnaður"
                      defaultValue={`${line.interestAmount}`}
                      type="number"
                      prefix={'+ '}
                      field={`${InputFields.interestCharges.propertyLoan}[${i}].interestAmount`}
                    />
                  </Column>
                  <Column>
                    <DebtInputController
                      label="Vaxtagjöld"
                      defaultValue={`${line.interestAmount}`}
                      type="number"
                      prefix="= "
                      field={`${InputFields.interestCharges.propertyLoan}[${i}].interestAmount`}
                      readOnly
                    />
                  </Column>
                </Columns>
                <Box paddingBottom={3} />
                <Columns space={3}>
                  <Column>{''}</Column>
                  <Column>{''}</Column>
                  <Column>
                    <DebtInputController
                      label="Eftirstöðvar skulda"
                      defaultValue={`${line.outstandingPrincipal}`}
                      type="number"
                      field={`${InputFields.interestCharges.propertyLoan}[${i}].outstandingPrincipal`}
                      readOnly
                    />
                  </Column>
                </Columns>
              </Box>
            )
          })}
      </Box>

      <Divider />
      {/* <Box>
        <Text fontWeight="semiBold">
          {f(taxInterestCharges.interestChargesIntro)}
        </Text>
        <Text>
          Lán sem að hluta eða öllu leyti tengjast íbúðarhúsnæði. Ef aðeins
          hluti lánsins á við, þarf að gera grein fyrir því hlutfalli.
        </Text>
      </Box>
      <Table>
        <Head>
          <Row>
            <HeadData>Fyllist út af ríkisskattstjóra</HeadData>
            <HeadData></HeadData>
          </Row>
        </Head>
        <Body>
          <Row>
            <Data width={'50%'}>
              <Text fontWeight="semiBold" variant="medium">
                Staðsetning íbúðarhúsnæðis
              </Text>
            </Data>
            <Data>Bláfjallagata 12</Data>
          </Row>
        </Body>
      </Table>
      <Text>
        Ef hluti láns er nýttur til annars en öflunar íbúðarhúsnæðis skal
        tilgreinar hve hátt hlutfall fjárhæðar er til öflunar íbúðarhúsnæðis
        (reitur 1). Í reiti 5 til 8 skal færa heildarfjárhæðir (án hlutföllunar)
        en í dálka 9 og 10 skal aðeins færa þann hluta af vaxtagjöldum og
        eftirstöðvum sem tilheyra öflun íbúðarhúsnæðis.
      </Text> */}
      {/* <Table>
        <Head>
          <Row>
            <HeadData>Útreikningur</HeadData>
            <HeadData align="right">Fjárhæð</HeadData>
          </Row>
        </Head>
        <Body>
          <Row>
            <Data width={'60%'}>
              <Text fontWeight="semiBold" variant="medium">
                Lánshlutfall
              </Text>
            </Data>
            <Data align="right">
            </Data>
          </Row>
        </Body>
      </Table> */}
      <AlertMessage
        type="info"
        title="Vaxtagjöld og lán eða lánshlutar sem ekki ganga til öflunar íbúðarhúsnæðis færast í kafla 5.5."
      />
    </FormScreen>
  )
}
