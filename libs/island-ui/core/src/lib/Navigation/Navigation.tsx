import React, {
  FC,
  useState,
  useEffect,
  ReactNode,
  createContext,
  ReactElement,
} from 'react'
import cn from 'classnames'
import AnimateHeight from 'react-animate-height'
import { useMenuState, Menu, MenuButton, MenuStateReturn } from 'reakit/Menu'
import { theme, Colors } from '@island.is/island-ui/theme'
import { Text } from '../Text/Text'
import { Box } from '../Box/Box'
import { BoxProps } from '../Box/types'
import { FocusableBox } from '../FocusableBox/FocusableBox'
import { Icon } from '../IconRC/Icon'

import * as styles from './Navigation.css'
import { IconProps } from '../IconRC/types'
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden'

type NavigationContextProps = {
  baseId: string
  activeAccordions: Array<string>
  toggleAccordion: (id: string) => void
}

export const NavigationContext = createContext<NavigationContextProps>({
  baseId: '',
  activeAccordions: [],
  toggleAccordion: () => null,
})

export type NavigationColorAttributes =
  | 'color'
  | 'dividerColor'
  | 'backgroundColor'
  | 'activeColor'

const colorSchemeColors: Record<
  keyof typeof styles.colorScheme,
  Record<NavigationColorAttributes, Colors>
> = {
  blue: {
    color: 'blue600' as Colors,
    dividerColor: 'blue200' as Colors,
    backgroundColor: 'blue100' as Colors,
    activeColor: 'blue400' as Colors,
  },
  darkBlue: {
    color: 'white' as Colors,
    dividerColor: 'blue600' as Colors,
    backgroundColor: 'blue400' as Colors,
    activeColor: 'white' as Colors,
  },
  purple: {
    color: 'purple600' as Colors,
    dividerColor: 'purple200' as Colors,
    backgroundColor: 'purple100' as Colors,
    activeColor: 'purple400' as Colors,
  },
}

export interface NavigationItem {
  title: string
  href?: string
  active?: boolean
  accordion?: boolean
  items?: NavigationItem[]
  typename?: string
  slug?: string[]
}
interface MobileNavigationDialogProps {
  Title: ReactNode
  colorScheme: keyof typeof styles.colorScheme
  items: NavigationItem[]
  renderLink: NavigationTreeProps['renderLink']
  asSpan?: NavigationTreeProps['asSpan']
  isVisible: boolean
  onClick: () => void
  menuState: MenuStateReturn
  mobileNavigationButtonCloseLabel?: string
}

interface NavigationTreeProps {
  items: NavigationItem[]
  level?: Level
  colorScheme?: keyof typeof styles.colorScheme
  expand?: boolean
  expandOnActivation?: boolean
  renderLink?: (link: ReactElement, item?: NavigationItem) => ReactNode
  menuState: MenuStateReturn
  linkOnClick?: () => void
  id?: string
  labelId?: string
  asSpan?: boolean
}
export interface NavigationProps {
  title: string
  titleIcon?: Pick<IconProps, 'icon' | 'type'>

  label?: string
  activeItemTitle?: string
  colorScheme?: keyof typeof styles.colorScheme
  /**
   * Keep all child menu items expanded
   */
  expand?: boolean
  /**
   * Expand on link activation when link has sub items.
   */
  expandOnActivation?: boolean
  /**
   * Only a single acccordion can be expanded at a time
   */
  singleAccordion?: boolean
  isMenuDialog?: boolean
  titleLink?: Pick<NavigationItem, 'href' | 'active'>
  items: NavigationItem[]
  baseId: string
  /**
   * Render function for all links, useful for wrapping framework specific routing links
   */
  renderLink?: NavigationTreeProps['renderLink']
  /**
   * Wrap the link in a <span> instead of a <a> for passing in framework specific routing links
   */
  asSpan?: NavigationTreeProps['asSpan']
  titleProps?: NavigationItem
  mobileNavigationButtonOpenLabel?: string
  mobileNavigationButtonCloseLabel?: string
}

// The sidebar nav is not designed to show more than 2 levels.
type Level = keyof typeof styles.level

const MAX_LEVELS = 2

const basePadding = {
  paddingY: 1,
  paddingX: 3,
} as Pick<BoxProps, 'paddingY' | 'paddingX'>

