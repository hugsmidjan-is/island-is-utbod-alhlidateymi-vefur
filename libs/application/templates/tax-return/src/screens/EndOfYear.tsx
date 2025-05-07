import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import { tax } from '../lib/messages'
import { InputFields, OJOIFieldBaseProps } from '../lib/types'
import { IncomeGroupTable } from '../components/IncomeGroupTable/IncomeGroupTable'
export const EndOfYearScreen = ({
  application,
  goToScreen,
}: OJOIFieldBaseProps) => {
  const { formatMessage: f } = useLocale()
  const { externalData } = application

  return (
    <FormScreen
      goToScreen={goToScreen}
      title={f(tax.endOfYearTitle)}
      intro={f(tax.endOfYearIntro)}
    >
      {externalData.getTaxReturnData.data.groupedProperty.map((group) => {
        if (group.type === 'property') {
          return (
            <IncomeGroupTable
              key={group.name}
              customGroupLabel={f(tax.propertyEndOfYearTitle)}
              group={group}
              fieldType={InputFields.endOfYear.property}
              columnLabels={[
                f(tax.propertyNr),
                f(tax.propertyLabel),
                f(tax.propertyEvaluation),
              ]}
              showPayer
            />
          )
        }
        if (group.type === 'vehicle') {
          return (
            <IncomeGroupTable
              key={group.name}
              customGroupLabel={f(tax.vehicleEndOfYearTitle)}
              group={group}
              fieldType={InputFields.endOfYear.vehicle}
              columnLabels={[f(tax.vehicleNr), f(tax.buyYear), f(tax.price)]}
              showPayer
            />
          )
        }

        return null
      })}
    </FormScreen>
  )
}
