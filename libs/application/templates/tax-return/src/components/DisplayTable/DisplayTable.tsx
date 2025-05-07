import {
  Body,
  Data,
  Head,
  HeadData,
  Row,
  Table,
} from 'libs/island-ui/core/src/lib/Table/Table'
import { Text } from '@island.is/island-ui/core'
import { formatCurrencyWithoutSuffix } from '@island.is/application/ui-components'
type DisplayTableProps = {
  headData: string[]
  bodyData: string[][]
  total?: number | number[]
}
export const DisplayTable = ({
  headData,
  bodyData,
  total,
}: DisplayTableProps) => {
  const totalArray = Array.isArray(total)
  const addData = headData.length > 2 && !totalArray
  return (
    <Table>
      <Head>
        <Row>
          {headData.map((data, index) => (
            <HeadData key={index} align={index === 0 ? 'left' : 'right'}>
              <Text variant="medium" fontWeight="semiBold">
                {data}
              </Text>
            </HeadData>
          ))}
        </Row>
      </Head>
      <Body>
        {bodyData.map((bdata, index) => (
          <Row key={index}>
            {bdata.map((data, index) => (
              <Data key={index} align={index === 0 ? 'left' : 'right'}>
                {data}
              </Data>
            ))}
          </Row>
        ))}
        {!!total && (
          <Row>
            <Data align={'left'}>
              <Text variant="medium" fontWeight="semiBold">
                Samtals
              </Text>
            </Data>
            {totalArray ? (
              total.map((t) => {
                return (
                  <Data align={'right'}>
                    <Text variant="medium" fontWeight="semiBold">
                      {formatCurrencyWithoutSuffix(t.toString())}
                    </Text>
                  </Data>
                )
              })
            ) : (
              <>
                {addData && <Data align={'right'}></Data>}
                <Data align={'right'}>
                  <Text variant="medium" fontWeight="semiBold">
                    {formatCurrencyWithoutSuffix(total.toString())}
                  </Text>
                </Data>
              </>
            )}
          </Row>
        )}
      </Body>
    </Table>
  )
}
