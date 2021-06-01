import { Container } from '../../../styles/globals'

import { generateUniqueId } from '../../../utils/uuid'

import { MovieCard } from '../../../components/MovieCard'

import { GridContainer } from '../../../styles/pages/Popular'
import { MovieResponse } from '../../../types/Movie'
import { api } from '../../../services/api'
import { GetStaticProps } from 'next'

interface PopularMovie {
  id: number
  posterPath: string
  title: string
  rating: number
}

interface PopularMoviesProps {
  mostPopularMovies: PopularMovie[]
}

export default function PopularMovies({
  mostPopularMovies,
}: PopularMoviesProps) {
  return (
    <Container>
      <h1>Most Popular</h1>
      <GridContainer>
        {mostPopularMovies?.map((movie) => {
          return (
            <MovieCard
              key={generateUniqueId()}
              id={movie.id}
              posterPath={movie.posterPath}
              title={movie.title || movie.title}
              rating={movie.rating}
            />
          )
        })}
      </GridContainer>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get<MovieResponse>('/movie/popular')

  const mostPopularMovies = data.results.map((movie) => {
    return {
      id: movie.id,
      posterPath: movie.poster_path,
      title: movie.title || movie.original_title,
      rating: movie.vote_average,
    }
  })

  return {
    props: { mostPopularMovies },
  }
}
