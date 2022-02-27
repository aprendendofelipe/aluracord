import { useEffect, useState } from "react"

export default function useAdaptiveDebounce(
  {
    defaultEntry,
    firstDelay = 500,
    minDelay = 200,
    maxDelay = 1200,
    defaultReturn = undefined,
    debouncedFunc = (entry: any) => entry,
    entryValidatorFunc = (entry: any) => true,
    cloneFunc = (entry: any) => entry.valueOf(),
    defaultFunc = () => undefined
  }
) {
  const [entry, setEntry] = useState(defaultEntry)
  const [debouncedEntry, setDebouncedEntry] = useState(defaultEntry)
  const [debouncedReturn, setDebouncedReturn] = useState(defaultReturn)
  const [delay, setDelay] = useState(firstDelay)
  const [lastEntryTime, setLastEntryTime] = useState(0)
  const [status, setStatus] = useState('default')

  function calcDelay(lastDelay: number) {
    const now = Date.now()
    let newDelay = (now - lastEntryTime) + Math.floor( lastDelay / 2 )
    setLastEntryTime(now)
    if (newDelay > maxDelay) {
      newDelay = maxDelay
    } else if (newDelay < minDelay) {
      newDelay = minDelay
    }
    return newDelay
  }

  async function delayedFunc() {
    const entryCopy = cloneFunc(entry)
    setDebouncedEntry(entryCopy)
    const isValidEntry = await entryValidatorFunc(entryCopy)
    if (isValidEntry) {
      setStatus('running')
      const debounced = await debouncedFunc(entryCopy)
      setDebouncedReturn(debounced)
      setStatus('debounced')
    } else {
      setStatus('invalidValue')
    }
  }

  useEffect(() => {
    if (entry != defaultEntry) {
      setStatus('debouncing')
      const timeoutId = setTimeout(()=>delayedFunc(), delay)
      setDelay((lastDelay) => calcDelay(lastDelay))
      return () => clearTimeout(timeoutId)
    } else {
      defaultFunc()
      setStatus('default')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry])

  return { entry, setEntry, debouncedEntry, debouncedReturn, status }
}


