import { Box, SkeletonLoader, Text } from '@island.is/island-ui/core'
import * as styles from './Property.css'
import { TAX_INPUT_HEIGHT } from '../../lib/constants'
import { TaxReturnInputController } from '../input/TaxReturnInputController'

import cn from 'classnames'
import { InputController } from '@island.is/shared/form-fields'
import { BaseInputController } from '../input/BaseInputController'

type Props = {
  name: string
  id?: string
  value?: string
  loading?: boolean
  inputName?: string
  type?: 'input' | 'text'
}

export const Property = ({
  name,
  id,
  inputName,
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
        <SkeletonLoader height={TAX_INPUT_HEIGHT} borderRadius="standard" />
      ) : (
        <>
          <Box className={styles.property}>
            <Text
              variant={type === 'input' ? 'medium' : undefined}
              fontWeight={type === 'input' ? 'regular' : 'semiBold'}
            >
              {name}
            </Text>
          </Box>
          {type === 'text' && (
            <Box className={styles.property}>
              <Text>{value}</Text>
            </Box>
          )}

          {type === 'input' && (
            <Box className={styles.inputProperty}>
              {/* <BaseInputController
                id={id ?? name}
                name={inputName ?? name}
                defaultValue={value}
                label={''}
                textarea={false}
                maxLength={180}
                placeholder="0 kr."
                type={'number'}
                suffix=" kr."
              /> */}
            </Box>
          )}
        </>
      )}
    </Box>
  )
}
