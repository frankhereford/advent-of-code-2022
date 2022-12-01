import { useEffect, useRef, useState } from 'react'
import { useHover } from 'usehooks-ts'

import Star from './Star'

export default function PuzzlePicker (props: { numberStars: number, spread?: number, spinFactor?: number }) {
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  interface starStyle {
    top: string
    left: string
    opacity: number
    transform: string
  }

  const [starPositions, setStarPositions] = useState<starStyle[]>()

  useEffect(() => {
    function starPositionStyle (index: number) {
      if (isHover) {
        const top = 5 * Math.floor(index / 3)
        const left = 6 * (index % 3)

        return {
          top: `${top}rem`,
          left: `${left}rem`,
          opacity: 1,
          transform: 'rotate(0deg)'
        }
      } else {
        const spread = props.spread ?? 20
        const top = Math.floor(Math.random() * spread)
        const left = Math.floor(Math.random() * spread)
        const spinFactor = props.spinFactor ?? 30
        const rotation = Math.floor(Math.random() * 30) - (spinFactor / 2)
        return {
          top: `${top}px`,
          left: `${left}px`,
          opacity: 0.5,
          transform: `rotate(${rotation}deg)`
        }
      }
    }

    const newStarPositions: starStyle[] = []
    for (let i = 0; i < props.numberStars; i++) {
      newStarPositions.push(starPositionStyle(i))
    }
    setStarPositions(newStarPositions)
  }, [isHover, props.numberStars, props.spread])

  return (
    <>
      <div ref={hoverRef} className={
        // (isHover ? 'grid' : '') +
        'z-[100] transition-all duration-1000 absolute top-[5%] left-[3%] w-[18%]'
      }>
        {Array.from(Array(props.numberStars).keys()).map((index) => {
          return (
            <div key={index} className='absolute transition-all duration-1000' style={starPositions?.[index] ?? {}}>
              <Star day={(index + 1).toString()} isHover={isHover}></Star>
            </div>
          )
        })}
      </div>
    </>
  )
}
