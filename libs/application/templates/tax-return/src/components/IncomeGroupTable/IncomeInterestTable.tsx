import { Box, Button, Stack, Text } from '@island.is/island-ui/core'
import {
  Body,
  Data,
  Head,
  HeadData,
  Row,
  Table,
} from 'libs/island-ui/core/src/lib/Table/Table'
import { GroupedIncome, InputFields, TaxReturnDebtLine } from '../../lib/types'
import { IncomeInterestTableRow } from './IncomeInterestRow'

type IncomeInterestTableProps = {
  line: TaxReturnDebtLine[]
}

export const IncomeInterestTable = ({ line }: IncomeInterestTableProps) => {
  return (
    <Box>
      <Box marginBottom={2} style={{ width: '70%' }}>
        <Text fontWeight="semiBold" variant="h4">
          5.5 Aðrar skuldir og vaxtagjöld
        </Text>
      </Box>
      <Stack space={0} dividers>
        <Table>
          <Head>
            <Row>
              <HeadData>
                <Text variant="small" fontWeight="semiBold">
                  Tegund skuldar
                </Text>
              </HeadData>
              <HeadData align="right">
                <Text variant="small" fontWeight="semiBold">
                  Vaxtagjöld
                </Text>
              </HeadData>
              <HeadData align="right">
                <Text variant="small" fontWeight="semiBold">
                  Eftirstöðvar skuldar
                </Text>
              </HeadData>
            </Row>
          </Head>
          <Body>
            {line.map((item, i) => (
              <IncomeInterestTableRow
                key={item.label}
                label={item.label}
                details={`${item.interestAmount}`}
                value={`${item.outstandingPrincipal}`}
                keyDetails={`${InputFields.interestCharges.general}[${i}].details`}
                keyValue={`${InputFields.interestCharges.general}[${i}].value`}
                keyTitle={`${InputFields.interestCharges.general}[${i}].title`}
              />
            ))}
            {line.length > 1 && (
              <Row>
                <Data weight="semiBold" fontsize={'h5'}>
                  Samtals
                </Data>
                <Data align="right" weight="semiBold" fontsize={'h5'}>
                  {line
                    .reduce((acc, item) => {
                      return acc + (Number(item.interestAmount) || 0)
                    }, 0)
                    .toLocaleString('de-DE') || 0}{' '}
                  kr.
                </Data>
                <Data align="right" weight="semiBold" fontsize={'h5'}>
                  {line
                    .reduce((acc, item) => {
                      return acc + (Number(item.outstandingPrincipal) || 0)
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
