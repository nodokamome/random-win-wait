import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import { Val } from "../type/Common"

type RandomFormProps = {
  hasStartRandom: boolean
  setHasStartedRandom: Dispatch<SetStateAction<boolean>>
  resultData: Val[]
  setResultData: (val: any) => void
}

const RandomForm: React.VFC<RandomFormProps> = ({
  hasStartRandom,
  setHasStartedRandom,
  resultData,
  setResultData
}) => {
  const [tryTimes, setTryTimes] = useState<number>(0)
  const [hasWinningRandom, setHasWinningRandom] = useState<boolean>(false)
  const [totalRandomWins, setTotalTandomWins] = useState<number>(1)
  const [totalRandom, setTotalRandom] = useState<number>(100)
  const [winningRate, setWinningRate] = useState<number>(0)
  const [canPushButton, setCanPushButton] = useState<boolean>(true)
  const renderFlgRef = useRef(false)

  const switchRandomStart = () => {
    if (hasWinningRandom) {
      setTryTimes(0)
      setHasWinningRandom(false)
    } else {
      if (hasStartRandom) {
        const result = (() => {
          if (resultData) {
            return [
              ...resultData,
              {
                id: resultData.length + 1,
                probability: `${totalRandomWins} / ${totalRandom}`,
                tryTimes: tryTimes + 1,
                result: 'キャンセル'
              }]
          } else {
            return [
              {
                id: 1,
                probability: `${totalRandomWins} / ${totalRandom}`,
                tryTimes: tryTimes + 1,
                result: 'キャンセル'
              }
            ]
          }
        })()
        setResultData(result)
      }
      setTryTimes(0)
    }
    setHasStartedRandom(!hasStartRandom)
  }

  const onChangeTotalRandom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotalRandom(Number(event.target.value))
  }

  const onChangeTotalTandomWins = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotalTandomWins(Number(event.target.value))
  }

  const startRandom = () => {
    const random = Math.floor(Math.random() * totalRandom) + 1
    if (random <= totalRandomWins) {
      setHasStartedRandom(false)
      setHasWinningRandom(true)
    }
  }

  // countスタート & ストップ
  useEffect(() => {
    if (renderFlgRef.current) {
      renderFlgRef.current = false;
      return;
    }
    if (hasStartRandom) {
      const timer = setInterval(() => {
        startRandom()
        setTryTimes(count => count + 1);
      }, 10);

      return () => {
        clearInterval(timer)
      }
    }
  }, [hasStartRandom]);

  // 当選割合を算出
  useEffect(() => {
    const rate = (() => {
      if (totalRandom && totalRandomWins) {
        setCanPushButton(true)
        return (1 / (totalRandom / totalRandomWins)) * 100
      } else {
        setCanPushButton(false)
        return 0
      }
    })()

    setWinningRate(rate)
  }, [totalRandomWins, totalRandom])

  // 当たりのときにlocalStorageに保存する
  useEffect(() => {
    if (hasWinningRandom) {
      const result = (() => {
        if (resultData) {
          return [
            ...resultData,
            {
              id: resultData.length + 1,
              probability: `${totalRandomWins} / ${totalRandom}`,
              tryTimes: tryTimes + 1,
              result: '当たり'
            }]
        } else {
          return [
            {
              id: 1,
              probability: `${totalRandomWins} / ${totalRandom}`,
              tryTimes: tryTimes + 1,
              result: '当たり'
            }
          ]
        }
      })()
      setResultData(result)
    }
  }, [hasWinningRandom])

  return (
    <div className='border border-gray-400 flex-1 p-4 h-96 sm:rounded-lg'>
      {(() => {
        if (hasStartRandom === false && hasWinningRandom === false) {
          return <p className='text-xl text-gray-400 text-center'>当選数と抽選総数を入力してスタートしてください</p>
        }
        if (hasWinningRandom) {
          return <p className='font-bold text-xl text-red-500 text-center'>当たり</p>
        } else {
          return <p className='font-bold text-xl text-center'>抽選中...</p>
        }
      })()}
      <div className='flex py-5'>
        <span className='basis-2/12 text-gray-500'>試行回数</span>
        {(() => {
          if (hasWinningRandom) {
            return <span className='font-bold text-red-500 text-center flex-1 text-5xl'>{tryTimes}</span>
          } else {
            return <span className='font-bold text-center flex-1 text-5xl'>{tryTimes}</span>
          }
        })()}

        <span className='basis-2/12 text-gray-500 text-right'>回</span>
      </div>
      <form>
        <div className='flex'>
          <input
            className='text-2xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 disabled:cursor-not-allowed leading-tight focus:outline-none focus:shadow-outline'
            type='number'
            placeholder='当選数'
            defaultValue={totalRandomWins}
            disabled={hasStartRandom}
            onChange={onChangeTotalTandomWins}
          />
          <span className='text-2xl mx-2'>/</span>
          <input
            className='text-2xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 disabled:cursor-not-allowed leading-tight focus:outline-none focus:shadow-outline'
            type='number'
            placeholder='抽選総数'
            defaultValue={totalRandom}
            disabled={hasStartRandom}
            onChange={onChangeTotalRandom}
          />
        </div>
        <p className='font-medium text-gray-500 text-center mt-1'>毎抽選 {winningRate}%で当たり</p>
        {(() => {
          // スタートしていないとき
          if (hasStartRandom === false) {
            return <button
              className='w-full bg-blue-500 hover:bg-blue-400 active:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 disabled:opacity-75 disabled:cursor-not-allowed text-white font-bold py-2 my-3 px-4 rounded'
              type="button"
              disabled={!canPushButton}
              onClick={switchRandomStart}
            >
              スタート
            </button>
          } else {
            return <button
              className='w-full bg-gray-500 hover:bg-gray-400 active:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 text-white font-bold py-2 my-3 px-4 rounded'
              type="button"
              onClick={switchRandomStart}
            >
              キャンセル
            </button>
          }
        })()}

        <p className='text-xs font-medium text-gray-500'>※抽選したい確率を入力し、当たるまで待ってください。</p>
      </form>
    </div>
  )
}

export default RandomForm
