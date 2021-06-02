import { Container } from '../../../styles/globals'

import MovieCard from '../../../components/MovieCard'

import { GridContainer } from '../../../styles/pages/Popular'
import { MovieResponse } from '../../../types/Movie'
import { api } from '../../../services/api'
import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'

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
  const [currentContent, setCurrentContent] = useState(mostPopularMovies)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(2)

  function next(currentPage: number) {
    setIsLoading(true)
    api
      .get<MovieResponse>('/movie/popular', {
        params: {
          page: currentPage,
        },
      })
      .then(({ data }) => {
        const newContent = data.results.map((movie) => {
          return {
            id: movie.id,
            posterPath: movie.poster_path,
            title: movie.title || movie.original_title,
            rating: movie.vote_average,
          }
        })

        setCurrentContent((prevContent) => {
          return [...prevContent, ...newContent]
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function loadMore() {
    setPage((prevPage) => prevPage + 1)
  }

  useEffect(() => {
    next(page)
  }, [page])

  return (
    <Container>
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
      <button onClick={loadMore}>load more</button>
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
