import { CustomPageUniqueIdentifier } from '@island.is/web/graphql/schema'
import { withMainLayout } from '@island.is/web/layouts/main'

import {
  CustomScreen,
  withCustomPageWrapper,
} from '../CustomPage/CustomPageWrapper'

const TaxHome: CustomScreen<TaxProps> = ({ title }) => {
  return <div>{title}</div>
}

interface TaxProps {
  title: string
}

TaxHome.getProps = async () => {
  return {
    title: 'Tax',
  }
}

export default withMainLayout(
  withCustomPageWrapper(
    CustomPageUniqueIdentifier.OfficialJournalOfIceland,
    TaxHome,
  ),
)
