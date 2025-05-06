import dynamic from 'next/dynamic'

import DefaultHeader from './SkatturinnDefaultHeader'

export const SkatturinnDefaultHeader = DefaultHeader

export const SkatturinnFooter = dynamic(() => import('./SkatturinnFooter'), {
  ssr: true,
})
