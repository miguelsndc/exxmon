import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '../../../services/api'
import { SearchForm } from '../../../styles/pages/Discover'
import { MovieResponse } from '../../../types/Movie'

type FormData = {
  query: string
}

const sortOptions = [
  { value: 'popularity.desc', label: 'Popularity' },
  { value: 'release_date.desc', label: 'Release Date' },
  { value: 'original_title.desc', label: 'Alphabetical' },
  { value: 'vote_average.desc', label: 'Rating' },
]

export function SearchMovie() {
  async function getMovies(form?: FormData) {
    const [query, setQuery] = useState('')
    const [movieResults, setMovieResults] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const { data } = await api.get<MovieResponse>('/search/movie', {
      params: {
        query: form && form.query,
      },
    })

    setQuery(form.query)
    console.log(data.results)
    setMovieResults(data.results)
    setIsLoading(false)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  return (
    <div>
      <SearchForm onSubmit={handleSubmit(getMovies)}>
        <input
          type="text"
          placeholder="Search"
          {...register('query', { required: true })}
        />
        <button type="submit">Search</button>
      </SearchForm>
    </div>
  )
}
