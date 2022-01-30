import NextHead from 'next/head';

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME

export function Head_app() {
    return (
        <NextHead>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <meta property="og:image" content="main-screen.png"></meta>
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