import { Box, Button, Text } from '@island.is/island-ui/core'
import { taxOverviewConfirmation } from '../../lib/messages/tax.general'
import { useLocale } from '@island.is/localization'

type FormChapterProps = {
  title: string
  subTitle?: string
  editButton?: boolean
  children: React.ReactNode
  onClick?: () => void
}
export const FormChapter = ({
  children,
  title,
  editButton = true,
  subTitle,
  onClick,
}: FormChapterProps) => {
  const { formatMessage: f } = useLocale()

  return (
    <Box marginBottom={2}>
      <Box display="flex" justifyContent="spaceBetween" alignItems={'center'}>
        <Text variant="h3">{title}</Text>
        {editButton && (
          <Button variant="utility" icon="pencil" onClick={onClick}>
            {f(taxOverviewConfirmation.modify)}
          </Button>
        )}
      </Box>
      {!!subTitle && (
        <Box>
          <Text variant="h4">{subTitle}</Text>
        </Box>
      )}
      {children}
    </Box>
  )
}
