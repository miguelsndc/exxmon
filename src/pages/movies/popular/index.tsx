import { Container } from '../../../styles/globals'

import MovieCard from '../../../components/MovieCard'

import {
  GridContainer,
  MostPopularSection,
} from '../../../styles/pages/Popular'
import { MovieResponse } from '../../../types/Movie'
import { api } from '../../../services/api'
import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import { usePagination } from '../../../hooks/usePagination'
import { CtaButton } from '../../../styles/pages/Popular'

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
  const [page, setPage] = useState(2)

  const { currentContent, next, isLoading, error } = usePagination(
    page,
    mostPopularMovies
  )

  function loadMore() {
    setPage((prevPage) => prevPage + 1)
  }

  useEffect(() => {
    if (!error) {
      next(page)
    }
  }, [page])

  return (
    <Container>
      <MostPopularSection>
        <h1>Most Popular</h1>
        <GridContainer>
          {currentContent?.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                id={movie.id}
                posterPath={movie.posterPath}
                title={movie.title || movie.title}
                rating={movie.rating}
              />
            )
          })}
        </GridContainer>
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}
        {error || <CtaButton onClick={loadMore}>load more</CtaButton>}
      </MostPopularSection>
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
