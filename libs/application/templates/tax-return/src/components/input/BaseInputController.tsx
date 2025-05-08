import { InputController } from '@island.is/shared/form-fields'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

type BaseInputControllerProps = {
  field: string
  defaultValue: string
  label?: string
  ariaLabel?: string
  type?: 'number' | 'text'
  titleValue?: string
  detailsValue?: string
}

export const BaseInputController = ({
  field,
  type,
  defaultValue,
  ariaLabel,
  label,
  titleValue,
  detailsValue,
  ...props
}: BaseInputControllerProps) => {
  const { setValue } = useFormContext()

  useEffect(() => {
    setValue(`${field}.title`, titleValue ?? '')
    setValue(`${field}.details`, detailsValue ?? '')
  }, [])

  return (
    <>
      <label htmlFor={`${field}.value`} className="visually-hidden">
        {ariaLabel}
      </label>
      <InputController
        {...props}
        backgroundColor="blue"
        suffix=" kr."
        maxLength={180}
        label={label}
        rightAlign
        size="xs"
        thousandSeparator
        defaultValue={defaultValue}
        name={`${field}.value`}
        id={`${field}.value`}
        textarea={false}
        type={type}
      />
    </>
  )
}
