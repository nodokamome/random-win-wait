import { useState } from "react";
import RandomForm from "../components/RandomForm";
import ResultBox from "../components/ResultBox";
import usePersist from "../hooks/usePersist";
import { Val } from "../type/Common";

export default function Main() {
  const [hasStartRandom, setHasStartedRandom] = useState(false);
  const [resultData, setResultData] = usePersist<Val[] | null>(
    "random-win-wait",
    null,
  );

  return (
    <main className="flex box-border flex-col justify-center mx-auto max-w-screen-md">
      <RandomForm
        hasStartRandom={hasStartRandom}
        setHasStartedRandom={setHasStartedRandom}
        resultData={resultData}
        setResultData={setResultData}
      />
      <ResultBox resultData={resultData} setResultData={setResultData} />
    </main>
  );
}
