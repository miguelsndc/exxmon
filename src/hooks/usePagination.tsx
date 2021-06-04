import { useState } from 'react'
import { api } from '../services/api'
import { MovieResponse } from '../types/Movie'

export function usePagination(page: number, initialContent: any[]) {
  const [isLoading, setIsLoading] = useState(false)
  const [currentContent, setCurrentContent] = useState(initialContent)
  const [hasMore, setHasMore] = useState(true)

  async function next(currentPage: number) {
    setIsLoading(true)

    const { data } = await api.get<MovieResponse>('/movie/popular', {
      params: {
        page: currentPage,
      },
    })

    const newContent = data.results.map((movie) => {
      return {
        id: movie.id,
        posterPath: movie.poster_path,
        title: movie.title || movie.original_title,
        rating: movie.vote_average,
      }
    })

    if (page >= data.total_pages) {
      setHasMore(false)
    } else {
      setCurrentContent((prevContent) => {
        return [...prevContent, ...newContent]
      })
    }

    setIsLoading(false)
  }

  return { next, isLoading, currentContent, hasMore }
}
