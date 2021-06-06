import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { GridContainer } from '../../../styles/pages/Popular'
import {
  Controllers,
  ResultsFeedback,
  ErrorMessage,
} from '../../../styles/pages/Search'
import { api } from '../../../services/api'
import { SearchForm } from '../../../styles/pages/Discover'
import { Movie, MovieResponse } from '../../../types/Movie'
import { MovieCard } from '../../../components/MovieCard'
import { useElementOnScreen } from '../../../hooks/useElementOnScreen'

type FormData = {
  query: string
}

export default function SearchMovie() {
  const [query, setQuery] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [movieResults, setMovieResults] = useState<Movie[]>(null)

  const [page, setPage] = useState(2)

  const containerRef = useRef<HTMLDivElement | null>(null)

  const { elementRef, isVisible } = useElementOnScreen({
    root: containerRef.current,
    rootMargin: '0px',
    threshold: 0.3,
  })

  useEffect(() => {
    const data = sessionStorage.getItem('@Exxmon/persistedState')
    const persisted = JSON.parse(data)

    if (persisted) {
      setQuery(persisted.query)
      setPage(persisted.page)
      setMovieResults(persisted.movieResults)
    }
  }, [])

  useEffect(() => {
    if (isVisible && query && hasMore) {
      getMovie(query, page).then((data) => {
        setMovieResults((prevResults) => {
          return [...prevResults, ...data.results]
        })

        setPage((prevPage) => prevPage + 1)

        sessionStorage.setItem(
          '@Exxmon/persistedState',
          JSON.stringify({
            movieResults,
            page,
            query,
          })
        )
      })
    }
  }, [isVisible, query])

  async function getMovie(query: string, page: number = 1) {
    const { data } = await api.get<MovieResponse>('/search/movie', {
      params: {
        query,
        page,
      },
    })
    const hasPages = page < data.total_pages

    setHasMore(hasPages)

    return data
  }

  async function searchMovie(form?: FormData) {
    try {
      const data = await getMovie(form.query)

      setPage(2)
      setQuery(form.query)
      setMovieResults(data.results)

      sessionStorage.setItem(
        '@Exxmon/persistedState',
        JSON.stringify({
          movieResults,
          page,
          query,
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  return (
    <div ref={containerRef}>
      <Controllers>
        <h1>Find your Movies</h1>
        <SearchForm onSubmit={handleSubmit(searchMovie)}>
          <input
            type="text"
            placeholder="Search"
            {...register('query', { required: true })}
          />
          <button type="submit">Search</button>
        </SearchForm>
        {errors.query && errors.query.type === 'required' && (
          <ErrorMessage>Please type something in the search box</ErrorMessage>
        )}
        <ResultsFeedback>
          {movieResults &&
            (query && movieResults.length ? (
              <h2>Results for "{query}"</h2>
            ) : (
              query &&
              !movieResults.length && <h2>No results found for "{query}"</h2>
            ))}
        </ResultsFeedback>
        <hr />
      </Controllers>

      {movieResults && (
        <GridContainer>
          {movieResults.map((movie, index) => {
            if (movieResults.length - 1 === index) {
              return (
                <div ref={elementRef} key={movie.id}>
                  <MovieCard
                    id={movie.id}
                    posterPath={movie.poster_path}
                    rating={movie.vote_average}
                    title={movie.title || movie.original_title}
                  />
                </div>
              )
            } else {
              return (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  posterPath={movie.poster_path}
                  rating={movie.vote_average}
                  title={movie.title || movie.original_title}
                />
              )
            }
          })}
        </GridContainer>
      )}
    </div>
  )
}
