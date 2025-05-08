import { InputController } from '@island.is/shared/form-fields'

type DebtInputControllerProps = {
  field: string
  defaultValue: string
  label?: string
  type?: 'number' | 'text'
  size?: 'sm' | 'xs'
  readOnly?: boolean
  prefix?: string
  suffix?: string
  thousandSeparator?: boolean
}

export const DebtInputController = ({
  field,
  type,
  defaultValue,
  label,
  readOnly,
  prefix,
  suffix = ' kr.',
  size = 'sm',
  thousandSeparator = true,
  ...props
}: DebtInputControllerProps) => {
  const numberProps = {
    suffix,
    thousandSeparator,
  }
  return (
    <InputController
      {...props}
      backgroundColor="blue"
      maxLength={180}
      label={label}
      size={size}
      defaultValue={defaultValue}
      name={field}
      id={field}
      textarea={false}
      type={type}
      readOnly={readOnly}
      prefix={prefix}
      {...(type === 'number' ? { ...numberProps } : {})}
    />
  )
}
