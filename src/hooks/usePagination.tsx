import { useState } from 'react'
import { api } from '../services/api'
import { MovieResponse } from '../types/Movie'

export function usePagination(page: number, initialContent) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentContent, setCurrentContent] = useState(initialContent)

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

        if (page >= data.total_pages) {
          setError('No more content available')
        } else {
          setCurrentContent((prevContent) => {
            return [...prevContent, ...newContent]
          })
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return { next, isLoading, currentContent, error }
}
