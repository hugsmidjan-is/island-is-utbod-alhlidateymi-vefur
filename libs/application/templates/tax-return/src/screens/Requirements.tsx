import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import { InputFields, OJOIFieldBaseProps } from '../lib/types'
import { AlertMessage, Checkbox } from '@island.is/island-ui/core'
import { error, requirements } from '../lib/messages'
import { Controller } from 'react-hook-form'
import { getErrorViaPath, YesOrNoEnum } from '@island.is/application/core'
import { useApplication } from '../hooks/useUpdateApplication'
import { useEffect } from 'react'
import set from 'lodash/set'
export const RequirementsScreen = ({
  application,
  errors,
  setSubmitButtonDisabled,
}: OJOIFieldBaseProps) => {
  const { formatMessage: f } = useLocale()

  const { applicationError, updateApplication } = useApplication({
    applicationId: application.id,
  })

  /**
   * Set default values for the application. Replace with actual data fetching.
   */
  useEffect(() => {
    let currentAnswers = structuredClone(application.answers)

    currentAnswers = set(currentAnswers, InputFields.generalInfo.user, {
      name: 'Jökull Þórðarson',
      nationalId: '120389-4569',
      address: 'Bláfjallagata 12',
      city: '105 Reykjavík',
    })
    currentAnswers = set(currentAnswers, InputFields.incomeLastYear.salary, [
      {
        title: 'Norðurljós Software ehf',
        value: '9360000',
      },
      {
        title: 'Mús og merki',
        value: '960000',
      },
    ])
    currentAnswers = set(currentAnswers, InputFields.incomeLastYear.benefits, [
      {
        title: 'Ökutækjastyrkur',
        value: '0',
      },
      {
        title: 'Dagpeningar',
        value: '120000',
      },
      {
        title: 'Húsnæðishlunnindi',
        value: '0',
      },
    ])
    currentAnswers = set(
      currentAnswers,
      InputFields.incomeLastYear.compensation,
      [
        {
          title: 'Norðurljós Software ehf',
          value: '12000',
          details: 'Íþróttastyrkur',
        },
      ],
    )
    currentAnswers = set(currentAnswers, InputFields.endOfYear.housing, [
      {
        title: '210-9876',
        details: 'Bláfjallagata 12',
        value: '52000000',
      },
    ])
    currentAnswers = set(currentAnswers, InputFields.endOfYear.vehicles, [
      {
        title: 'KB-521',
        details: '2021',
        value: '3100000',
      },
      {
        title: 'JU-329',
        details: '2012',
        value: '450000',
      },
    ])

    updateApplication(currentAnswers)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
