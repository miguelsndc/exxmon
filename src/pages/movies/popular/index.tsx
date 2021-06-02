import { useEffect, useRef, useState } from 'react'
import { GetStaticProps } from 'next'
import { Container, FlexCenterX } from '../../../styles/globals'

import MovieCard from '../../../components/MovieCard'
import { Loading } from '../../../components/Loading'

import { MovieResponse } from '../../../types/Movie'

import {
  GridContainer,
  MostPopularSection,
} from '../../../styles/pages/Popular'
import { api } from '../../../services/api'
import { usePagination } from '../../../hooks/usePagination'
import { useElementOnScreen } from '../../../hooks/useElementOnScreen'

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

  const containerRef = useRef<HTMLElement | null>(null)

  const { elementRef, isVisible } = useElementOnScreen({
    root: containerRef.current,
    rootMargin: '0px',
    threshold: 0.7,
  })

  const { currentContent, next, isLoading, error } = usePagination(
    page,
    mostPopularMovies
  )

  useEffect(() => {
    if (!error && isVisible) {
      next(page)
      setPage((prevPage) => prevPage + 1)
    }
  }, [isVisible])

  return (
    <Container>
      <MostPopularSection ref={containerRef}>
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
        {isLoading && (
          <FlexCenterX>
            <Loading />
          </FlexCenterX>
        )}
        {error && <h1>{error}</h1>}
        <div ref={elementRef}></div>
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
