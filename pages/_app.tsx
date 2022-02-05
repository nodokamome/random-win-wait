import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { DefaultSeo } from 'next-seo'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
      <DefaultSeo
        defaultTitle='当たり待ち'
        canonical={process.env.URL}
        description='当たるまで待つだけの確率シミュレーション'
        twitter={{
          handle: '@nodokamome',
          site: '@nodokamome',
          cardType: 'summary',
        }}
        openGraph={{
          type: 'website',
          title: '当たり待ち',
          description: '当たるまで待つだけの確率シミュレーション',
          site_name: '当たり待ち',
          url: `${process.env.URL}`,
          // TODO OGP画像
          images: [
            {
              url: `${process.env.URL}/ogp.png`,
              width: 800,
              height: 600,
              alt: '当たり待ちのOGP画像',
            }],
        }}
      />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.GA_MEASUREMENT_ID}');
          `}
      </Script>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
