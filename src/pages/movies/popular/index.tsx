import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'

import { MovieCard } from '../../../components/MovieCard'
import { Loading } from '../../../components/Loading'

import { MostPopularSection } from '../../../styles/pages/Popular'
import { GridContainer } from '../../../styles/shared'

import { useElementOnScreen } from '../../../hooks/useElementOnScreen'
import { usePagination } from '../../../hooks/usePagination'

import { MovieResponse } from '../../../types/Movie'

import { api } from '../../../services/api'

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

  const ObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4,
  }

  const { elementRef, isVisible } = useElementOnScreen(ObserverOptions)

  const { currentContent, next, isLoading, hasMore } = usePagination(
    page,
    mostPopularMovies,
    '/movie/popular'
  )

  useEffect(() => {
    if (hasMore && isVisible) {
      next(page)
      setPage((prevPage) => prevPage + 1)
    }
  }, [isVisible])

  return (
    <MostPopularSection>
      <h1>Most Popular</h1>
      <GridContainer>
        {currentContent?.map((movie, index) => {
          const isLast = index === currentContent.length - 1

          if (isLast) {
            return (
              <div ref={elementRef} key={movie.id}>
                <MovieCard
                  id={movie.id}
                  posterPath={movie.posterPath}
                  title={movie.title || movie.title}
                  rating={movie.rating}
                />
              </div>
            )
          } else {
            return (
              <MovieCard
                key={movie.id}
                id={movie.id}
                posterPath={movie.posterPath}
                title={movie.title || movie.title}
                rating={movie.rating}
              />
            )
          }
        })}
      </GridContainer>
      {isLoading && <Loading />}
      {!hasMore && <h1>No more content available</h1>}
    </MostPopularSection>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get<MovieResponse>('/movie/popular')

  const mostPopularMovies = data.results.map((movie) => {
    return {
      id: movie.id,
      posterPath: movie.backdrop_path,
      title: movie.title || movie.original_title,
      rating: movie.vote_average,
      voteCount: movie.vote_count,
    }
  })

  return {
    props: { mostPopularMovies },
    revalidate: 86400,
  }
}
