import { Container } from '../../styles/globals'

import { GetStaticPaths, GetStaticProps } from 'next'

import { useRouter } from 'next/router'

import { useState } from 'react'
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
}

export default function CMovieDetails({ movieDetails }: Params) {
  const router = useRouter()

  console.log(movieDetails)

  if (router.isFallback) {
    return <Loading />
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
                  {/* {movieDetails?.genres.map((genre, index) => {
                    return <span key={index}>{genre.name},</span>
                  })} */}
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
        {/* <HorizontalScrollSection title="Similar Movies">
          {similarMovies?.results.map((movie) => {
            return (
              <Link href={`/movies/${movie.id}`} key={movie.id}>
                <Card
                  name={movie.title || movie.original_title}
                  popularity={movie.vote_average}
                  backdropPath={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />
              </Link>
            )
          })}
        </HorizontalScrollSection> */}
      </section>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get<MovieResponse>('/movie/popular')

  const paths = data.results.map((movie) => ({
    params: { id: String(movie.id) },
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params
  const { data } = await api.get<MovieDetails>(`/movie/${id}`)

  const movieDetails = {
    releaseDate: data.release_date,
    backdropPath: data.backdrop_path,
    posterPath: data.poster_path,
    title: data.title || data.original_title,
    overview: data.overview,
    rating: data.vote_average,
    genres: data.genres,
    status: data.status,
  }

  return {
    props: { movieDetails },
  }
}
