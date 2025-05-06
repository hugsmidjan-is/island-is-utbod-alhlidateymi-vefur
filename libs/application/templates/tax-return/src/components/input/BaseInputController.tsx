import { InputController } from '@island.is/shared/form-fields'
export const BaseInputController = (props: any) => {
  return (
    <InputController
      {...props}
      backgroundColor="blue"
      maxLength={180}
      rightAlign
      size="xs"
      thousandSeparator="."
    />
  )
}