const defaultLinkRender: NavigationTreeProps['renderLink'] = (link) => link

const toggleId = (arr: Array<string> = [], id: string, single = false) =>
  arr.includes(id) ? arr.filter((i) => i !== id) : [...(single ? [] : arr), id]

export const Navigation: FC<React.PropsWithChildren<NavigationProps>> = ({
  title = 'Efnisyfirlit',
  titleLink,
  titleIcon,
  activeItemTitle,
  label,
  colorScheme = 'blue',
  expand,
  singleAccordion = false,
  renderLink = defaultLinkRender,
  isMenuDialog = false,
  items,
  titleProps,
  baseId,
  asSpan,
  expandOnActivation,
  mobileNavigationButtonOpenLabel = 'Open',
  mobileNavigationButtonCloseLabel = 'Close',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [activeAccordions, setActiveAccordions] = useState<Array<string>>(
    () => {
      const initialActivePathIndex = items?.findIndex(
        (item) => item.active && item.accordion,
      )

      if (initialActivePathIndex > 0) {
        //first level only
        return [
          `1-${items?.findIndex(
            (item) =>
              item.active &&
              item.accordion &&
              item.items?.some((child) => child.active),
          )}`,
        ]
      }

      return []
    },
  )

  const color = colorSchemeColors[colorScheme]['color']
  const activeColor = colorSchemeColors[colorScheme]['activeColor']
  const backgroundColor = colorSchemeColors[colorScheme]['backgroundColor']
  const dividerColor = colorSchemeColors[colorScheme]['dividerColor']

  const menu = useMenuState({ animated: true, baseId, visible: false })

  useEffect(() => {
    setMobileMenuOpen(menu.visible)
  }, [menu.visible])

  const titleLinkProps = titleLink
    ? {
        href: titleLink.href,
      }
    : null

  const toggleAccordion = (id: string) => {
    setActiveAccordions(toggleId(activeAccordions, id, singleAccordion))
  }

  const Title: MobileNavigationDialogProps['Title'] = titleLinkProps ? (
    renderLink(
      <FocusableBox
        component={asSpan ? 'span' : 'a'}
        href={asSpan ? undefined : titleLink?.href}
        borderRadius="large"
        className={styles.link}
        {...basePadding}
      >
        {({ isFocused, isHovered }) => {
          const textColor =
            titleLink?.active || isFocused || isHovered ? activeColor : color

          return (
            <>
              <Text as="span" variant="h4" color={textColor}>
                {title}
              </Text>
              <Text
                as="span"
                variant="h4"
                color={titleLink?.active ? activeColor : color}
              >
                {title}
              </Text>
            </>
          )
        }}
      </FocusableBox>,
      titleProps,
    )
  ) : (
    <Box {...basePadding}>
      <Box display="flex" flexDirection="row" alignItems="center">
        {titleIcon && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginRight={1}
          >
            <Icon icon={titleIcon.icon} type="outline" color={color} />
          </Box>
        )}
        <Text as="span" variant="h4" color={color}>
          {title}
        </Text>
      </Box>
    </Box>
  )

  return (
    <NavigationContext.Provider
      value={{ baseId, activeAccordions, toggleAccordion }}
    >
      {isMenuDialog ? (
        <Box
          background={backgroundColor}
          alignItems="center"
          borderRadius="large"
          position="relative"
        >
          <MenuButton
            {...menu}
            className={styles.menuBtn}
            onClick={() => menu.show}
            aria-label={title}
          >
            <MobileButton
              title={activeItemTitle ?? title}
              titleIcon={titleIcon}
              colorScheme={colorScheme}
              aria-expanded={!mobileMenuOpen}
              mobileNavigationButtonOpenLabel={mobileNavigationButtonOpenLabel}
            />
          </MenuButton>
          <Menu
            {...menu}
            style={{
              top: '-10px',
              transform: 'none',
              width: '100%',
              borderRadius: '8px',
              zIndex: 1000000,
            }}
            className={cn(styles.transition, styles.menuShadow[colorScheme])}
          >
            <MobileNavigationDialog
              Title={Title}
              colorScheme={colorScheme}
              items={items}
              renderLink={renderLink}
              asSpan={asSpan}
              isVisible={mobileMenuOpen}
              menuState={menu}
              mobileNavigationButtonCloseLabel={
                mobileNavigationButtonCloseLabel
              }
              onClick={() => {
                menu.hide()
              }}
            />
          </Menu>
        </Box>
      ) : (
        <Box
          component="nav"
          borderRadius="large"
          paddingY={2}
          aria-label={label ?? title}
          background={backgroundColor}
          className={cn(styles.root, styles.colorScheme[colorScheme])}
        >
          {Title}
          <Box display="flex" alignItems="center" paddingY={2}>
            <Box background={dividerColor} className={styles.divider} />
          </Box>
          <NavigationTree
            id="desktop"
            items={items}
            asSpan={asSpan}
            colorScheme={colorScheme}
            renderLink={renderLink}
            menuState={menu}
            expand={expand}
            expandOnActivation={expandOnActivation}
          />
        </Box>
      )}
    </NavigationContext.Provider>
  )
}

