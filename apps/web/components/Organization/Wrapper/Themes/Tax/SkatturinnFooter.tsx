import React, { ReactNode, useContext } from 'react'
import { BLOCKS } from '@contentful/rich-text-types'

import { SliceType } from '@island.is/island-ui/contentful'
import {
  Box,
  GridColumn,
  GridContainer,
  GridRow,
  LinkV2,
  Text,
} from '@island.is/island-ui/core'
import { GlobalContext } from '@island.is/web/context'
import { FooterItem } from '@island.is/web/graphql/schema'
import { useLinkResolver, useNamespace } from '@island.is/web/hooks'
import { webRichText } from '@island.is/web/utils/richText'

import * as styles from './SkatturinnFooter.css'

interface FooterProps {
  footerItems: Array<FooterItem>
  namespace: Record<string, string>
  organizationSlug: string
}

const SkatturinnFooter: React.FC<React.PropsWithChildren<FooterProps>> = ({
  footerItems,
  namespace,
  organizationSlug,
}) => {
  const n = useNamespace(namespace)
  const isServiceWeb = true
  const { linkResolver } = useLinkResolver()

  return (
    <footer>
      <Box className={styles.footerBg} color="white" paddingTop={5}>
        <GridContainer>
          <Box paddingTop={[2, 2, 0]} paddingBottom={[0, 0, 4]}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              paddingBottom={4}
              marginBottom={4}
              borderColor="dark400"
              borderBottomWidth="standard"
            >
              <Box marginRight={4}>
                <svg
                  width="199"
                  height="52"
                  viewBox="0 0 199 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M61.2086 35.6158V31.7189C63.7086 32.5704 65.9486 32.8709 67.5986 32.8709C70.2186 32.8709 71.3986 31.9593 71.3986 30.5969C71.3986 29.3246 70.6886 28.6534 68.4586 28.3229L66.3986 28.0023C62.9586 27.5314 61.0986 25.8485 61.0986 22.5125C61.0986 19.0063 63.7786 16.3215 69.0786 16.3215C70.9586 16.3215 72.9086 16.562 75.2886 17.173V20.9798C72.9386 20.2084 71.0486 19.978 69.4886 19.978C66.9286 19.978 65.7486 20.7694 65.7486 22.1319C65.7486 23.344 66.4586 24.0152 68.6886 24.3458L70.6886 24.6363C74.0986 25.1672 76.0186 26.9103 76.0186 30.2162C76.0186 33.9028 73.3386 36.4974 67.9186 36.4974C66.0686 36.4974 63.8886 36.267 61.2086 35.6158Z"
                    fill="white"
                  ></path>
                  <path
                    d="M82.9384 30.4766V36.2268H78.6084V15.3497H82.9384V26.9103H84.6184C85.9684 25.2273 87.0884 23.6044 88.0684 21.7812H92.9284C91.5984 24.1954 90.1284 26.4094 88.3084 28.5332C90.2484 31.1278 91.5784 33.4319 93.1084 36.2268H88.0784C87.0184 34.1331 85.9884 32.4501 84.6084 30.4766H82.9384Z"
                    fill="white"
                  ></path>
                  <path
                    d="M100.749 33.6622C101.489 33.6622 102.129 33.6021 102.959 33.4318V30.0658L100.869 30.1259C98.9791 30.156 98.1891 30.7771 98.1891 31.8991C98.1891 33.2816 99.0991 33.6622 100.749 33.6622ZM100.369 36.4672C96.2491 36.4672 94.0391 34.9946 94.0391 32.0995C94.0391 29.3546 95.7791 27.7918 99.6891 27.7317L102.959 27.6415C102.959 25.3675 102.079 24.6061 99.8991 24.6061C98.5991 24.6061 97.1291 24.8165 95.0691 25.3475V22.1919C97.1591 21.7511 99.2191 21.4806 100.869 21.4806C105.019 21.4806 107.139 23.424 107.139 27.3811V35.6658C104.809 36.1767 102.309 36.4672 100.369 36.4672Z"
                    fill="white"
                  ></path>
                  <path
                    d="M116.558 36.4373C112.968 36.4373 110.968 34.7543 110.968 31.2481V24.9669H109.028V21.7812H110.968V18.3551L115.238 17.3834V21.7812H118.828V24.9669H115.238V30.3364C115.238 32.2498 115.888 32.9611 117.678 32.9912C117.998 32.9912 118.358 32.9912 118.828 32.901V36.2369C118.148 36.3471 117.378 36.4373 116.558 36.4373Z"
                    fill="white"
                  ></path>
                  <path
                    d="M127.859 36.4373C124.269 36.4373 122.269 34.7543 122.269 31.2481V24.9669H120.329V21.7812H122.269V18.3551L126.539 17.3834V21.7812H130.129V24.9669H126.539V30.3364C126.539 32.2498 127.189 32.9611 128.979 32.9912C129.299 32.9912 129.659 32.9912 130.129 32.901V36.2369C129.449 36.3471 128.689 36.4373 127.859 36.4373Z"
                    fill="white"
                  ></path>
                  <path
                    d="M132.519 30.6271V21.7814H136.849V30.2464C136.849 32.4904 137.789 33.0814 139.499 33.0814C140.149 33.0814 140.849 32.9612 141.559 32.7909V21.7814H145.889V35.646C143.679 36.0868 141.059 36.4675 139.029 36.4675C134.749 36.4675 132.519 34.5541 132.519 30.6271Z"
                    fill="white"
                  ></path>
                  <path
                    d="M157.858 24.967C157.268 24.8769 156.768 24.7867 156.088 24.7867C155.298 24.7867 154.528 24.8769 153.528 25.0772V36.227H149.198V22.4626C151.578 21.7814 153.528 21.4908 155.378 21.4908C156.258 21.4908 157.058 21.581 157.848 21.6712V24.967H157.858Z"
                    fill="white"
                  ></path>
                  <path
                    d="M164.519 36.237H160.189V21.7814H164.519V36.237ZM160.129 15.7006H164.549V19.3871H160.129V15.7006Z"
                    fill="white"
                  ></path>
                  <path
                    d="M167.838 22.6326C170.718 21.8412 172.958 21.4806 175.078 21.4806C179.348 21.4806 181.348 23.424 181.348 27.351V36.2268H177.048V27.7417C177.048 25.4977 176.108 24.9067 174.398 24.9067C173.688 24.9067 172.928 25.0269 172.158 25.2874V36.2268H167.828V22.6326H167.838Z"
                    fill="white"
                  ></path>
                  <path
                    d="M184.599 22.6326C187.479 21.8412 189.719 21.4806 191.839 21.4806C196.109 21.4806 198.109 23.424 198.109 27.351V36.2268H193.809V27.7417C193.809 25.4977 192.869 24.9067 191.159 24.9067C190.449 24.9067 189.689 25.0269 188.919 25.2874V36.2268H184.589V22.6326H184.599Z"
                    fill="white"
                  ></path>
                  <path
                    d="M29.199 21.1702C31.429 21.1702 33.529 22.0417 35.109 23.6245L39.999 28.5232C40.429 28.954 40.429 29.6552 39.999 30.086L39.189 30.8974L25.489 44.6519H25.499L24.009 46.1445C23.619 46.5352 23.619 47.1764 24.009 47.5771L27.729 51.3037C28.129 51.6944 28.759 51.6944 29.159 51.3037L50.449 29.9758C50.609 29.8155 50.719 29.6152 50.749 29.3948C50.789 29.0942 50.689 28.7937 50.479 28.5833L39.079 17.153C36.969 15.0393 34.159 13.8772 31.169 13.8772H28.049C27.239 13.8772 26.459 14.1978 25.889 14.7688L19.499 21.1702H29.199Z"
                    fill="white"
                  ></path>
                  <path
                    d="M15.6287 28.0523L10.8887 23.3039C10.6087 23.0234 10.4687 22.6427 10.5087 22.242C10.5387 21.9214 10.6987 21.6209 10.9287 21.3905L11.5287 20.7894L11.5187 20.7995L26.8487 5.45219C27.2487 5.06149 27.2487 4.42035 26.8487 4.01964L23.1187 0.293021C22.7287 -0.0976735 22.0887 -0.0976735 21.6887 0.293021L0.308661 21.7111C0.148661 21.8714 0.038661 22.0717 0.00866096 22.2921C-0.031339 22.5926 0.068661 22.8932 0.278661 23.1035L11.6787 34.5238C13.7887 36.6376 16.5987 37.7997 19.5887 37.7997H22.6587C23.4687 37.7997 24.2487 37.4791 24.8187 36.9081L31.2187 30.4967H21.5387C19.3287 30.5067 17.1987 29.6251 15.6287 28.0523Z"
                    fill="white"
                  ></path>
                </svg>
              </Box>
            </Box>
            <GridRow>
              {isServiceWeb && (
                <>
                  <GridColumn span={['0', '0', '3/12', '3/12']}></GridColumn>
                  <GridColumn
                    paddingBottom={[3, 3, 0]}
                    span={['1/1', '5/12', '5/12', '4/12']}
                  >
                    <Box>
                      <Text fontWeight="semiBold">
                        {n(
                          'serviceWebFooterFirstColumnTitle',
                          'Þjónustuver og símatími',
                        )}
                      </Text>
                      <Box>
                        <Box
                          display={['block', 'block', 'block', 'flex']}
                          justifyContent="spaceBetween"
                        >
                          <Text>
                            {n(
                              'serviceWebFooterMondayToThursdayTitle',
                              'Mánudaga - fimmtudaga:',
                            )}
                          </Text>
                          <Text>
                            {n(
                              'serviceWebFooterMondayToThursdayOpeningHours',
                              '9:00 - 15:30',
                            )}
                          </Text>
                        </Box>
                        <Box
                          display={['block', 'block', 'block', 'flex']}
                          justifyContent="spaceBetween"
                        >
                          <Text>
                            {n('serviceWebFooterFridayTitle', 'Föstudaga:')}
                          </Text>
                          <Text>
                            {n(
                              'serviceWebFooterFridayOpeningHours',
                              '9:00 - 14:00',
                            )}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  </GridColumn>
                  <GridColumn
                    paddingBottom={[3, 3, 0]}
                    offset={['0', '0', '0', '1/12']}
                    span={['1/1', '5/12', '4/12', '3/12']}
                  >
                    <Box>
                      <Text fontWeight="semiBold">
                        {n('serviceWebFooterTelephone', 'Sími: 442 1000')}
                      </Text>
                      <LinkV2
                        underlineVisibility="always"
                        underline="small"
                        className={styles.link}
                        href={n(
                          'serviceWebFooterContactLinkHref',
                          linkResolver('servicewebcontact', [organizationSlug])
                            .href,
                        )}
                      >
                        {n('serviceWebFooterContactLinkTitle', 'Hafðu samband')}
                      </LinkV2>
                    </Box>
                  </GridColumn>
                </>
              )}
              {!isServiceWeb &&
                footerItems.slice(0, 4).map((item, index) => (
                  <GridColumn
                    span={['12/12', '12/12', '6/12', '3/12']}
                    key={`footer-main-row-column-${index}`}
                  >
                    <Box>
                      <Box marginBottom={2}>
                        {webRichText(item.content as SliceType[])}
                      </Box>
                    </Box>
                  </GridColumn>
                ))}
            </GridRow>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            paddingTop={4}
            paddingBottom={4}
            borderColor="dark400"
            borderTopWidth="standard"
          >
            <GridContainer>
              <GridRow>
                <GridColumn
                  span={['12/12', '12/12', '6/12', '3/12']}
                  className={styles.footerSecondRow}
                ></GridColumn>
                <GridColumn
                  span={['12/12', '12/12', '6/12', '3/12']}
                  className={styles.footerSecondRow}
                >
                  <Box>
                    {webRichText(
                      (footerItems?.[4]?.[
                        isServiceWeb ? 'serviceWebContent' : 'content'
                      ] ?? []) as SliceType[],
                      {
                        renderNode: {
                          [BLOCKS.PARAGRAPH]: (
                            _node: never,
                            children: ReactNode,
                          ) => (
                            <Text variant="small" color="dark400" marginY={1}>
                              {children}
                            </Text>
                          ),
                        },
                      },
                    )}
                  </Box>
                </GridColumn>
                {footerItems.slice(5, 7).map((item, index) => (
                  <GridColumn
                    span={['12/12', '12/12', '6/12', '3/12']}
                    className={styles.footerSecondRow}
                    key={`footer-secondary-row-column-${index}`}
                  >
                    <Box>
                      {webRichText(
                        item[
                          isServiceWeb ? 'serviceWebContent' : 'content'
                        ] as SliceType[],
                        {
                          renderNode: {
                            [BLOCKS.PARAGRAPH]: (
                              _node: never,
                              children: ReactNode,
                            ) => (
                              <Text variant="small" color="dark400" marginY={1}>
                                {children}
                              </Text>
                            ),
                          },
                        },
                      )}
                    </Box>
                  </GridColumn>
                ))}
              </GridRow>
            </GridContainer>
          </Box>
        </GridContainer>
      </Box>
    </footer>
  )
}

export default SkatturinnFooter
