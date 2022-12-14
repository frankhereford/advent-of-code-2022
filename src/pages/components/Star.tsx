import { useContext } from 'react'
import { DayPicker } from '../[index]'

export default function Star (props: { day: string, isHover: boolean }) {
  const setDay = useContext(DayPicker)
  return (
    <>
      <div onClick={() => { setDay(parseInt(props.day)) }} className="relative w-[6rem] h-[5rem] drop-shadow-xl">
        <div className='absolute top-0 left-0 text-[4rem]'>⭐️</div>
        <div className={ (props.isHover ? 'opacity-100' : 'opacity-0') + ' absolute w-[4rem] text-slate-500 top-[2.00rem] text-center text-[1.5rem] transition-opacity duration-1000'}>{props.day}</div>
      </div>
    </>
  )
}
