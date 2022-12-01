import { useEffect, useState } from 'react'
import { useInterval } from 'usehooks-ts'

export default function Clouds (props: { opacity?: number, windChangeDelay?: number }) {
  const [windChangeDelay] = useState(props.windChangeDelay ?? 20 * 1000)
  const [transitionDuration] = useState(props.windChangeDelay ?? 20)
  const [cloudXLocation, setCloudXLocation] = useState(0)
  const imageWidth = 1440

  function computeNewXLocation () {
    setCloudXLocation(Math.floor(Math.random() * imageWidth * 2) - imageWidth)
  }

  // ? how do you do this correctly, there must be a better way
  useEffect(() => {
    setTimeout(computeNewXLocation, 1000)
  }, [])

  useInterval(
    () => {
      computeNewXLocation()
    },
    windChangeDelay
  )

  return (
    <>
      <div style={{ opacity: (props.opacity ?? 20) * 0.01 }}>
        <div className='w-screen h-screen z-0 bg-repeat transition-background' style={{
          transitionDuration: `${transitionDuration}s`,
          backgroundPosition: `top 0px left ${cloudXLocation}px`,
          backgroundImage: 'url(/clouds.webp)'
        }}>
        </div>
      </div>
    </>
  )
}
