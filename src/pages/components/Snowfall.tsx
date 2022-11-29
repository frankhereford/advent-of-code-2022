import Snowfall from 'react-snowfall'

interface Props {
  plane: 'distant' | 'midground' | 'foreground'
}

export default function SnowfallComponent (props: Props) {
  return (
    <>
      {props.plane === 'distant' && (
        <Snowfall
          color={'#E3E3E3'}
          speed={[0.5, 0.7]}
          snowflakeCount={750}
          radius={[2, 4]}
          wind={[-0.2, 0.2]}
          style={{
            filter: 'blur(3px)',
            zIndex: 10
          }}
        ></Snowfall>
      )}
      {props.plane === 'midground' && (
        <Snowfall
          color={'#E3E3E3'}
          speed={[1.5, 1.7]}
          snowflakeCount={500}
          radius={[1.5, 3.0]}
          wind={[-0.5, 0.5]}
          style={{
            filter: 'blur(1.0px)',
            zIndex: 20
          }}
        ></Snowfall>
      )}
      {props.plane === 'foreground' && (
        <Snowfall
          color={'#E3E3E3'}
          speed={[0.5, 0.7]}
          snowflakeCount={50}
          radius={[0.5, 1.5]}
          wind={[-0.5, 0.5]}
          style={{
            filter: 'blur(1.0px)',
            zIndex: 50
          }}
        ></Snowfall>
      )}
    </>
  )
}
