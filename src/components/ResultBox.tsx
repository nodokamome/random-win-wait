import { useEffect, useState } from 'react'
import { Val } from "../type/Common"

type ResultBoxProps = {
  resultData: Val[]
  setResultData: (val: any) => void
}

const ResultBox: React.VFC<ResultBoxProps> = ({ resultData, setResultData }) => {
  // resultDataの更新待ち用フラグ
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const resetResult = () => {
    if (confirm('結果をリセットしますか？')) {
      setResultData(null)
    }
  }

  const tbody = () => {
    if (isClient) {
      return (
        <tbody className="bg-white divide-y divide-gray-200">
          {resultData?.map((result) => (
            <tr key={result.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm">{result.id}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm">{result.probability}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm">{result.tryTimes}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {(() => {
                  if (result.result === '当たり') {
                    return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-500 text-yellow-50">
                      {result.result}
                    </span>
                  }
                  else if (result.result === 'キャンセル') {
                    return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-400 text-yellow-50">
                      {result.result}
                    </span>
                  }
                })()}
              </td>
            </tr>
          ))}
        </tbody>
      )
    }
  }

  return (
    <div className="flex-1 flex-col">
      <div className='text-right'>
        <button
          className=' text-sm bg-blue-500 hover:bg-blue-400 active:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 my-3 px-4 rounded'
          type="button"
          onClick={resetResult}
        >
          結果リセット
        </button>
      </div>
      <div className="shadow border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 table-auto overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
              >
                No.
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
              >
                確率
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
              >
                試行回数
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
              >
                結果
              </th>
            </tr>
          </thead>
          <>{tbody()}</>
        </table>
      </div>
    </div >
  )
}

export default ResultBox
