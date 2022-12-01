import { useEffect, useRef, useState } from 'react'
import { useHover } from 'usehooks-ts'

import Star from './Star'

export default function PuzzlePicker (props: { numberStars: number, spread?: number, spinFactor?: number }) {
  const [githubLinkShown, setGithubLinkShown] = useState(false)

  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)

  const githubRef = useRef(null)
  const isGithubHover = useHover(githubRef)

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
        setGithubLinkShown(true)
        const top = 5 * Math.floor(index / 3)
        const left = 6 * (index % 3)

        return {
          top: `${top}rem`,
          left: `${left}rem`,
          opacity: 1,
          transform: 'rotate(0deg)'
        }
      } else {
        setGithubLinkShown(false)
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
  }, [isHover, props.numberStars, props.spinFactor, props.spread])

  useEffect(() => {
    if (isGithubHover) {
      setGithubLinkShown(true)
    } else {
      setGithubLinkShown(false)
    }
  }, [isGithubHover])

  return (
    <>
      <div ref={githubRef} className={(githubLinkShown ? 'opacity-80' : 'opacity-[5%]') + ' z-[120] transition-all duration-[2000ms] absolute top-3 left-3 text-slate-500 text-[1.5rem]'}>
        <a href='https://github.com/frankhereford/advent-of-code-2022' target='_blank' rel='noreferrer'>
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
        </a>
      </div>
      <div ref={hoverRef} className={
        'z-[100] transition-all duration-1000 absolute top-[5%] left-[3%] w-[18%]'
      }>
        {Array.from(Array(props.numberStars).keys()).map((index) => {
          return (
            <div key={index} className='absolute transition-all duration-1000 cursor-pointer' style={starPositions?.[index] ?? {}}>
              <Star day={(index + 1).toString()} isHover={isHover}></Star>
            </div>
          )
        })}
      </div>
    </>
  )
}
