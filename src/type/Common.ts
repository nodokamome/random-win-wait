type resultType = '当たり' | 'キャンセル'

export type Val = {
  id: number
  probability: string
  tryTimes: number
  result: resultType
}
