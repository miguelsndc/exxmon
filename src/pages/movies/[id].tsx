import { Container } from '../../styles/globals'

import { GetStaticPaths, GetStaticProps } from 'next'

import { useRouter } from 'next/router'

import { Genre, MovieDetails, MovieResponse } from '../../types/Movie'

import { Loading } from '../../components/Loading'
import { HorizontalScrollSection } from '../../components/HorizontalScroll'

import {
  MoviePoster,
  Overlay,
  MovieInfo,
  Poster,
  Details,
} from '../../styles/pages/Id'

import { Card } from '../../components/Card'

import Link from 'next/link'
import { api } from '../../services/api'

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

export default function CMovieDetails({ movieDetails, similarMovies }: Params) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <Container>
        <Loading />
      </Container>
    )
  }

  function formatDate(date?: string) {
    if (!date || date == null) return undefined

    const splitted = date?.split('-')
    const formatted = splitted?.join('/')

    return formatted
  }

  const formatedDate = formatDate(movieDetails?.releaseDate)

  return (
    <Container>
      <section>
        <MoviePoster
          backdropPath={`https://image.tmdb.org/t/p/original/${movieDetails?.backdropPath}`}
        >
          <Overlay />
          <MovieInfo>
            <Poster
              src={`https://image.tmdb.org/t/p/w500/${movieDetails?.posterPath}`}
              alt={movieDetails?.title}
            />
            <Details>
              <h2>{movieDetails?.title || movieDetails?.title}</h2>
              <p>{movieDetails?.overview}</p>
              <div>
                <div>
                  <img src="/assets/images/imdb.svg" alt="IMDB" />
                  <h2>{movieDetails?.rating}</h2>
                </div>
                <div>
                  <h3>Genres: </h3>
                  {movieDetails?.genres.map((genre, index) => {
                    return <span key={index}>{genre.name},</span>
                  })}
                </div>
                <div>
                  <h3>Release date: </h3>
                  <span>{formatedDate}</span>
                </div>
                <div>
                  <h3>Status: </h3>
                  <span>{movieDetails?.status}</span>
                </div>
              </div>
            </Details>
          </MovieInfo>
        </MoviePoster>
        <HorizontalScrollSection title="Similar Movies">
          {similarMovies?.map((movie) => {
            console.log(movie.id)
            return (
              <div
                key={movie.id}
                onClick={() => router.push(`/movies/${movie.id}`)}
              >
                <Card
                  name={movie.title}
                  popularity={movie.rating}
                  backdropPath={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`}
                />
              </div>
            )
          })}
        </HorizontalScrollSection>
      </section>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
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
