import { MovieInfo, Wrapper, Rating } from './styles'

import { Genre } from '../../types/Movie'
import { sliceArray } from '../../utils/sliceArray'

interface IMovieProps {
  name: string
  backdropPath: string
  genres: (Genre | undefined)[]
  rating: number
}

export function Movie({ name, backdropPath, genres, rating }: IMovieProps) {
  function getFirstTwoElements(genres: (Genre | undefined)[]) {
    return sliceArray(genres, 0, 2)
  }

  const dummy = getFirstTwoElements(genres)

  return (
    <Wrapper>
      <img src={`https://image.tmdb.org/t/p/w500${backdropPath}`} alt={name} />
      <MovieInfo>
        <div>
          <h3>{name}</h3>
          {dummy?.map((genre, index) => {
            return <span key={index}>{genre?.name} </span>
          })}
        </div>
        <Rating>
          <img src="/assets/images/imdb.svg" alt="imdb" />
          <h5>{rating}</h5>
        </Rating>
      </MovieInfo>
    </Wrapper>
  )
}
