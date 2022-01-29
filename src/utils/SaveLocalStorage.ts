type resultType = '当たり' | 'キャンセル'

type Data = {
  probability: string
  tryTimes: number
  result: resultType
}

const saveLocalStorage = ((data: Data) => {
  const prevItems = localStorage.getItem('random-win-wait')?.toString()

  if (prevItems === undefined) {
    // idを追加
    const newData = { id: 1, ...data }
    const array = [newData]
    const str = JSON.stringify(array)
    localStorage.setItem('random-win-wait', str);
  } else {
    const prevArray = JSON.parse(prevItems)
    // idを追加
    const newData = { id: prevArray.length + 1, ...data }
    prevArray.push(newData)
    const str = JSON.stringify(prevArray)
    localStorage.setItem('random-win-wait', str);
  }
})

export default saveLocalStorage
