import { AnyARecord } from 'dns'

import TaxHome from '@island.is/web/screens/Tax/TaxHome'
import { getServerSidePropsWrapper } from '@island.is/web/utils/getServerSidePropsWrapper'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore make web strict
const Screen = TaxHome

export default Screen

export const getServerSideProps = getServerSidePropsWrapper(TaxHome)
