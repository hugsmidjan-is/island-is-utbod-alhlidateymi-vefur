import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import { tax } from '../lib/messages'
import { OJOIFieldBaseProps } from '../lib/types'
import { useState } from 'react'
import { Button } from '@island.is/island-ui/core'
import { Advert } from '../fields/Advert'
import { SignaturesField } from '../fields/Signatures'
import { AdvertModal } from '../fields/AdvertModal'
export const EndOfYearScreen = (props: OJOIFieldBaseProps) => {
  const { formatMessage: f } = useLocale()
  const [modalVisible, setModalVisability] = useState(false)

  return (
    <FormScreen
      goToScreen={props.goToScreen}
      title={f(tax.lastIncomeTitle)}
      intro={f(tax.lastIncomeIntro)}
    >
      <p>EndOfYearScreen</p>
    </FormScreen>
  )
}
