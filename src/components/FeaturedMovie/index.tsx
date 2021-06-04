import Link from 'next/link'

import { RiAddFill } from 'react-icons/ri'

import {
  Poster,
  MovieDetails,
  Overlay,
  CtaButton,
  AddToFavoritesButton,
  ButtonWrapper,
  Genres,
} from './styles'

import { Genre } from '../../types/Movie'

interface IFeaturedMovieProps {
  backdropPath?: string
  originalTitle?: string
  genres?: Genre[]
}

export function FeaturedMovie({
  backdropPath,
  originalTitle,
  genres,
}: IFeaturedMovieProps) {
  return (
    <Poster
      backdropPath={`https://image.tmdb.org/t/p/original/${backdropPath}`}
    >
      <Overlay />
      <MovieDetails>
        <h1>{originalTitle}</h1>
        <Genres>
          {genres?.map((genre) => {
            return <span key={genre.id}>{genre.name}, </span>
          })}
        </Genres>
        <ButtonWrapper>
          <Link href="/movies/299536">
            <CtaButton>Know More</CtaButton>
          </Link>
          <AddToFavoritesButton>
            <RiAddFill size="2rem" />
          </AddToFavoritesButton>
        </ButtonWrapper>
      </MovieDetails>
    </Poster>
  )
}
