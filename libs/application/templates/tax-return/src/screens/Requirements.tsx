import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import { InputFields, OJOIFieldBaseProps } from '../lib/types'
import { AlertMessage, Checkbox } from '@island.is/island-ui/core'
import { error, requirements } from '../lib/messages'
import { Controller } from 'react-hook-form'
import { getErrorViaPath, YesOrNoEnum } from '@island.is/application/core'
import { useApplication } from '../hooks/useUpdateApplication'
export const RequirementsScreen = ({
  application,
  errors,
  setSubmitButtonDisabled,
}: OJOIFieldBaseProps) => {
  const { formatMessage: f } = useLocale()

  const { applicationError } = useApplication({
    applicationId: application.id,
  })

  if (applicationError) {
    setSubmitButtonDisabled && setSubmitButtonDisabled(true)

    return (
      <AlertMessage
        type="error"
        title={f(error.fetchApplicationFailedTitle)}
        message={f(error.fetchApplicationFailedMessage)}
      />
    )
  }

  return (
    <FormScreen
      title={f(requirements.general.title)}
      intro={f(requirements.general.intro, {
        br: <br />,
        brbr: (
          <>
            <br />
            <br />
          </>
        ),
      })}
    >
      <Controller
        name={InputFields.requirements.approveExternalData}
        defaultValue={
          application.answers.requirements?.approveExternalData ??
          YesOrNoEnum.NO
        }
        render={({ field: { onChange, value } }) => {
          return (
            <Checkbox
              id={InputFields.requirements.approveExternalData}
              name={InputFields.requirements.approveExternalData}
              label={f(requirements.inputs.accept)}
              checked={value === YesOrNoEnum.YES}
              onChange={(e) => {
                onChange(e.target.checked ? YesOrNoEnum.YES : YesOrNoEnum.NO)
              }}
              backgroundColor="blue"
              large
            />
          )
        }}
      />
      {getErrorViaPath(errors, InputFields.requirements.approveExternalData) ? (
        <AlertMessage type="error" title={f(requirements.inputs.required)} />
      ) : null}
    </FormScreen>
  )
}
