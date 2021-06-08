import Link from 'next/link'
import Image from 'next/image'

import {
  Poster,
  MovieDetails,
  Overlay,
  CtaButton,
  Genres,
  Description,
} from './styles'

import { Genre } from '../../types/Movie'

type FeaturedMovieProps = {
  backdropPath?: string
  originalTitle?: string
  genres?: Genre[]
  overview?: string
  showOverview?: boolean
  hasCta?: boolean
  releaseDate?: string
  rating?: number
  id?: number | string
}

export function FeaturedMovie({
  backdropPath,
  originalTitle,
  genres,
  overview,
  hasCta,
  releaseDate,
  rating,
  id,
  showOverview,
}: FeaturedMovieProps) {
  const backdropLoader = ({ src }) => {
    return `https://image.tmdb.org/t/p/original/${src}`
  }

  return (
    <Poster>
      <Image
        loader={backdropLoader}
        layout="fill"
        objectFit="cover"
        priority={true}
        src={`https://image.tmdb.org/t/p/original/${backdropPath}`}
      />

      <Overlay />
      <MovieDetails>
        <h1>{originalTitle}</h1>
        <Genres>
          {releaseDate && (
            <span>
              {releaseDate} <span>|</span>{' '}
            </span>
          )}
          {genres?.map((genre, index) => {
            const isLast = index === genres.length - 1

            return (
              <span key={genre.id}>
                {genre.name}
                {isLast ? '' : ', '}
              </span>
            )
          })}
        </Genres>
        {rating && <h2>{rating}</h2>}

        <Description>{showOverview && overview}</Description>

        {hasCta && (
          <Link href={`/movies/${id}`}>
            <CtaButton>Read More</CtaButton>
          </Link>
        )}
      </MovieDetails>
    </Poster>
  )
}
