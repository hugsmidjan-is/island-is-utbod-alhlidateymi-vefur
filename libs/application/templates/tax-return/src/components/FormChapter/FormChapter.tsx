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
      <Box display="flex" justifyContent="spaceBetween" marginBottom={4}>
        <Text variant="h3">{title}</Text>
        {editButton && (
          <Button variant="utility" icon="pencil" onClick={onClick}>
            {f(taxOverviewConfirmation.modify)}
          </Button>
        )}
      </Box>
      {!!subTitle && (
        <Box marginBottom={4}>
          <Text variant="h5">{subTitle}</Text>
        </Box>
      )}
      {children}
    </Box>
  )
}
