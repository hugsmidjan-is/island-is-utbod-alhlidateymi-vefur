import { Input, SkeletonLoader } from '@island.is/island-ui/core'
import { useLocale } from '@island.is/localization'
import { MessageDescriptor } from 'react-intl'
import { OJOI_INPUT_HEIGHT } from '../../lib/constants'
import NumberFormat from 'react-number-format'

type Props = {
  name: string
  label: string | MessageDescriptor
  placeholder?: string | MessageDescriptor
  defaultValue?: string
  loading?: boolean
  disabled?: boolean
  textarea?: boolean
  maxLength?: number
  type?: 'text' | 'number'
  suffix?: string
  onChange?: (value: string) => void
}

export const OJOIInputController = ({
  name,
  label,
  placeholder,
  defaultValue,
  loading,
  disabled,
  textarea,
  maxLength,
  type = 'text',
  suffix,
}: Props) => {
  const { formatMessage: f } = useLocale()

  const placeholderText = placeholder
    ? typeof placeholder === 'string'
      ? placeholder
      : f(placeholder)
    : ''

  const labelText = typeof label === 'string' ? label : f(label)

  if (loading) {
    return (
      <SkeletonLoader
        borderRadius="standard"
        display="block"
        height={OJOI_INPUT_HEIGHT}
      />
    )
  }

  if (type === 'number') {
    return (
      <NumberFormat
        size={'sm'}
        customInput={Input}
        disabled={disabled}
        rightAlign={true}
        readOnly={false}
        backgroundColor={'blue'}
        placeholder={placeholderText}
        label={labelText}
        suffix={suffix ?? 'kr'}
        value={defaultValue}
        //format={format}
        maxLength={maxLength}
        autoComplete={'off'}
        loading={loading}
        inputMode={'numeric'}
        name={name}
        decimalSeparator={','}
        thousandSeparator={'.'}
      />
    )
  }
  return (
    <Input
      id={name}
      name={name}
      label={labelText}
      placeholder={placeholderText}
      size="sm"
      backgroundColor="blue"
      defaultValue={defaultValue}
      disabled={disabled}
      textarea={textarea}
      rows={4}
      maxLength={maxLength}
      required={false}
    />
  )
}
