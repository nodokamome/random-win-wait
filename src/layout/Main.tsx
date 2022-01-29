import { NextPage } from 'next'
import { useState } from 'react'
import RandomForm from '../components/RandomForm'
import ResultBox from '../components/ResultBox'
import usePersist from '../hooks/usePersist'

const Main: NextPage = () => {
  const [hasStartRandom, setHasStartedRandom] = useState<boolean>(false)
  // const [resultData, SetResultData] = usePersist('random-win-wait', null)

  return (
    <main className='flex box-border flex-col justify-center mx-auto max-w-screen-md'>
      <RandomForm hasStartRandom={hasStartRandom} setHasStartedRandom={setHasStartedRandom} />
      {/* <ResultBox hasStartRandom={hasStartRandom} /> */}
    </main >
  )
}

export default Main
