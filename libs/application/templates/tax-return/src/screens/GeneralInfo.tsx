import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
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
export const GeneralInfoScreen = ({
  application,
  errors,
  setSubmitButtonDisabled,
}: OJOIFieldBaseProps) => {
  const { formatMessage: f } = useLocale()

  const { externalData } = application
  return (
    <FormScreen title={f(tax.generalInfoTitle)}>
      <Box>
        <Box marginBottom={2}>
          <Text fontWeight="semiBold" variant="h4">
            {f(taxGeneralInfo.basicInfo)}
          </Text>
        </Box>
        <Stack space={0} dividers>
          <Property
            name={f(taxGeneralInfo.name)}
            value={externalData.getTaxNationalRegistryData.data.person.name}
          />
          <Property
            name={f(taxGeneralInfo.nationalId)}
            value={
              externalData.getTaxNationalRegistryData.data.person.nationalId
            }
          />
          <Property
            name={f(taxGeneralInfo.address)}
            value={
              externalData.getTaxNationalRegistryData.data.person.address
                ?.address
            }
          />
          <Property
            name={f(taxGeneralInfo.city)}
            value={`${externalData.getTaxNationalRegistryData.data.person.address?.postalCode} ${externalData.getTaxNationalRegistryData.data.person.address?.city}`}
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
              defaultValue=""
            />
          </GridColumn>
          <GridColumn span={['1/1', '1/1', '1/1', '1/2']} paddingBottom={2}>
            <PhoneInputController
              id="phone"
              name={InputFields.generalInfo.contact.phone}
              label={f(taxGeneralInfo.phone)}
              backgroundColor="blue"
              placeholder="123 4567"
              defaultValue=""
            />
          </GridColumn>
        </GridRow>
      </Box>
    </FormScreen>
  )
}
