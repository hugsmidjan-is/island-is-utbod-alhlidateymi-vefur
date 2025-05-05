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
    { title: 'Skatturinn', href: '/skattur' },
    { title: 'Skattaskýrsla', href: '/skattaskyrsla', isCurrentPage: true },
  ]
  const processEntry = {
    processLink: '/umsoknir/skattaskyrsla',
    processTitle: 'Skila skattaskýrslu',
    buttonText: 'Skattaskýrsla',
    newTab: false,
  }
  const subArticle = undefined
  const activeSlug = 'skatturinn'

  const content = (
    <Box paddingTop={subArticle ? 2 : 4}>
      <Text as="h2" variant="h2" paddingBottom={4}>
        Skattaskýrsla er snilld
      </Text>
      <Text>
        Skattar eru lögbundin gjöld sem ríki leggja á einstaklinga og fyrirtæki
        til að fjármagna opinbera þjónustu, innviði og samfélagsleg verkefni,
        sem tryggja velferð og stöðugleika. Þeir eru nauðsynlegir til að
        viðhalda samfélagslegri uppbyggingu, svo sem heilbrigðisþjónustu,
        menntakerfi, samgöngum og öryggismálum. Skattar geta verið mismunandi
        eftir löndum og innihalda oft tekjuskatt, virðisaukaskatt,
        fasteignaskatt og fyrirtækjaskatt. Með því að greiða skatta stuðlum við
        að betra samfélagi fyrir alla.
      </Text>
      <Text as="h2" variant="h2" paddingBottom={4} paddingTop={4}>
        Spurt & svarað
      </Text>
      <Accordion>
        <AccordionItem
          id="income-tax"
          label={
            <Text variant="h3" as="h3">
              Tekjuskattur
            </Text>
          }
        >
          Tekjuskattur er skattur sem er lagður á tekjur einstaklinga og
          fyrirtækja.
        </AccordionItem>
        <AccordionItem
          id="vat"
          label={
            <Text variant="h3" as="h3">
              Virðisaukaskattur (VSK)
            </Text>
          }
        >
          Virðisaukaskattur er neysluskattur sem er lagður á vörur og þjónustu.
        </AccordionItem>
        <AccordionItem
          id="property-tax"
          label={
            <Text variant="h3" as="h3">
              Fasteignaskattur
            </Text>
          }
        >
          Fasteignaskattur er skattur sem er lagður á fasteignir og er reiknaður
          út frá fasteignamati.
        </AccordionItem>
        <AccordionItem
          id="corporate-tax"
          label={
            <Text variant="h3" as="h3">
              Fyrirtækjaskattur
            </Text>
          }
        >
          Fyrirtækjaskattur er skattur sem fyrirtæki greiða af hagnaði sínum.
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
                      {article.category.title}
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
                Skatturinn
              </span>
            </Text>
          )}
        </Box>
        {content}
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error make web strict
          article.organization.length > 0 && (
            <Box
              marginTop={[3, 3, 3, 10, 20]}
              marginBottom={[3, 3, 3, 10, 20]}
              printHidden
            >
              <InstitutionsPanel
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error make web strict
                img={article.organization[0].logo?.url ?? ''}
                institution={{
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error make web strict
                  title: article.organization[0].title,
                  label: 'Þjónustuaðili',

                  href: 'https://www.skattur.is',
                }}
                locale={'is'}
                contactText="Hafa samband"
              />
            </Box>
          )
        }
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
    title: 'Skattur',
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
        slug: 'skatturinn',
        phone: '+354 123 4567',
        id: 'skatturinn',
        title: 'Skatturinn',
        shortTitle: 'Skatturinn',
        tag: [],
        publishedMaterialSearchFilterGenericTags: [],
        footerItems: [
          {
            title: 'Skattur',
            id: '123',
            link: {
              text: 'Skattur',
              id: '123',
              date: '123',
              url: 'https://www.skattur.is',
            },
          },
        ],
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
        title: 'Undirflokkur 1',
        signLanguageVideo: {
          url: undefined,
        },
      },
      {
        __typename: 'SubArticle',
        slug: 'sub-article-2',
        title: 'Undirflokkur 2',
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
  { showFooter: false },
)
