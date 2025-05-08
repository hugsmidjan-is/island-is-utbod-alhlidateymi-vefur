import { Box, Stack, Text } from '@island.is/island-ui/core'
import {
  Body,
  Data,
  Head,
  HeadData,
  Row,
  Table,
} from 'libs/island-ui/core/src/lib/Table/Table'
import { GroupedIncome, InputFields, TaxReturnDebtLine } from '../../lib/types'
import { BaseInputController } from '../input/BaseInputController'
import { DebtInputController } from '../input/DebtInputController'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'

type IncomeInterestTableRowProps = {
  label: string
  details: string
  value: string
  keyDetails: string
  keyValue: string
  keyTitle: string
  rightAlign?: boolean
}

export const IncomeInterestTableRow = ({
  label,
  details,
  value,
  keyDetails,
  keyValue,
  keyTitle,
  rightAlign = false,
}: IncomeInterestTableRowProps) => {
  const { setValue } = useFormContext()

  useEffect(() => {
    setValue(`${keyTitle}`, label)
  }, [])
  return (
    <Row key={label}>
      <Data size={16} weight="light">
        {label}
      </Data>
      <Data>
        <DebtInputController
          label=""
          defaultValue={details}
          type="number"
          size="xs"
          field={keyDetails}
          rightAlign={rightAlign}
        />
      </Data>
      <Data width={228} style={{ paddingRight: 0 }}>
        <DebtInputController
          label=""
          defaultValue={value}
          type="number"
          size="xs"
          field={keyValue}
          rightAlign={rightAlign}
        />
      </Data>
    </Row>
  )
}
