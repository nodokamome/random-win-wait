import { useEffect, useRef } from 'react'

type ResultBoxProps = {
  hasStartRandom: boolean
}

const ResultBox: React.VFC<ResultBoxProps> = ({ hasStartRandom }) => {
  const renderFlgRef = useRef(false)

  useEffect(() => {
    if (renderFlgRef.current) {
      renderFlgRef.current = false;
      return;
    }

    if (hasStartRandom === false) console.log(localStorage.getItem('random-win-wait'))
  }, [hasStartRandom])
  const results = [
    {
      id: 1,
      probability: '1 / 99',
      tryTimes: 1000,
      result: '当たり',
    },
    {
      id: 2,
      probability: '1 / 99',
      tryTimes: 1000,
      result: '当たり',
    },
    {
      id: 3,
      probability: '1 / 99',
      tryTimes: 1000,
      result: '当たり',
    },
    {
      id: 4,
      probability: '1 / 99',
      tryTimes: 1000,
      result: '当たり',
    },
  ]

  return (
    <div className="flex-1 flex-col">
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
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((result) => (
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
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-500 text-yellow-50">
                    {result.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default ResultBox
