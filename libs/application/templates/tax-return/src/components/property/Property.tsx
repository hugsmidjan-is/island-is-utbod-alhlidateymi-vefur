import { Box, SkeletonLoader, Text } from '@island.is/island-ui/core'
import * as styles from './Property.css'
import { OJOI_INPUT_HEIGHT } from '../../lib/constants'
import { OJOIInputController } from '../input/OJOIInputController'

import cn from 'classnames'

type Props = {
  name: string
  value?: string
  loading?: boolean
  type?: 'input' | 'text'
}

export const Property = ({
  name,
  value,
  loading = false,
  type = 'text',
}: Props) => {
  if (!value && !loading) {
    return null
  }

  return (
    <Box
      className={cn(
        styles.propertyWrap,
        type === 'input' ? styles.inputPropertyWrap : '',
      )}
    >
      {loading ? (
        <SkeletonLoader height={OJOI_INPUT_HEIGHT} borderRadius="standard" />
      ) : (
        <>
          <Box className={styles.property}>
            <Text fontWeight="semiBold">{name}</Text>
          </Box>
          {type === 'text' && (
            <Box className={styles.property}>
              <Text>{value}</Text>
            </Box>
          )}

          {type === 'input' && (
            <Box className={styles.inputProperty}>
              <OJOIInputController
                name={name}
                label={''}
                defaultValue={value}
                textarea={false}
                maxLength={180}
                type={'number'}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  )
}
