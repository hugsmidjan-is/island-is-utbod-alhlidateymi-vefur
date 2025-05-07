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

export const SecondInterestChargesScreen = ({
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

  console.log('application', propertyDepts)
  return (
    <FormScreen
      goToScreen={goToScreen}
      title={f(taxSecondInterestCharges.title)}
      intro={f(taxSecondInterestCharges.intro)}
    >
      <p>cool</p>
    </FormScreen>
  )
}
