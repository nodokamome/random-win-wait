import { useState } from "react"

const usePersist = ((key: string, initVal: any) => {
  const value = () => {
    try {
      if (typeof window !== 'undefined') {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : initVal
      }
    } catch (err) {
      console.log(err)
      return initVal
    }
  }

  const setValue = (val: any) => {
    try {
      setSavedValue(val)
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(val))
      }
    } catch (err) {
      console.log(err)
    }
  }

  const [savedValue, setSavedValue] = useState<any>(value)
  return [savedValue, setValue]
})

export default usePersist
