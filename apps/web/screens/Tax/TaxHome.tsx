import NextLink from 'next/link'

import { ProcessEntry } from '@island.is/island-ui/contentful'
import {
  Accordion,
  AccordionItem,
  Box,
  BreadCrumbItem,
  Breadcrumbs,
  Button,
  Link,
  Navigation,
  Stack,
  Tag,
  Text,
} from '@island.is/island-ui/core'
import {
  HeadWithSocialSharing,
  InstitutionPanel,
  InstitutionsPanel,
  OrganizationFooter,
  SignLanguageButton,
  Sticky,
  Webreader,
} from '@island.is/web/components'
import {
  CustomPageUniqueIdentifier,
  Organization,
} from '@island.is/web/graphql/schema'
import { withMainLayout } from '@island.is/web/layouts/main'

import {
  CustomScreen,
  withCustomPageWrapper,
} from '../CustomPage/CustomPageWrapper'
import SidebarLayout from '../Layouts/SidebarLayout'

const TaxHome: CustomScreen<TaxProps> = ({ title, article }) => {
  const inStepperView = false
  const breadcrumbItems: Array<BreadCrumbItem> = [
    { title: 'Ísland.is', href: '/' },
    { title: 'Skatturinn', href: '/skattur' },
    { title: 'Skattaframtal', href: '/skattaskyrsla', isCurrentPage: true },
  ]
  const processEntry = {
    processLink: 'http://localhost:4242/umsoknir/skattaskyrsla',
    processTitle: 'Skila skattframtali',
    buttonText: 'Opna framtal',
    newTab: false,
  }
  const subArticle = undefined
  const activeSlug = 'skatturinn'

  const content = (
    <Box paddingTop={subArticle ? 2 : 4} paddingBottom={30}>
      <Text as="h2" variant="h2" paddingBottom={4} paddingTop={6}>
        Skilafrestur skattframtals einstaklinga er til þriðjudagsins 10. mars
      </Text>
      <Text paddingBottom={8}>
        Unnt er að sækja um lengri frest á þjónustuvef ríkisskattstjóra,
        skattur.is, og getur hann lengstur orðið til 13. mars. Framtal barns
        skal fylgja framtali framfæranda. Framtölum dánarbúa manna, sem létust á
        árinu 2018 eða fyrr, skal skila í framtalsfresti lögaðila, sem er til
        31. maí, ef skiptum var ekki lokið í árslok 2018. Þeir sem hafa atvinnu
        af framtalsaðstoð hafa rýmri tímamörk til skila samkvæmt sérstöku
        samkomulagi. Heimilt er að beita álagi á skattstofna ef framtali er ekki
        skilað á réttum tíma og eins ef framteljandi gefur rangar upplýsingar á
        framtali eða í fylgiskjölum.
      </Text>
      <Text as="h2" variant="h2" paddingBottom={2}>
        Leiðbeiningar og aðstoð við skattframtal
      </Text>
      <Text paddingBottom={6}>
        Leiðbeiningar um útfyllingu skattframtals einstaklinga eru nær eingöngu
        sóttar á netið. Hægt er að fá leiðbeiningarnar á pappír með því að sækja
        þær í næstu starfsstöð Skattsins.
      </Text>
      <Text as="h3" variant="h3" paddingBottom={2}>
        Þjónustuvefur Skattsins
      </Text>
      <Text paddingBottom={4}>
        Á <a href="https://www.skattur.is">þjónustuvef Skattsins</a> er hægt að
        skila skattframtali rafrænt. Þar eru einnig aðgengilegar leiðbeiningar
        um hvernig á að fylla út framtalið og hvaða upplýsingar þarf að hafa við
        höndina.
      </Text>

      <Text as="h3" variant="h3" paddingBottom={2}>
        Spjallmennið Askur
      </Text>
      <Text paddingBottom={4}>
        Á þjónustuvefnum er einnig spjallmenni, Askur, sem getur svarað ýmsum
        spurningum um skattframtalið. Askur getur veitt aðstoð á íslensku og
        ensku.
      </Text>

      <Text as="h3" variant="h3" paddingBottom={2}>
        Framtalsaðstoð
      </Text>
      <Text paddingBottom={8}>
        Ef frekari aðstoðar er þörf, er hægt að hafa samband við Skattinn í síma{' '}
        <a href="tel:44211414">442 1414</a> eða senda tölvupóst á netfangið{' '}
        <NextLink href="mailto:framtal@skatturinn.is">
          framtal@skatturinn.is
        </NextLink>
        .
      </Text>

      <Accordion>
        <AccordionItem
          id="income-tax"
          label={
            <Text variant="h4" as="h3">
              Hvenær þarf að skila skattframtali?
            </Text>
          }
        >
          Skilafrestur skattframtals einstaklinga er til þriðjudagsins 10. mars
        </AccordionItem>
        <AccordionItem
          id="vat"
          label={
            <Text variant="h4" as="h3">
              Er hægt að skila skattframtali með maka?
            </Text>
          }
        >
          Já það er hægt.
        </AccordionItem>
        <AccordionItem
          id="property-tax"
          label={
            <Text variant="h4" as="h3">
              Hverjir þurfa að skila skattframtali?
            </Text>
          }
        >
          Allir sem hafa náð 16 ára aldri í lok tekjuársins þurfa að skila
          skattframtali.
        </AccordionItem>
        <AccordionItem
          id="corporate-tax"
          label={
            <Text variant="h4" as="h3">
              Hvernig skila ég skattframtali?
            </Text>
          }
        >
          Skattframtali er skilað rafrænt á þjónustuvef Skattsins með rafrænum
          skilríkjum eða veflykli.
        </AccordionItem>
        <AccordionItem
          id="corporate-tax"
          label={
            <Text variant="h4" as="h3">
              Hvað ef ég er búsettur erlendis?
            </Text>
          }
        >
          Erlendis búsettir einstaklingar sem hafa tekjur eða eignir á Íslandi
          þurfa einnig að skila skattframtali. Ef viðkomandi hefur ekki rafræn
          skilríki eða veflykil, er hægt að sækja um nýjan veflykil.
        </AccordionItem>
      </Accordion>
    </Box>
  )

  return (
    <>
      <HeadWithSocialSharing
        title={title}
        description={article?.intro ?? ''}
        imageUrl={article?.featuredImage?.url}
        imageWidth={article?.featuredImage?.width.toString()}
        imageHeight={article?.featuredImage?.height.toString()}
        keywords={article?.keywords}
      />
      <SidebarLayout
        isSticky={false}
        sidebarContent={
          <Sticky>
            <Stack space={3}>
              {!!article?.category?.slug && (
                <Box display={['none', 'none', 'block']} printHidden>
                  <Link href="/" skipTab>
                    <Button
                      preTextIcon="arrowBack"
                      preTextIconType="filled"
                      size="small"
                      type="button"
                      variant="text"
                      truncate
                    >
                      Til baka
                    </Button>
                  </Link>
                </Box>
              )}

              {article?.organization && article.organization.length > 0 && (
                <InstitutionPanel
                  img={article.organization[0].logo?.url}
                  institutionTitle={'Skatturinn'}
                  institution={article.organization[0].title}
                  locale={'is'}
                  linkProps={{
                    href: 'https://www.skattur.is',
                  }}
                  imgContainerDisplay={['block', 'block', 'none', 'block']}
                />
              )}
              {article?.subArticles && article.subArticles.length > 0 && (
                <Navigation
                  baseId="articleNav"
                  title={'Efnisyfirlit'}
                  activeItemTitle={'Skatturinn'}
                  isMenuDialog={false}
                  renderLink={(link) => {
                    return (
                      <NextLink href="/" passHref legacyBehavior>
                        {link}
                      </NextLink>
                    )
                  }}
                  items={[
                    ...article.subArticles.map((item) => ({
                      title: item.title,
                      typename: item.__typename,
                      slug: item.slug.split('/'),
                      active: item.slug === 'skatturinn',
                    })),
                  ]}
                />
              )}
              <Box
                background="purple100"
                borderRadius="large"
                padding={[3, 3, 4]}
              >
                <Stack space={[1, 1, 2]}>
                  <Text variant="eyebrow" as="h2">
                    Tengt efni
                  </Text>

                  <Link
                    key={'url-1'}
                    href={'https://www.skatturinn.is'}
                    underline="normal"
                  >
                    <Text key={'url-1'} as="span">
                      Reiknivélar
                    </Text>
                  </Link>
                  <Link
                    key={'url-2'}
                    href={'https://www.skatturinn.is'}
                    underline="normal"
                  >
                    <Text key={'url-2'} as="span">
                      Staðgreiðsla
                    </Text>
                  </Link>
                  <Link
                    key={'url-3'}
                    href={'https://www.skatturinn.is'}
                    underline="normal"
                  >
                    <Text key={'url-3'} as="span">
                      Vaxtabætur og barnabætur
                    </Text>
                  </Link>
                  <Link
                    key={'url-4'}
                    href={'https://www.skatturinn.is'}
                    underline="normal"
                  >
                    <Text key={'url-4'} as="span">
                      Nýting séreignasparnaðar
                    </Text>
                  </Link>
                </Stack>
              </Box>
            </Stack>
          </Sticky>
        }
      >
        <Box
          paddingBottom={inStepperView ? undefined : [2, 2, 4]}
          display={inStepperView ? 'block' : ['none', 'none', 'block']}
          printHidden={!inStepperView}
        >
          <Box className="rs_read">
            <Breadcrumbs
              items={breadcrumbItems}
              renderLink={(link) => {
                return (
                  <NextLink
                    href={'https://www.skattur.is'}
                    passHref
                    legacyBehavior
                  >
                    {link}
                  </NextLink>
                )
              }}
            />
          </Box>
          {inStepperView && (
            <Box printHidden paddingY={2} display={['block', 'block', 'none']}>
              {article?.subArticles && article.subArticles.length > 0 && (
                <Navigation
                  baseId="articleNav"
                  title={'Header'}
                  activeItemTitle={
                    article?.subArticles.find(
                      (sub) => 'skattur' === sub.slug.split('/').pop(),
                    )?.title
                  }
                  isMenuDialog={false}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error make web strict
                  renderLink={(link, { typename, slug }) => {
                    return (
                      <NextLink
                        href={'https://www.skattur.is'}
                        passHref
                        legacyBehavior
                      >
                        {link}
                      </NextLink>
                    )
                  }}
                  items={[
                    {
                      title: article.shortTitle || article.title,
                      typename: article.__typename,
                      slug: [article.slug],
                      active: true,
                    },
                    ...article.subArticles.map((item) => ({
                      title: item.title,
                      typename: item.__typename,
                      slug: item.slug.split('/'),
                      active: false,
                    })),
                  ]}
                />
              )}
            </Box>
          )}
        </Box>
        <Box
          paddingBottom={inStepperView ? undefined : [2, 2, 4]}
          display={['flex', 'flex', 'none']}
          justifyContent="spaceBetween"
          alignItems="center"
          printHidden
        >
          {!!article?.category?.title && (
            <Box flexGrow={1} marginRight={6} overflow={'hidden'}>
              <Link href={'/categoryhref'} skipTab>
                <Button
                  preTextIcon="arrowBack"
                  preTextIconType="filled"
                  size="small"
                  type="button"
                  variant="text"
                  truncate
                >
                  {article.category.title}
                </Button>
              </Link>
            </Box>
          )}
          {article?.organization && article.organization.length > 0 && (
            <Box minWidth={0}>
              {article.organization[0].link ? (
                <Link href={article.organization[0].link} skipTab>
                  <Tag variant="purple" truncate>
                    Skatturinn
                  </Tag>
                </Link>
              ) : (
                <Tag variant="purple" truncate disabled>
                  Skatturinn
                </Tag>
              )}
            </Box>
          )}
        </Box>
        <Box>
          {!inStepperView && (
            <Text variant="h1" as="h1">
              <span id={'skattur'} className="rs_read">
                {article?.title}
              </span>
            </Text>
          )}

          {!inStepperView && (
            <Box
              display="flex"
              alignItems="center"
              columnGap={2}
              flexWrap="wrap"
            >
              {!inStepperView && (
                <Webreader
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error make web strict
                  readId={null}
                  readClass="rs_read"
                />
              )}
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error make web strict
                article.signLanguageVideo?.url && (
                  <SignLanguageButton
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error make web strict
                    videoUrl={(subArticle ?? article).signLanguageVideo.url}
                    videoThumbnailImageUrl={undefined}
                    content={
                      <>
                        {!inStepperView && (
                          <Text variant="h2">
                            <span
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-expect-error make web strict
                              id={slugify((subArticle ?? article).title)}
                              className="rs_read"
                            >
                              {(subArticle ?? article).title}
                            </span>
                          </Text>
                        )}
                        {content}
                      </>
                    }
                  />
                )
              }
            </Box>
          )}

          {!inStepperView && (
            <Box marginTop={3} display={['block', 'block', 'none']} printHidden>
              {article?.subArticles && article.subArticles.length > 0 && (
                <Navigation
                  baseId="articleNav"
                  title={'Skattur'}
                  activeItemTitle={
                    !activeSlug
                      ? article?.shortTitle || article?.title
                      : article?.subArticles.find(
                          (sub) => activeSlug === sub.slug.split('/').pop(),
                        )?.title
                  }
                  isMenuDialog={false}
                  renderLink={(link) => {
                    return (
                      <NextLink
                        href={'https://www.skattur.is'}
                        passHref
                        legacyBehavior
                      >
                        {link}
                      </NextLink>
                    )
                  }}
                  items={[
                    {
                      title: article.shortTitle || article.title,
                      typename: article.__typename,
                      slug: [article.slug],
                      active: !activeSlug,
                    },
                    ...article.subArticles.map((item) => ({
                      title: item.title,
                      typename: item.__typename,
                      slug: item.slug.split('/'),
                      active: activeSlug === item.slug.split('/').pop(),
                    })),
                  ]}
                />
              )}
            </Box>
          )}
          {processEntry?.processLink && (
            <Box
              marginTop={3}
              display={['none', 'none', 'block']}
              printHidden
              className="rs_read"
            >
              <ProcessEntry {...processEntry} />
            </Box>
          )}

          {!inStepperView && subArticle && (
            <Text variant="h2" as="h2" paddingTop={7}>
              <span id={'Skatturinn'} className="rs_read">
                Skattaframtal
              </span>
            </Text>
          )}
        </Box>
        {content}
      </SidebarLayout>
      <div>
        <OrganizationFooter
          organizations={article?.organization as Organization[]}
          force
        />
      </div>
    </>
  )
}

