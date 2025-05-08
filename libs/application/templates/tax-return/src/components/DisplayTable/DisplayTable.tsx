import {
  Body,
  Data,
  Head,
  HeadData,
  Row,
  Table,
} from 'libs/island-ui/core/src/lib/Table/Table'
import { Text } from '@island.is/island-ui/core'
import { formatCurrency } from '@island.is/application/ui-components'
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
              <Text variant="small" fontWeight="semiBold">
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
              <Data
                key={index}
                weight="light"
                align={index === 0 ? 'left' : 'right'}
                width={addData ? '1/3' : '1/2'}
              >
                {data}
              </Data>
            ))}
          </Row>
        ))}
        {!!total && bodyData.length > 1 && (
          <Row>
            <Data
              align={'left'}
              weight="semiBold"
              fontsize={'h5'}
              width={addData ? '1/3' : '1/2'}
            >
              Samtals
            </Data>
            {totalArray ? (
              total.map((t, index) => {
                return (
                  <Data
                    align={'right'}
                    key={index}
                    width={addData ? '1/3' : '1/2'}
                  >
                    <Text variant="h5" fontWeight="semiBold">
                      {formatCurrency(t.toString())}
                    </Text>
                  </Data>
                )
              })
            ) : (
              <>
                {addData && (
                  <Data align={'right'} width={addData ? '1/3' : '1/2'}></Data>
                )}
                <Data align={'right'} width={addData ? '1/3' : '1/2'}>
                  <Text variant="h5" fontWeight="semiBold">
                    {formatCurrency(total.toString())}
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
