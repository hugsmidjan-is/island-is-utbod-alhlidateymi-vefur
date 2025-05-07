import React, { useRef } from 'react'

import {
  Box,
  Button,
  ButtonTypes,
  Link,
  Menu as MenuUI,
  VisuallyHidden,
} from '@island.is/island-ui/core'
import { SearchInput } from '@island.is/web/components'
import { LinkResolverResponse } from '@island.is/web/hooks/useLinkResolver'
import { useI18n } from '@island.is/web/i18n'
import type { LayoutProps } from '@island.is/web/layouts/main'

import { LanguageToggler } from '../LanguageToggler'

interface MegaMenuLink {
  href: LinkResolverResponse
  text: string
  dataTestId: string
  sub?: [MegaMenuLink]
}

interface Props {
  asideTopLinks: MegaMenuLink[]
  asideBottomTitle: string
  asideBottomLinks: MegaMenuLink[]
  mainLinks: MegaMenuLink[]
  buttonColorScheme?: ButtonTypes['colorScheme']
  onMenuOpen?: () => void
  organizationSearchFilter?: string
  languageToggleQueryParams?: LayoutProps['languageToggleQueryParams']
}

const minarsidurLink = '/minarsidur/'

export const Menu = ({
  asideTopLinks,
  asideBottomTitle,
  asideBottomLinks,
  mainLinks,
  buttonColorScheme = 'default',
  onMenuOpen,
  organizationSearchFilter,
  languageToggleQueryParams,
}: Props) => {
  const searchInput = useRef<HTMLInputElement>()

  return (
    <MenuUI
      baseId="Menu"
      mainLinks={mainLinks.map((item) => ({
        ...item,
        dataTestId: 'mega-menu-link',
      }))}
      asideTopLinks={asideTopLinks}
      asideBottomLinks={asideBottomLinks}
      mainTitle={'Þjónustuflokkar'}
      asideBottomTitle={asideBottomTitle}
      myPagesText={'Mínar síður'}
      closeButtonLabel={'Loka'}
      expandButtonLabel={'Opna allt'}
      collapseButtonLabel={'Loka öllu'}
      renderDisclosure={(
        disclosureDefault,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore make web strict
        { onClick, ...disclosureProps },
      ) => {
        return (
          <Box display="flex">
            <Box marginRight={1} display={['block', 'block', 'block', 'none']}>
              <Button
                {...disclosureProps}
                colorScheme={buttonColorScheme}
                variant="utility"
                icon="search"
                value={'Leita'}
                onClick={(e) => {
                  onClick(e)
                  setTimeout(() => {
                    if (searchInput.current) {
                      searchInput.current.focus()
                    }
                  }, 100)
                }}
              >
                <VisuallyHidden>{'Leit'}</VisuallyHidden>
              </Button>
            </Box>
            {disclosureDefault}
          </Box>
        )
      }}
      renderLogo={(logo, closeModal) => (
        <Link
          href={'/'}
          onClick={() => {
            closeModal?.()
          }}
        >
          <div>{logo}</div>
        </Link>
      )}
      menuButton={
        <Button
          variant="utility"
          icon="menu"
          colorScheme={buttonColorScheme}
          data-testid="frontpage-burger-button"
          onClick={onMenuOpen}
        >
          {'Valmynd'}
        </Button>
      }
      renderLink={({ className, text, href }, closeModal) => {
        return (
          <Link href={href} onClick={closeModal}>
            <span className={className}>{text}</span>
          </Link>
        )
      }}
      renderMyPagesButton={(button) => {
        return (
          <a tabIndex={-1} href={minarsidurLink}>
            {button}
          </a>
        )
      }}
      renderSearch={(input, closeModal) => (
        <SearchInput
          id="search_input_menu"
          size="medium"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore make web strict
          ref={searchInput}
          activeLocale={'is'}
          placeholder={'Leitaðu á Ísland.is'}
          autocomplete={true}
          autosuggest={true}
          onRouting={closeModal}
          skipContext
          organization={organizationSearchFilter}
        />
      )}
    />
  )
}
