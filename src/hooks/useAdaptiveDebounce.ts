import { useEffect, useState } from "react"

export type entry = string | number | Array<any> | object | Function
export type debounced = string | number | Array<any> | object | Function | void

interface options {
  defaultEntry?: entry
  defaultReturn?: debounced
  firstDelay?: number
  minDelay?: number
  maxDelay?: number
  debouncedFunc?(entry: entry): debounced | Promise<debounced>
  cloneFunc?(entry: entry): entry
  cancel?(): void
}

export default function useDebounce(
  {
    defaultEntry,
    defaultReturn,
    firstDelay = 700,
    minDelay = 200,
    maxDelay = 1200,
    debouncedFunc = (entry) => entry,
    cloneFunc = (entry) => entry.valueOf(),
    cancel = () => null
  }: options
) {
  const [entry, setEntry] = useState(defaultEntry)
  const [debounced, setDebounced] = useState(defaultReturn)
  const [delay, setDelay] = useState(firstDelay)
  const [lastEntryTime, setLastEntryTime] = useState(0)
  const [status, setStatus] = useState('default')

  function calcDelay(lastDelay: number) {
    const now = Date.now()
    const elapsed = now - lastEntryTime
    setLastEntryTime(now)
    if (elapsed > maxDelay) return delay
    let newDelay = elapsed + Math.floor( lastDelay / 2 )
    if (newDelay > maxDelay) {
      newDelay = maxDelay
    } else if (newDelay < minDelay) {
      newDelay = minDelay
    }
    return newDelay
  }

  async function delayedFunc() {
    setStatus('running')
    const entryCopy = cloneFunc(entry)
    const Debounced = await debouncedFunc(entryCopy)
    setDebounced(Debounced)
    setStatus('debounced')
  }

  useEffect(() => {
    cancel()
    if (lastEntryTime == 0) {
      setLastEntryTime(Date.now())
    } else {
      setStatus('debouncing')
      setDelay((lastDelay) => calcDelay(lastDelay))
      const timeoutId = setTimeout(() => delayedFunc(), delay)
      return () => clearTimeout(timeoutId)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry])

  return { entry, setEntry, debounced, status }
}