const MobileNavigationDialog = ({
  Title,
  colorScheme,
  items,
  renderLink,
  onClick,
  menuState,
  asSpan,
  mobileNavigationButtonCloseLabel,
}: MobileNavigationDialogProps) => {
  return (
    <Box
      component="nav"
      background={colorSchemeColors[colorScheme]['backgroundColor']}
      paddingY={2}
      borderRadius={'large'}
    >
      <Box position="relative">
        {Title}
        <Box
          position="absolute"
          right={0}
          marginRight={2}
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          <FocusableBox
            component="button"
            onClick={onClick}
            background={colorSchemeColors[colorScheme]['dividerColor']}
            className={styles.dropdownIcon}
          >
            <VisuallyHidden>{mobileNavigationButtonCloseLabel}</VisuallyHidden>
            <Icon
              icon={'chevronUp'}
              size="small"
              color={colorSchemeColors[colorScheme]['color']}
            />
          </FocusableBox>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" paddingY={2}>
        <Box
          background={colorSchemeColors[colorScheme]['dividerColor']}
          className={styles.divider}
        />
      </Box>
      <NavigationTree
        id="mobile"
        items={items}
        asSpan={asSpan}
        colorScheme={colorScheme}
        renderLink={renderLink}
        menuState={menuState}
        linkOnClick={onClick}
      />
    </Box>
  )
}
interface MobileButtonProps {
  title: string
  titleIcon?: Pick<IconProps, 'icon' | 'type'>
  colorScheme: keyof typeof styles.colorScheme
  mobileNavigationButtonOpenLabel?: string
}

const MobileButton = ({
  title,
  colorScheme,
  titleIcon,
  mobileNavigationButtonOpenLabel,
}: MobileButtonProps) => {
  return (
    <Box
      component="span"
      display="flex"
      justifyContent="spaceBetween"
      alignItems="center"
      paddingX={2}
      paddingY={1}
    >
      <Box display="flex" flexDirection="row">
        {titleIcon && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginRight={1}
            id="mobile-title-icon"
          >
            <Icon
              icon={titleIcon.icon}
              type="outline"
              color={colorSchemeColors[colorScheme]['activeColor']}
            />
          </Box>
        )}
        <Text
          as="span"
          variant="h5"
          color={colorSchemeColors[colorScheme]['activeColor']}
        >
          {title}
        </Text>
      </Box>

      <Box
        component="span"
        position="absolute"
        right={0}
        marginRight={2}
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        <FocusableBox
          component="span"
          background={colorSchemeColors[colorScheme]['dividerColor']}
          className={styles.dropdownIcon}
        >
          <VisuallyHidden>{mobileNavigationButtonOpenLabel}</VisuallyHidden>
          <Icon
            icon={'chevronDown'}
            size="small"
            color={colorSchemeColors[colorScheme]['color']}
          />
        </FocusableBox>
      </Box>
    </Box>
  )
}

export const NavigationTree: FC<
  React.PropsWithChildren<NavigationTreeProps>
