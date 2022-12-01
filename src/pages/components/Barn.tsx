import Image from 'next/image'

export default function Barn () {
  return (
    <>
      <div className='z-[30] absolute bottom-0 overflow-x-hidden w-screen'>
        <Image priority={true} className='w-[3292px] barn' src="/snowscape.webp" alt="red barn by a lake" width='3202' height="711" />
      </div>
    </>
  )
}