interface SkatturArticle {
  __typename: string
  slug: string
  title: string
  intro: string
  shortTitle: string
  showTableOfContents: boolean
  relatedArticles: []
  subArticles: Array<{
    __typename: string
    slug: string
    title: string
    signLanguageVideo: { url?: string }
  }>
  category: {
    slug: string
    title: string
  }
  featuredImage: {
    url: string
    width: number
    height: number
  }
  keywords: string[]
  organization?: Organization[]
}

interface TaxProps {
  title: string
  article: SkatturArticle
}

TaxHome.getProps = async () => {
  const article: SkatturArticle = {
    title: 'Skattaframtal',
    category: { slug: 'skattur', title: 'Skattur' },
    intro:
      'Skattur er nauðsynlegur þáttur í samfélaginu okkar. Hann er notaður til að fjármagna opinberar þjónustur og verkefni sem eru mikilvæg fyrir velferð okkar allra.',
    featuredImage: {
      url: 'https://example.com/image.jpg',
      width: 1200,
      height: 630,
    },
    keywords: ['skattur', 'fjármögnun', 'opinber þjónusta'],
    showTableOfContents: false,
    relatedArticles: [],
    organization: [
      {
        email: 'Skattur@skattur.is',
        slug: 'skatturinnn',
        phone: '+354 123 4567',
        id: 'skatturinn',
        title: 'Skatturinn',
        shortTitle: 'Skatturinn',
        tag: [],
        publishedMaterialSearchFilterGenericTags: [],
        footerItems: [],
        logo: {
          url: 'https://www.skatturinn.is/skin/v2/i/fav.png',
          width: 120,
          height: 60,
          contentType: 'image/jpeg',
          id: 'logo-id',
          title: 'Skatturinn Logo',
        },
      },
    ],
    __typename: '',
    slug: '',
    shortTitle: '',
    subArticles: [
      {
        __typename: 'SubArticle',
        slug: 'sub-article-1',
        title: 'Álagningarseðill og forsendur',
        signLanguageVideo: {
          url: undefined,
        },
      },
      {
        __typename: 'SubArticle',
        slug: 'skatturinn',
        title: 'Framtalsleiðbeiningar',
        signLanguageVideo: {
          url: undefined,
        },
      },
      {
        __typename: 'SubArticle',
        slug: 'skatturinn-2',
        title: 'Rafræn skilríki og veflyklar',
        signLanguageVideo: {
          url: undefined,
        },
      },
      {
        __typename: 'SubArticle',
        slug: 'skatturinn-3',
        title: 'Staðfest afrit framtals',
        signLanguageVideo: {
          url: undefined,
        },
      },
      {
        __typename: 'SubArticle',
        slug: 'skatturinn-4',
        title: 'Niðurstöður álagningar',
        signLanguageVideo: {
          url: undefined,
        },
      },
      {
        __typename: 'SubArticle',
        slug: 'skatturinn-5',
        title: 'Eignir og skuldir',
        signLanguageVideo: {
          url: undefined,
        },
      },
    ],
  }
  return {
    title: 'Tax',
    article,
  }
}

export default withMainLayout(
  withCustomPageWrapper(
    CustomPageUniqueIdentifier.OfficialJournalOfIceland,
    TaxHome,
  ),
)
