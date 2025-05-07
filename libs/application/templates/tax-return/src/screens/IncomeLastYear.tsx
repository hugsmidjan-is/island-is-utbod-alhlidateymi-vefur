import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import { tax } from '../lib/messages'
import { InputFields, OJOIFieldBaseProps } from '../lib/types'
import { IncomeGroupTable } from '../components/IncomeGroupTable/IncomeGroupTable'
export const IncomeLastYearScreen = ({ application }: OJOIFieldBaseProps) => {
  const { formatMessage: f } = useLocale()
  const { externalData, answers } = application

  console.log('answers', answers)
  return (
    <FormScreen title={f(tax.lastIncomeTitleYr)} intro={f(tax.lastIncomeIntro)}>
      {externalData.getTaxReturnData.data.groupedIncome.map((group) => {
        if (group.type === 'salary') {
          return (
            <IncomeGroupTable
              key={group.name}
              group={group}
              columnLabels={[f(tax.launagreidandi), f(tax.upphaed)]}
              fieldType={InputFields.incomeLastYear.salary}
            />
          )
        }

        if (group.type === 'benefits') {
          return (
            <IncomeGroupTable
              key={group.name}
              group={group}
              fieldType={InputFields.incomeLastYear.benefits}
              columnLabels={[f(tax.type), f(tax.upphaed)]}
            />
          )
        }

        if (group.type === 'compensation') {
          return (
            <IncomeGroupTable
              key={group.name}
              group={group}
              fieldType={InputFields.incomeLastYear.compensation}
              columnLabels={[f(tax.type), f(tax.fyrirhvad), f(tax.upphaed)]}
              showPayer
            />
          )
        }

        return null
      })}
    </FormScreen>
  )
}
