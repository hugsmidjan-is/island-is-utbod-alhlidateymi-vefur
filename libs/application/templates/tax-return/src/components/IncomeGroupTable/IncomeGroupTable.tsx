import { InputFields } from '../../lib/types'
import { Box, Stack, Text } from '@island.is/island-ui/core'
import {
  Body,
  Data,
  Head,
  HeadData,
  Row,
  Table,
} from 'libs/island-ui/core/src/lib/Table/Table'
import { FieldKey, GroupedIncome } from '../../lib/types'
import { BaseInputController } from '../input/BaseInputController'

type IncomeGroupTableProps = {
  group: GroupedIncome
  fieldKey: FieldKey
  columnLabels: string[]
  showPayer?: boolean
}

export const IncomeGroupTable = ({
  group,
  fieldKey,
  columnLabels,
  showPayer = false,
}: IncomeGroupTableProps) => (
  <Box>
    <Box marginBottom={2} style={{ width: '70%' }}>
      <Text fontWeight="semiBold" variant="h4">
        {group.name}
      </Text>
    </Box>
    <Stack space={0} dividers>
      <Table>
        <Head>
          <Row>
            <HeadData>
              <Text variant="medium" fontWeight="semiBold">
                {columnLabels[0]}
              </Text>
            </HeadData>
            {showPayer && (
              <HeadData>
                <Text variant="medium" fontWeight="semiBold">
                  {columnLabels[1]}
                </Text>
              </HeadData>
            )}
            <HeadData align="right">
              <Text variant="medium" fontWeight="semiBold">
                {columnLabels[showPayer ? 2 : 1]}
              </Text>
            </HeadData>
          </Row>
        </Head>
        <Body>
          {group.items.map((item, i) => (
            <Row key={item.label}>
              <Data>{item.label}</Data>
              {showPayer && <Data size={16}>{item.payer ?? ''}</Data>}
              <Data width={228} style={{ paddingRight: 0 }}>
                <BaseInputController
                  label=""
                  defaultValue={item.value}
                  textarea={false}
                  maxLength={180}
                  type="number"
                  suffix=" kr."
                  name={`${InputFields.incomeLastYear[fieldKey]}[${i}].value`}
                  id={`${InputFields.incomeLastYear[fieldKey]}[${i}].value`}
                />
              </Data>
            </Row>
          ))}
        </Body>
      </Table>
    </Stack>
  </Box>
)
