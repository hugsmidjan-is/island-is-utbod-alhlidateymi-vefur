import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import { tax, taxGeneralInfo } from '../lib/messages'
import { OJOIFieldBaseProps } from '../lib/types'
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
  console.log('GeneralInfoScreen', props)

  return (
    <FormScreen
      goToScreen={props.goToScreen}
      title={f(tax.generalInfoTitle)}
      // intro={f(tax.generalInfoIntro)}
    >
      <Box>
        <Box marginBottom={2}>
          <Text fontWeight="semiBold" variant="h4">
            {f(taxGeneralInfo.basicInfo)}
          </Text>
        </Box>
        <Stack space={0} dividers>
          <Property name={f(taxGeneralInfo.name)} value="Jökull Þórðarson" />
          <Property name={f(taxGeneralInfo.nationalId)} value="120389-4569" />
          <Property name={f(taxGeneralInfo.address)} value="Bláfjallagata 12" />
          <Property name={f(taxGeneralInfo.city)} value="105 Reykjavík" />
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
          <GridColumn span={['1/1', '1/2']} paddingBottom={2}>
            <InputController
              id="email"
              name="email"
              label={f(taxGeneralInfo.email)}
              backgroundColor="blue"
              placeholder="nafn@netfang.is"
            />
          </GridColumn>
          <GridColumn span={['1/1', '1/2']} paddingBottom={2}>
            <PhoneInputController
              id="phone"
              name="phone"
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
