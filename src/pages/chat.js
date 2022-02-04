import { useEffect } from "react"
import { useRouter } from "next/router"

export default function CustomRedirect() {
  const router = useRouter()

  useEffect(() => {
    if (router) {
      const username = router.query.username
      if (username?.length > 0) {
        router.replace(`/servers?username=${username}`)
      } else {
        router.replace("/")
      }
    }
  }, [router])

  return null
}