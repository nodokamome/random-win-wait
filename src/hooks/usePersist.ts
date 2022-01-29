import { useState } from "react"
import { Val } from "../type/Common"

const usePersist = ((key: string, initVal: Val | undefined | null) => {
  const value = () => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initVal
    } catch (err) {
      console.log(err)
      return initVal
    }
  }

  const setValue = (val: Val) => {
    try {
      setSavedValue(val)
      localStorage.setItem(key, JSON.stringify(val))
    } catch (err) {
      console.log(err)
    }
  }

  const [savedValue, setSavedValue] = useState<Val>(value)
  return [savedValue, setValue]
})

export default usePersist
