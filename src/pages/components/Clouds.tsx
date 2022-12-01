import { useEffect, useState } from 'react'
import { useInterval } from 'usehooks-ts'

// * use this to get a random number but according to the normal distribution
function randomBoxMillerTransform (): number {
  let u = 0
  let v = 0
  while (u === 0) u = Math.random() // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random()
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
  num = num / 10.0 + 0.5 // Translate to 0 -> 1
  if (num > 1 || num < 0) return randomBoxMillerTransform() // resample between 0 and 1
  return num
}

export default function Clouds (props: { opacity?: number, windChangeDelay?: number, windChangeVariability?: number }) {
  const [windChangeDelay] = useState((props.windChangeDelay ?? 20) * 1000)
  const [transitionDuration] = useState(props.windChangeDelay ?? 20)
  const [cloudXLocation, setCloudXLocation] = useState(0)
  const imageWidth = 1440

  function computeNewXLocation () {
    const newXLocation = randomBoxMillerTransform() * imageWidth - (imageWidth / 2) * (props.windChangeVariability ?? 1)
    setCloudXLocation(newXLocation)
  }

  // ? how do you do this correctly, there must be a better way
  useEffect(() => {
    setTimeout(computeNewXLocation, 1000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
