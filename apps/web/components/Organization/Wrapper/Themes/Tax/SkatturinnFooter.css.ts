import { globalStyle, style } from '@vanilla-extract/css'

import { dark400, theme } from '@island.is/island-ui/theme'

export const footerBg = style({
  background: '#100052',
  color: '#fff',
})

export const logoStyle = style({})

export const footerSecondRow = style({
  display: 'flex',
  minHeight: 72,
  alignItems: 'center',
  color: '#fff',
})

export const footerItemFirst = style({
  '@media': {
    [`screen and (max-width: ${theme.breakpoints.lg}px)`]: {
      maxWidth: 'none',
      flexBasis: '100%',
    },
  },
})

globalStyle(`${footerBg} a, ${footerBg} a:hover, ${footerBg} *`, {
  color: `#fff !important`,
  boxShadow: 'none !important',
})

globalStyle(
  `${footerSecondRow} a, ${footerSecondRow} a:hover,${footerSecondRow} * `,
  {
    boxShadow: `inset 0 -1px 0 0 ${dark400} !important`,
    color: '#fff',
  },
)

export const link = style({
  fontSize: '16px',
  textDecoration: 'underline',
  ':hover': {
    textDecoration: 'underline',
  },
})
