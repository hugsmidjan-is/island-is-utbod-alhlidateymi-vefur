import { theme } from '@island.is/island-ui/theme'
import { style } from '@vanilla-extract/css'

export const propertyWrap = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing[2],
  padding: theme.spacing[2],
})

export const property = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  minWidth: 230,
})
