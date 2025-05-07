import { InputController } from '@island.is/shared/form-fields'

type DebtInputControllerProps = {
  field: string
  defaultValue: string
  label?: string
  type?: 'number' | 'text'
  readOnly?: boolean
  prefix?: string
  suffix?: string
}

export const DebtInputController = ({
  field,
  type,
  defaultValue,
  label,
  readOnly,
  prefix,
  suffix = ' kr.',
  ...props
}: DebtInputControllerProps) => {
  const numberProps = {
    suffix,
    thousandSeparator: true,
  }
  return (
    <InputController
      {...props}
      backgroundColor="blue"
      maxLength={180}
      label={label}
      size="sm"
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
