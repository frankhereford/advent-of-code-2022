/* eslint-disable @next/next/no-img-element */
export default function Clouds (props: { opacity?: number, duration?: number }) {
  const offset = 0
  return (
    <>
      <div className='opacity-100' style={{ opacity: props.opacity ?? 20 }}>
        <div className='bg-red-500 w-screen h-screen z-0 bg-repeat transition-background' style={{
          transitionDuration: `${props.duration ?? 10}s`,
          backgroundPosition: `top 0px left ${offset}px`,
          backgroundImage: 'url(/cloud_tileable.webp)'
        }}>
        </div>
      </div>
    </>
  )
}
