import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import { Val } from "../type/Common";

type RandomFormProps = {
  hasStartRandom: boolean;
  setHasStartedRandom: Dispatch<SetStateAction<boolean>>;
  resultData: Val[] | null;
  setResultData: (val: Val[] | null) => void;
};

export default function RandomForm({
  hasStartRandom,
  setHasStartedRandom,
  resultData,
  setResultData,
}: RandomFormProps) {
  const [tryTimes, setTryTimes] = useState(0);
  const [hasWinningRandom, setHasWinningRandom] = useState(false);
  const [totalRandomWins, setTotalRandomWins] = useState(1);
  const [totalRandom, setTotalRandom] = useState(100);
  const [winningRate, setWinningRate] = useState(0);
  const [canPushButton, setCanPushButton] = useState(true);

  // useEffect 内で最新の値を参照するための ref
  const totalRandomRef = useRef(totalRandom);
  const totalRandomWinsRef = useRef(totalRandomWins);
  useEffect(() => {
    totalRandomRef.current = totalRandom;
  }, [totalRandom]);
  useEffect(() => {
    totalRandomWinsRef.current = totalRandomWins;
  }, [totalRandomWins]);

  const appendResult = (result: Val["result"]) => {
    const newEntry: Val = {
      id: (resultData?.length ?? 0) + 1,
      probability: `${totalRandomWins} / ${totalRandom}`,
      tryTimes: tryTimes + 1,
      result,
    };
    setResultData(resultData ? [...resultData, newEntry] : [newEntry]);
  };

  const switchRandomStart = () => {
    if (hasWinningRandom) {
      setTryTimes(0);
      setHasWinningRandom(false);
    } else {
      if (hasStartRandom) {
        appendResult("キャンセル");
      }
      setTryTimes(0);
    }
    setHasStartedRandom(!hasStartRandom);
  };

  // 抽選インターバル
  useEffect(() => {
    if (!hasStartRandom) return;

    const timer = setInterval(() => {
      const random = Math.floor(Math.random() * totalRandomRef.current) + 1;
      if (random <= totalRandomWinsRef.current) {
        setHasStartedRandom(false);
        setHasWinningRandom(true);
      }
      setTryTimes((count) => count + 1);
    }, 10);

    return () => clearInterval(timer);
  }, [hasStartRandom, setHasStartedRandom]);

  // 当たりのときに結果を保存する
  useEffect(() => {
    if (!hasWinningRandom) return;
    appendResult("当たり");
  }, [hasWinningRandom]); // eslint-disable-line react-hooks/exhaustive-deps

  // 当選割合を算出
  useEffect(() => {
    if (totalRandom && totalRandomWins) {
      setCanPushButton(true);
      setWinningRate((1 / (totalRandom / totalRandomWins)) * 100);
    } else {
      setCanPushButton(false);
      setWinningRate(0);
    }
  }, [totalRandomWins, totalRandom]);

  const statusMessage = hasWinningRandom ? (
    <p className="font-bold text-xl text-red-500 text-center">当たり</p>
  ) : hasStartRandom ? (
    <p className="font-bold text-xl text-center">抽選中...</p>
  ) : (
    <p className="text-xl text-gray-400 text-center">
      当選数と抽選総数を入力してスタートしてください
    </p>
  );

  const tryTimesClass = hasWinningRandom
    ? "font-bold text-red-500 text-center flex-1 text-5xl"
    : "font-bold text-center flex-1 text-5xl";

  return (
    <div className="border border-gray-400 flex-1 p-4 h-96 sm:rounded-lg">
      {statusMessage}
      <div className="flex py-5">
        <span className="basis-2/12 text-gray-500">試行回数</span>
        <span className={tryTimesClass}>{tryTimes}</span>
        <span className="basis-2/12 text-gray-500 text-right">回</span>
      </div>
      <form>
        <div className="flex">
          <input
            className="text-2xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 disabled:cursor-not-allowed leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="当選数"
            defaultValue={totalRandomWins}
            disabled={hasStartRandom}
            onChange={(e) => setTotalRandomWins(Number(e.target.value))}
          />
          <span className="text-2xl mx-2">/</span>
          <input
            className="text-2xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 disabled:cursor-not-allowed leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="抽選総数"
            defaultValue={totalRandom}
            disabled={hasStartRandom}
            onChange={(e) => setTotalRandom(Number(e.target.value))}
          />
        </div>
        <p className="font-medium text-gray-500 text-center mt-1">
          毎抽選 {winningRate}%で当たり
        </p>
        {hasStartRandom ? (
          <button
            className="w-full bg-gray-500 hover:bg-gray-400 active:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 text-white font-bold py-2 my-3 px-4 rounded"
            type="button"
            onClick={switchRandomStart}
          >
            キャンセル
          </button>
        ) : (
          <button
            className="w-full bg-blue-500 hover:bg-blue-400 active:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 disabled:opacity-75 disabled:cursor-not-allowed text-white font-bold py-2 my-3 px-4 rounded"
            type="button"
            disabled={!canPushButton}
            onClick={switchRandomStart}
          >
            スタート
          </button>
        )}
        <p className="text-xs font-medium text-gray-500">
          ※抽選したい確率を入力し、当たるまで待ってください。
        </p>
      </form>
    </div>
  );
}
