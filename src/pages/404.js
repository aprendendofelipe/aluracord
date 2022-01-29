import { useEffect } from "react"
import { useRouter } from "next/router"

export default function Custom404() {
  const router = useRouter()
  const username = router.query.username

  useEffect(() => {
    if (username.length > 0) {
      router.replace(`/servers?username=${username}`)
    } else {
      router.replace("/")
    }
  })

  return null
}