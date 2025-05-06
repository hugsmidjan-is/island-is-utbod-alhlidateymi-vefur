import { useEffect } from 'react'
import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import { useFormContext } from 'react-hook-form'
import { useApplication } from '../hooks/useUpdateApplication'
import { tax, taxGeneralInfo } from '../lib/messages'
import { InputFields, OJOIFieldBaseProps } from '../lib/types'
import {
  Box,
  Divider,
  GridColumn,
  GridRow,
  Stack,
  Text,
} from '@island.is/island-ui/core'
import { Property } from '../components/property/Property'
import {
  InputController,
  PhoneInputController,
} from '@island.is/shared/form-fields'
export const GeneralInfoScreen = (props: OJOIFieldBaseProps) => {
  const { formatMessage: f } = useLocale()
  const { updateApplicationV2 } = useApplication({
    applicationId: props.application.id,
  })

  useEffect(() => {
    updateApplicationV2({
      path: InputFields.generalInfo.user,
      value: {
        name: 'Jökull Þórðarson',
        nationalId: '120389-4569',
        address: 'Bláfjallagata 12',
        city: '105 Reykjavík',
      },
    })
  }, [])

  console.log('GeneralInfoScreen', props)
  return (
    <FormScreen goToScreen={props.goToScreen} title={f(tax.generalInfoTitle)}>
      <Box>
        <Box marginBottom={2}>
          <Text fontWeight="semiBold" variant="h4">
            {f(taxGeneralInfo.basicInfo)}
          </Text>
        </Box>
        <Stack space={0} dividers>
          <Property
            name={f(taxGeneralInfo.name)}
            value={props.application.answers.generalInfo?.user?.name}
          />
          <Property
            name={f(taxGeneralInfo.nationalId)}
            value={props.application.answers.generalInfo?.user?.nationalId}
          />
          <Property
            name={f(taxGeneralInfo.address)}
            value={props.application.answers.generalInfo?.user?.address}
          />
          <Property
            name={f(taxGeneralInfo.city)}
            value={props.application.answers.generalInfo?.user?.city}
          />
          <Divider />
        </Stack>
      </Box>
      <Box>
        <Box marginBottom={2}>
          <Text fontWeight="semiBold" variant="h4">
            {f(taxGeneralInfo.communication)}
          </Text>
        </Box>
        <GridRow>
          <GridColumn span={['1/1', '1/1', '1/1', '1/2']} paddingBottom={2}>
            <InputController
              id="email"
              name={InputFields.generalInfo.contact.email}
              label={f(taxGeneralInfo.email)}
              backgroundColor="blue"
              placeholder="nafn@netfang.is"
            />
          </GridColumn>
          <GridColumn span={['1/1', '1/1', '1/1', '1/2']} paddingBottom={2}>
            <PhoneInputController
              id="phone"
              name={InputFields.generalInfo.contact.phone}
              label={f(taxGeneralInfo.phone)}
              backgroundColor="blue"
              placeholder="123 4567"
            />
          </GridColumn>
        </GridRow>
      </Box>
    </FormScreen>
  )
}
