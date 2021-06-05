import { useState } from 'react'
import { api } from '../services/api'
import { MovieResponse } from '../types/Movie'

export function usePagination(
  page: number,
  initialContent: any[] | null,
  endpoint: string
) {
  const [isLoading, setIsLoading] = useState(false)
  const [currentContent, setCurrentContent] = useState(initialContent)
  const [hasMore, setHasMore] = useState(true)

  async function next(currentPage: number) {
    setIsLoading(true)

    const { data } = await api.get<MovieResponse>(endpoint, {
      params: {
        page: currentPage,
      },
    })

    if (page === data.total_pages) {
      setHasMore(false)
    } else {
      const newContent = data.results.map((movie) => {
        return {
          id: movie.id,
          posterPath: movie.poster_path,
          title: movie.title || movie.original_title,
          rating: movie.vote_average,
        }
      })

      if (initialContent) {
        setCurrentContent((prevContent) => {
          return [...prevContent, ...newContent]
        })
      } else {
        setCurrentContent(newContent)
      }
    }

    setIsLoading(false)
  }

  return { next, isLoading, currentContent, hasMore }
}
