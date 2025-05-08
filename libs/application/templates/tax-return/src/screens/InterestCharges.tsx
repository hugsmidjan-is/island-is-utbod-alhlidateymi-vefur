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
import { DebtInputController } from '../components/input/DebtInputController'
import { formatDate } from '../lib/utils'
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
      intro={f(taxInterestCharges.interestChargesSubTitle)}
    >
      <Box>
        <Text fontWeight="semiBold">
          {f(taxInterestCharges.interestChargesIntro)}
        </Text>
        <Text>{f(taxInterestCharges.filledBy)}</Text>
      </Box>
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
                      defaultValue={`${line.creditorName}`}
                      type="text"
                      field={`${InputFields.interestCharges.propertyLoan}[${i}].creditorName`}
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
                      defaultValue={`${formatDate(`${line.originationDate}`)}`}
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
                <Box marginTop={4} marginBottom={4}>
                  <Text>{f(taxInterestCharges.disclaimer)}</Text>
                </Box>
                <Columns space={3}>
                  <Column>
                    <DebtInputController
                      label="Lánshlutfall"
                      // defaultValue={`${line.ratio}`}
                      defaultValue={`74`}
                      type="number"
                      suffix="%"
                      field={`${InputFields.interestCharges.propertyLoan}[${i}].ratio`}
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
                      defaultValue={`${line.writeDown ?? 0}`}
                      type="number"
                      prefix={'+ '}
                      field={`${InputFields.interestCharges.propertyLoan}[${i}].writeDown`}
                    />
                  </Column>
                  <Column>
                    <DebtInputController
                      label="Lántökukostnaður"
                      defaultValue={`${line.costOfLoan ?? 0}`}
                      type="number"
                      prefix={'+ '}
                      field={`${InputFields.interestCharges.propertyLoan}[${i}].costOfLoan`}
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
                    />
                  </Column>
                </Columns>
              </Box>
            )
          })}
      </Box>
      <Divider />
      <AlertMessage
        type="info"
        title="Vaxtagjöld og lán eða lánshlutar sem ekki ganga til öflunar íbúðarhúsnæðis færast í kafla 5.5."
      />
    </FormScreen>
  )
}
