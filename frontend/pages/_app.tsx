import { NotificationsProvider } from '@mantine/notifications'
import { MantineProvider } from '@mantine/core'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import Layout from "../components/layout"
import { AuthProvider } from '../lib/context/AuthContext'
import { useAuth } from '../lib/hooks/useAuth'
import '../styles/globals.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}


export default function MyApp({ Component, pageProps }: AppProps) {
  const { user, login, logout } = useAuth();

  // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) =>
    <>
      <Layout>
        {page}
      </Layout>
    </>
  )

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        fontFamily: 'Mina, sans-serif',
        white: '#F8F8F8',
        black: '#2D2D2D',
        colors: {
          primary: [ // #2E294E
            "#636172",
            "#59566A",
            "#4F4C62",
            "#46435C",
            "#3E3A56",
            "#363152",
            "#2E294E",
            "#2C2843",
            "#29273A",
            "#262432",
          ],
          secondary: [ // #F46036
            "#FFE6DE",
            "#FFC1AE",
            "#FFA082",
            "#FF825B",
            "#FF6D42",
            "#F46036",
            "#FF3E04",
            "#FF2800",
            "#EF2400",
          ],
          darkBlack: [ // #2D2D2D
            "#505050",
            "#484848",
            "#424242",
            "#3C3C3C",
            "#363636",
            "#323232",
            "#2D2D2D",
            "#292929",
            "#242424",
            "#212121",
          ],
          lightBlack: [ // #434343
            "#777777",
            "#6C6C6C",
            "#626262",
            "#595959",
            "#515151",
            "#4A4A4A",
            "#434343",
            "#3C3C3C",
            "#363636",
            "#313131",
          ],
          jade: [ // '#57A773'
            "#C5FDD9",
            "#A5F4C1",
            "#8DE7AC",
            "#7AD89B",
            "#6CC88C",
            "#60B77F",
            "#57A773",
            "#479E65",
            "#389659",
            "#2A8F4D",
          ],
          yellow: [ // #FFF07C
            "#FFFFF9",
            "#FFFDC6",
            "#FFFC99",
            "#FFF07C",
            "#FFF945",
            "#FFF720",
            "#FFF600",
            "#FFEF00",
            "#F6D700",
            "#DEC200"
          ],
          red: [ // #C92A2A
            "#FFA8A8",
            "#FF7C7C",
            "#FF5555",
            "#FF3838",
            "#F92D2D",
            "#E52626",
            "#C92A2A",
            "#C31717",
            "#BF0606",
            "#BD0000",
          ],
          lightBlue: [ // #08B2E3
            "#98EFFF",
            "#6EE9FF",
            "#48E3FF",
            "#26DEFF",
            "#07D9FF",
            "#00CFFF",
            "#08B2E3",
            "#00ABE0",
            "#009ED1",
            "#008EBC",
          ],
          lightGrey: [ // #E4E4E4
            "#F2F2F2",
            "#F0F0F0",
            "#EDEDED",
            "#EBEBEB",
            "#E9E9E9",
            "#E6E6E6",
            "#E4E4E4",
            "#E2E2E2",
            "#DFDFDF",
            "#DDDDDD",
          ],
        },
        primaryColor: 'primary',
        colorScheme: 'dark',
      }}
    >
      <NotificationsProvider>
        <AuthProvider>
          {getLayout(<Component {...pageProps} />)}
        </AuthProvider>
      </NotificationsProvider>
    </MantineProvider>
  )
}

