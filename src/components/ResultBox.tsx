import { Val } from "../type/Common";

type ResultBoxProps = {
  resultData: Val[] | null;
  setResultData: (val: Val[] | null) => void;
};

const resultBadgeClass: Record<Val["result"], string> = {
  当たり: "bg-red-500 text-yellow-50",
  キャンセル: "bg-gray-400 text-yellow-50",
};

export default function ResultBox({
  resultData,
  setResultData,
}: ResultBoxProps) {
  const resetResult = () => {
    if (confirm("結果をリセットしますか？")) {
      setResultData(null);
    }
  };

  return (
    <div className="flex-1 flex-col">
      <div className="text-right">
        <button
          className="text-sm bg-blue-500 hover:bg-blue-400 active:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 my-3 px-4 rounded"
          type="button"
          onClick={resetResult}
        >
          結果リセット
        </button>
      </div>
      <div className="h-96 overflow-y-auto shadow border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 table-auto overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              {["No.", "確率", "試行回数", "結果"].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
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
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${resultBadgeClass[result.result]}`}
                  >
                    {result.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
