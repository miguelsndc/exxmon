import { Wrapper, Overlay, Details, Rating } from './styles'

import { RiStarFill } from 'react-icons/ri'

interface CardProps {
  name: string
  popularity: number
  backdropPath?: string
}

export function Card({ name, popularity, backdropPath }: CardProps) {
  return (
    <Wrapper
      backdropPath={`https://image.tmdb.org/t/p/original${backdropPath}`}
    >
      <Overlay />
      <Details>
        <span>{name}</span>
        <Rating>
          <h5>{popularity}</h5>
          <RiStarFill color="#F6C800" />
        </Rating>
      </Details>
    </Wrapper>
  )
}
