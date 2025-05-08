import { Box, Button, Icon, Stack, Text } from '@island.is/island-ui/core'
import {
  Body,
  Data,
  Head,
  HeadData,
  Row,
  Table,
} from 'libs/island-ui/core/src/lib/Table/Table'
import { GroupedIncome } from '../../lib/types'
import { BaseInputController } from '../input/BaseInputController'

type IncomeGroupTableProps = {
  group: GroupedIncome
  columnLabels: string[]
  showPayer?: boolean
  fieldType: string
  customGroupLabel?: string
}

export const IncomeGroupTable = ({
  group,
  customGroupLabel,
  columnLabels,
  fieldType,
  showPayer = false,
}: IncomeGroupTableProps) => {
  return (
    <Box>
      <Box marginBottom={2} style={{ width: '70%' }}>
        <Text fontWeight="semiBold" variant="h4">
          {customGroupLabel ?? group.name}
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
                {showPayer && (
                  <Data size={16}>{item.payer ?? item.identifier ?? ''}</Data>
                )}
                <Data>{item.label}</Data>
                <Data width={228} style={{ paddingRight: 0 }}>
                  <BaseInputController
                    label=""
                    defaultValue={`${item.value}`}
                    type="number"
                    field={`${fieldType}[${i}]`}
                    titleValue={item.label}
                    detailsValue={
                      showPayer ? item.payer ?? item.identifier : ''
                    }
                  />
                </Data>
              </Row>
            ))}
            {group.items.length > 1 && (
              <Row>
                {showPayer && (
                  <Data weight="semiBold" fontsize={'h5'}>
                    Samtals
                  </Data>
                )}
                <Data weight="semiBold" fontsize={'h5'}>
                  {!showPayer && 'Samtals'}
                </Data>
                <Data align="right" weight="semiBold" fontsize={'h5'}>
                  {group.items
                    .reduce((acc, item) => {
                      return acc + (Number(item.value) || 0)
                    }, 0)
                    .toLocaleString('de-DE') || 0}{' '}
                  kr.
                </Data>
              </Row>
            )}
          </Body>
        </Table>
      </Stack>
      <Box marginTop={2}>
        <Button colorScheme="white" icon="add" size="small" variant={'utility'}>
          Bæta við línu
        </Button>
      </Box>
    </Box>
  )
}
