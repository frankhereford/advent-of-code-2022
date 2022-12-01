export default function Star (props: { day: string, isHover: boolean }) {
  // <div className='absolute top-[2.1rem] left-[1.2rem] text-[1.4rem]'>{props.day}</div>
  return (
    <>
      <div className="relative w-[6rem] h-[5rem] drop-shadow-2xl">
        <div className='absolute top-0 left-0 text-[4rem]'>⭐️</div>
        { props.isHover && <div className='absolute w-[4rem] text-slate-700 top-[1.9rem] text-center text-[1.7rem]'>{props.day}</div> }
      </div>
    </>
  )
}