> = ({
  items,
  level = 1,
  colorScheme = 'blue',
  expand = false,
  renderLink = defaultLinkRender,
  menuState,
  linkOnClick,
  id = '',
  labelId = '',
  asSpan,
  expandOnActivation,
}: NavigationTreeProps) => {
  return (
    <NavigationContext.Consumer>
      {({ baseId, activeAccordions, toggleAccordion }) => (
        <Box
          component="ul"
          role="menu"
          {...(id && { id: `navigation-tree-${id}` })}
          {...(labelId && { 'aria-labelledby': labelId })}
          className={cn(styles.ul, styles.level[level])}
          style={{
            borderLeftColor:
              level > 1
                ? theme.color[colorSchemeColors[colorScheme]['dividerColor']]
                : undefined,
          }}
        >
          {items.map((item, index) => {
            const { title, href, items = [], active, accordion } = item
            const nextLevel: Level = (level + 1) as Level
            const isChildren = level > 1
            const showNextLevel =
              (active || expand) &&
              items.length &&
              nextLevel <= MAX_LEVELS &&
              !accordion
            const isAccordion = !!(
              items.length &&
              nextLevel <= MAX_LEVELS &&
              accordion
            )
            const accordionId = `${level}-${index}`
            const activeAccordion = activeAccordions.includes(accordionId)
            const labelId = `${baseId}-title-${accordionId}`
            const ariaId = `${baseId}-tree-${accordionId}`

            const nextLevelTree = (
              <NavigationTree
                id="accordion"
                items={items}
                level={nextLevel}
                asSpan={asSpan}
                colorScheme={colorScheme}
                expand={expand}
                renderLink={renderLink}
                menuState={menuState}
                linkOnClick={linkOnClick}
              />
            )

            return (
              <li key={index} className={styles.listItem} role="menuitem">
                {/*Note: Need to review usage (e.g. PortalNavigation) if we change the rendered element to something other than FocusableBox.*/}
                {renderLink(
                  <FocusableBox
                    component={asSpan ? 'span' : 'a'}
                    href={asSpan ? undefined : href}
                    borderRadius="large"
                    paddingLeft={isChildren ? 2 : 3}
                    paddingRight={2}
                    paddingY={isChildren ? 'smallGutter' : 1}
                    className={styles.link}
                    onClick={() => {
                      if (linkOnClick) {
                        linkOnClick()
                      }
                      if (isAccordion && expandOnActivation) {
                        toggleAccordion(accordionId)
                      }
                    }}
                  >
                    {({ isFocused, isHovered }) => {
                      const textColor =
                        active || isFocused || isHovered
                          ? colorSchemeColors[colorScheme]['activeColor']
                          : colorSchemeColors[colorScheme]['color']

                      return (
                        <span
                          className={cn(styles.text, {
                            [styles.textNarrower]: isAccordion,
                          })}
                        >
                          <Text
                            id={`navigation-title-${accordionId}${
                              id ? `-${id}` : ''
                            }`}
                            as="span"
                            color={textColor}
                            variant={isChildren ? 'small' : 'default'}
                            fontWeight={active ? 'semiBold' : 'light'}
                          >
                            {title}
                          </Text>
                        </span>
                      )
                    }}
                  </FocusableBox>,
                  item,
                )}
                {isAccordion && (
                  <FocusableBox
                    component="button"
                    onClick={() => {
                      toggleAccordion(accordionId)
                    }}
                    background={colorSchemeColors[colorScheme]['dividerColor']}
                    marginRight={2}
                    aria-expanded={activeAccordion}
                    aria-controls={'test2'}
                    className={cn(
                      styles.accordionIcon,
                      styles.largerClickableArea,
                    )}
                  >
                    <Icon
                      icon="add"
                      color={colorSchemeColors[colorScheme]['color']}
                      size="small"
                      className={cn(
                        styles.icon,
                        activeAccordion
                          ? styles.iconAddHidden
                          : styles.iconAddVisible,
                      )}
                    />
                    <Icon
                      icon="remove"
                      color={colorSchemeColors[colorScheme]['color']}
                      size="small"
                      className={cn(
                        styles.icon,
                        activeAccordion
                          ? styles.iconRemoveVisible
                          : styles.iconRemoveHidden,
                      )}
                    />
                  </FocusableBox>
                )}
                {isAccordion && (
                  <AnimateHeight
                    id={ariaId}
                    duration={300}
                    height={activeAccordion ? 'auto' : 0}
                    aria-labelledby={labelId}
                  >
                    {nextLevelTree}
                  </AnimateHeight>
                )}
                {!!showNextLevel && nextLevelTree}
              </li>
            )
          })}
        </Box>
      )}
    </NavigationContext.Consumer>
  )
}
