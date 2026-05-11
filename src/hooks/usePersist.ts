import { useState, useEffect } from 'react'

function usePersist<T>(key: string, initVal: T): [T, (val: T) => void] {
  const [savedValue, setSavedValue] = useState<T>(initVal)

  // クライアントマウント後にlocalStorageから読み込む（hydrationエラー回避）
  useEffect(() => {
    try {
      const item = localStorage.getItem(key)
      if (item) setSavedValue(JSON.parse(item) as T)
    } catch {
      // ignore storage errors
    }
  }, [key])

  const setValue = (val: T) => {
    try {
      setSavedValue(val)
      localStorage.setItem(key, JSON.stringify(val))
    } catch {
      // ignore storage errors
    }
  }

  return [savedValue, setValue]
}

export default usePersist
