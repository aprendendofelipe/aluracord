import NextHead from 'next/head';

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME
const DESCRIPTION = "Agregador de servidores Aluracord"

export function Head_app() {
    return (
        <NextHead>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <meta property="og:url" content="https://discordia-gamma.vercel.app/" key="ogurl" />
            <meta property="og:image" content="https://discordia-gamma.vercel.app/main-screen.png" key="ogimage" />
            <meta property="og:site_name" content={APP_NAME} key="ogsitename" />
            <meta property="og:title" content={APP_NAME} key="ogtitle" />
            <meta property="og:description" content={DESCRIPTION} key="ogdesc" />
            <meta name="description" content={DESCRIPTION} />
        </NextHead>
    )
}

export function PageSubtitle({ children = undefined }) {
    return (
        <NextHead>
            <title>
                {children ? APP_NAME + " | " + children : APP_NAME}
            </title>
        </NextHead>
    )
}

export default NextHead