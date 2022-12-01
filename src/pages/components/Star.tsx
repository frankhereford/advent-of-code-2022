import { useContext } from 'react'
import { DayPicker } from '../index'

export default function Star (props: { day: string, isHover: boolean }) {
  const setDay = useContext(DayPicker)
  return (
    <>
      <div onClick={() => { setDay(parseInt(props.day)) }} className="relative w-[6rem] h-[5rem] drop-shadow-2xl">
        <div className='absolute top-0 left-0 text-[4rem]'>⭐️</div>
        { props.isHover && <div className='absolute w-[4rem] text-slate-700 top-[1.9rem] text-center text-[1.7rem]'>{props.day}</div> }
      </div>
    </>
  )
}
