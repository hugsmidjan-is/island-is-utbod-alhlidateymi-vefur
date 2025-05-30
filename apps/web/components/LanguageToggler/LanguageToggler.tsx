import { FC, ReactElement, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { useApolloClient } from '@apollo/client/react'

import {
  Button,
  ButtonProps,
  ButtonTypes,
  DialogPrompt,
  Hidden,
} from '@island.is/island-ui/core'
import { Locale } from '@island.is/shared/types'
import { GlobalContext } from '@island.is/web/context'
import {
  GetContentSlugQuery,
  GetContentSlugQueryVariables,
  TextFieldLocales,
} from '@island.is/web/graphql/schema'
import { useNamespace } from '@island.is/web/hooks'
import { LinkType, useLinkResolver } from '@island.is/web/hooks/useLinkResolver'
import { useI18n } from '@island.is/web/i18n'
import { LayoutProps } from '@island.is/web/layouts/main'
import { GET_CONTENT_SLUG } from '@island.is/web/screens/queries/Article'

type LanguageTogglerProps = {
  dialogId?: string
  hideWhenMobile?: boolean
  buttonColorScheme?: ButtonTypes['colorScheme']
  queryParams?: LayoutProps['languageToggleQueryParams']
}

export const LanguageToggler = ({
  hideWhenMobile,
  buttonColorScheme = 'default',
  dialogId = 'confirm-language-switch-dialog' +
    (!hideWhenMobile ? '-mobile' : ''),
  queryParams,
}: LanguageTogglerProps) => {
  const Router = useRouter()
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const { contentfulIds, resolveLinkTypeLocally, globalNamespace } =
    useContext(GlobalContext)

  const gn = useNamespace(globalNamespace)
  const otherLanguage = 'en' as Locale
  const { linkResolver, typeResolver } = useLinkResolver()

  const getOtherLanguagePath = async () => {
    if (showDialog) {
      return null
    }

    const pathWithoutQueryParams = Router.asPath.split('?')[0]

    if (!contentfulIds?.length) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore make web strict
      const { type } = typeResolver(pathWithoutQueryParams, true)
      const pagePath = linkResolver(type, [], otherLanguage).href

      if (pagePath === '/404') {
        return setShowDialog(true)
      } else {
        const queryParamsString = new URLSearchParams(
          queryParams?.[otherLanguage],
        ).toString()
        return Router.push(
          `${pagePath}${
            queryParamsString.length > 0 ? '?' + queryParamsString : ''
          }`,
        )
      }
    }

    // Create queries that fetch slug information from Contentful
    const queries = contentfulIds
      .filter(Boolean)
      .map((id) => getContentSlug(id))

    const responses = await Promise.all(queries)

    const secondContentSlug = null

    // We need to have a special case for subArticles since they've got a url field instead of a slug field

    const slugs: never[] = []
    let title: TextFieldLocales = { is: '', en: '' }
    let type: LinkType | '' = ''
    let activeTranslations = {}

    for (const res of responses) {
      const slug = null
      if (!slug) {
        break
      }
      slugs.push(slug)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore make web strict
      title = res.data?.getContentSlug?.title
      type = ''
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore make web strict
      activeTranslations = res.data?.getContentSlug?.activeTranslations
    }

    if ((type as string) === 'genericListItem' || resolveLinkTypeLocally) {
      const localType = typeResolver(pathWithoutQueryParams)?.type
      if (localType) {
        type = localType
      }
    }

    // Some content models are set up such that a slug is generated from the title
    // Unfortunately, Contentful generates slug for both locales which frequently
    // results in bogus english content. Therefore we check whether the other language has a title as well.
    if (
      type &&
      slugs.every((s) => s?.[otherLanguage]) &&
      title?.[otherLanguage] &&
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore make web strict
      (otherLanguage === 'is' || (activeTranslations?.[otherLanguage] ?? true))
    ) {
      const queryParamsString = new URLSearchParams(
        queryParams?.[otherLanguage],
      ).toString()

      return goToOtherLanguagePage(
        `${
          linkResolver(
            type as LinkType,
            slugs.map((s) => s[otherLanguage]),
            otherLanguage,
          ).href
        }${queryParamsString.length > 0 ? '?' : ''}${queryParamsString}`,
      )
    }

    setShowDialog(true)
  }

  const goToOtherLanguagePage = (path: string) => {
    'Change language to english'
    Router.push(path)
  }

  const onClick = async () => {
    await getOtherLanguagePath()
  }

  const getContentSlug = async (contentfulId: string) => {
    return { res: { data: null } }
  }
}

type ButtonElementProps = {
  buttonColorScheme?: ButtonTypes['colorScheme']
  otherLanguage: Locale
  otherLanguageAria: string
  onClick: () => void
}

const ButtonElement: FC<
  React.PropsWithChildren<ButtonElementProps & ButtonProps>
> = ({
  buttonColorScheme = 'default',
  otherLanguage,
  otherLanguageAria,
  onClick,
  children,
  ...props
}) => (
  <Button
    colorScheme={buttonColorScheme}
    variant="utility"
    data-testid="language-toggler"
    onClick={onClick}
    aria-label={otherLanguageAria}
    lang={otherLanguage === 'en' ? 'en' : 'is'}
    {...props}
  >
    {children}
  </Button>
)
