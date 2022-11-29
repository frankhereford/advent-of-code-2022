import { type NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import Terminal from './components/Terminal'
import SnowfallComponent from './components/Snowfall'

const Home: NextPage = () => {
  const date = new Date().toLocaleDateString('en-US')

  const content = `Last Login: ${date} on ttys002
frank@advent-of-code ` + '$' + ` echo '$GIT_MSG $GIT_REPOSITORY';
Fork this on GitHub: https://github.com/frankhereford/advent-of-code-2022
frank@advent-of-code $`

  return (
    <>
      <Head>
        <title>snowday</title>
        <meta name="description" content="2022 Advent of Code Attempts" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center h-100vh bg-gradient-to-b from-[#c2c5be] to-[#E2E2E2]">
        <div className='w-screen z-[0] absolute top-0 h-screen'>
          <div id='haze' className='h-screen' style={{ position: 'relative', animation: 'haze 150s infinite' }}>
          </div>
        </div>
        <SnowfallComponent plane='distant'></SnowfallComponent>
        <SnowfallComponent plane='midground'></SnowfallComponent>
        <Terminal content={content}></Terminal>
        <SnowfallComponent plane='foreground'></SnowfallComponent>
        <div className='z-[30] absolute bottom-0 overflow-x-hidden w-screen'>
          <Image priority={true} className='w-[3292px] barn' src="/snowscape.webp" alt="red barn by a lake" width='3202' height="711" />
        </div>
      </main>
    </>
  )
}

export default Home
