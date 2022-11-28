import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Snowfall from 'react-snowfall'
import Terminal from './components/Terminal'

const Home: NextPage = () => {

          //<Image className='w-[2048px]' src="/cloud_texture.webp" alt="cloud haze" width='2048' height="2048" />
  //  bg-[url("/cloud_texture.webp")] bg-repeat-x haze
  // style={{animation: 'haze 10s linear infinite'}}
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
          <div id='haze' className='h-screen' style={{ position: 'relative', 'animation': 'haze 150s infinite' }}>
          </div>
        </div>
        <Snowfall
          color={'#E3E3E3'}
          speed={[0.5, 0.7]}
          snowflakeCount={750}
          radius={[2,4]}
          wind={[-0.2, 0.2]}
          style={{
            filter: 'blur(3px)',
            zIndex: 10
          }}
        ></Snowfall> 
        <Terminal></Terminal>
        <Snowfall
          color={'#E3E3E3'}
          speed={[1.5, 1.7]}
          snowflakeCount={250}
          radius={[1.5, 3.0]}
          wind={[-0.5, 0.5]}
          style={{
            filter: 'blur(1.0px)',
            zIndex: 30
          }}
        ></Snowfall> 
        <Snowfall
          color={'#E3E3E3'}
          speed={[0.5, 0.7]}
          snowflakeCount={50}
          radius={[0.5, 1.5]}
          wind={[-0.5, 0.5]}
          style={{
            filter: 'blur(1.0px)',
            zIndex: 60
          }}
        ></Snowfall>
        <div className='z-[40] absolute bottom-0 overflow-x-hidden w-screen'>
          <Image priority={true} className='w-[3292px] barn' src="/snowscape.webp" alt="red barn by a lake" width='3202' height="711" />
        </div>
      </main>
    </>
  );
};

export default Home;

