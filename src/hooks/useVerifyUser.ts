import { useRef } from 'react'
import useDebounce from './useAdaptiveDebounce'

export default function useVerifyUser() {
    const abortRef = useRef(null)
  
    const clearUsername = {
        username: '',
        name: 'Insira um usuário válido',
        userImgURL: '/github_sunglasses.svg'
    }
  
    async function verifyUser(username: string) {
        if (!username || typeof username !== 'string') return clearUsername
        username = username.trim()
        let userData = clearUsername
        const abortController = new AbortController()
        abortRef.current = abortController
        const signal = abortController.signal
        await fetch(`https://api.github.com/users/${username}`, { signal })
            .then((res) => {
                if (res.ok) return res.json()
                else if (res.status != 404) throw new Error()
            })
            .then((data) => {
                if (data) {
                    const name = data.name || username
                    userData = {
                        username,
                        name,
                        userImgURL: `https://github.com/${username}.png`
                    }
                }
            })
            .catch((e) => {
                console.log('debug: ', e.name)
                if (e.name != 'AbortError') {
                    userData = {
                        username,
                        name: username,
                        userImgURL: `https://github.com/${username}.png`
                    }
                }
            })
        return userData
    }
  
    function cancelFetch() {
        if (abortRef.current) abortRef.current.abort()
    }
  
    const {
        entry: entryUsername,
        setEntry: setEntryUsername,
        debounced,
        status
    } = useDebounce({
        defaultEntry: "",
        defaultReturn: clearUsername,
        debouncedFunc: verifyUser,
        cancel: cancelFetch,
    })

    const { username, name, userImgURL } = debounced

    return { entryUsername, setEntryUsername, status, username, name, userImgURL }
}