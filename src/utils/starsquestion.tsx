import { useEffect } from 'react'
import Router from 'next/router'

export const useWarnStars = () => {

    const message = 'Gostou? Se merece estrela no GitHub é só dar OK'

    useEffect(() => {
        const routeChangeStart = url => {
            if (Router.asPath !== url && confirm(message)) {
                Router.events.emit('routeChangeError')
                Router.push("https://github.com/aprendendofelipe/aluracord")
                throw 'Abort route change. Please ignore this error.'
            }
        }

        Router.events.on('routeChangeStart', routeChangeStart)

        return () => {
            Router.events.off('routeChangeStart', routeChangeStart)
        }
    }, [])
}