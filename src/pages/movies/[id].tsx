import format from 'date-fns/format'
import enUS from 'date-fns/locale/en-US'

import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import { HorizontalScrollSection } from '../../components/HorizontalScroll'
import { Loading } from '../../components/Loading'
import { Card } from '../../components/Card'

import { Genre, MovieDetails, MovieResponse } from '../../types/Movie'

import { api } from '../../services/api'

import { CtaButton } from '../../styles/pages/Popular'
import {
  MoviePoster,
  Overlay,
  MovieInfo,
  Details,
  ResultsNotFound,
  AdditionalInfo,
} from '../../styles/pages/Id'

import Image from 'next/image'
import Link from 'next/link'

interface SimilarMovie {
  id: string
  posterPath: string
  title: string
  rating: number
}
interface MovieDetailsProps {
  releaseDate: string
  backdropPath: string
  posterPath: string
  title: string
  overview: string
  rating: number
  genres: Genre[]
  status: string
}

interface Params {
  movieDetails: MovieDetailsProps
  similarMovies: SimilarMovie[]
}

export default function SpecificMovieDetails({
  movieDetails,
  similarMovies,
}: Params) {
  const router = useRouter()

  if (router.isFallback) {
    return <Loading />
  }

  function formatDate(date?: string) {
    if (!date || date == null) return undefined

    const currentDate = format(new Date(date), 'MMM/dd/yyyy', { locale: enUS })

    return currentDate
  }

  const formattedDate = formatDate(movieDetails?.releaseDate)

  const backgroundLoader = ({ src }) => {
    return `https://image.tmdb.org/t/p/original${src}`
  }

  const posterLoader = ({ src }) => {
    return `https://image.tmdb.org/t/p/w500${src}`
  }

  return (
    <section>
      <MoviePoster>
        <Image
          loader={backgroundLoader}
          src={`https://image.tmdb.org/t/p/w500/${movieDetails?.backdropPath}`}
          layout="fill"
          objectFit="cover"
        />
        <Overlay />
        <MovieInfo>
          <div style={{ width: '200px', height: '300px' }}>
            <Image
              loader={posterLoader}
              src={`https://image.tmdb.org/t/p/w500/${movieDetails?.posterPath}`}
              width={200}
              height={300}
              layout="fixed"
            />
          </div>

          <Details>
            <h2>{movieDetails?.title || movieDetails?.title}</h2>
            <p>{movieDetails?.overview}</p>
            <div>
              <AdditionalInfo>
                <img src="/assets/images/imdb.svg" alt="IMDB" />
                <h2>{movieDetails?.rating}</h2>
              </AdditionalInfo>
              <AdditionalInfo>
                <h3>
                  Genres:{' '}
                  {movieDetails?.genres.map((genre, index) => {
                    return <span key={index}>{genre.name},</span>
                  })}
                </h3>
              </AdditionalInfo>
              <AdditionalInfo>
                <h3>
                  Release date: <span>{formattedDate}</span>
                </h3>
              </AdditionalInfo>
              <AdditionalInfo>
                <h3>
                  Status: <span>{movieDetails?.status}</span>
                </h3>
              </AdditionalInfo>
            </div>
          </Details>
        </MovieInfo>
      </MoviePoster>

      {similarMovies.length ? (
        <HorizontalScrollSection title="Similar Movies">
          {similarMovies?.map((movie) => {
            return (
              <Card
                key={movie.id}
                onClick={() => router.push(`/movies/${movie.id}`)}
                name={movie.title}
                popularity={movie.rating}
                backdropPath={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`}
              />
            )
          })}
        </HorizontalScrollSection>
      ) : (
        <ResultsNotFound>
          Could not find any similar movies of: "{movieDetails.title}"
          <Link href="/movies/popular">
            <CtaButton>Go back to Popular</CtaButton>
          </Link>
        </ResultsNotFound>
      )}
    </section>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get<MovieResponse>('/movie/popular')

  const paths = data.results.map((movie) => {
    return {
      params: {
        id: String(movie.id),
      },
    }
  })

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params
  const movieDetailsResponse = await api.get<MovieDetails>(`/movie/${id}`)
  const similarMoviesResponse = await api.get<MovieResponse>(
    `/movie/${id}/similar`
  )

  const movieDetails = {
    releaseDate: movieDetailsResponse.data.release_date,
    backdropPath: movieDetailsResponse.data.backdrop_path,
    posterPath: movieDetailsResponse.data.poster_path,
    title:
      movieDetailsResponse.data.title ||
      movieDetailsResponse.data.original_title,
    overview: movieDetailsResponse.data.overview,
    rating: movieDetailsResponse.data.vote_average,
    genres: movieDetailsResponse.data.genres,
    status: movieDetailsResponse.data.status,
  }

  const similarMovies = similarMoviesResponse.data.results.map((movie) => {
    return {
      id: movie.id,
      posterPath: movie.poster_path,
      title: movie.title || movie.original_title,
      rating: movie.vote_average,
    }
  })

  return {
    props: { movieDetails, similarMovies },
  }
}
