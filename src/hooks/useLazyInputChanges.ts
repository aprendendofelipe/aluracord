import { useEffect, useState } from "react"

export default function useLazyInputChanges(callback = (lazyEntry: String) => undefined, validator = (lazyEntry: String) => true) {
  const [entry, setEntry] = useState("")
  const [lazyEntry, setLazyEntry] = useState("")
  const [keyTime, setKeyTime] = useState(0)
  
  useEffect(() => {
    const now = Date.now()
    const keyDelay = (now - keyTime)
    const delay = keyDelay > 600 ? 800 : keyDelay + 200
    setKeyTime(now)
  
    if (entry.length > 0) {
      const timeoutId = setTimeout(() => {
        let lazy = entry.slice(0)
        if (validator(lazy)) {
          setLazyEntry(lazy)
          callback(lazy)
        }
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry]);
  
  return [entry, lazyEntry, setEntry]
}