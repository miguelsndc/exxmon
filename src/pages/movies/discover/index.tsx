import { useState } from 'react'
import { api } from '../../../services/api'
import { Movie, MovieResponse } from '../../../types/Movie'
import { GridContainer } from '../../../styles/pages/Popular'
import { MovieCard } from '../../../components/MovieCard'
import { Select } from '../../../components/Select'
import { GetStaticProps } from 'next'

type FormData = {
  query: string
}

const sortOptions = [
  { value: 'popularity.desc', label: 'Popularity' },
  { value: 'release_date.desc', label: 'Release Date' },
  { value: 'original_title.desc', label: 'Alphabetical' },
  { value: 'vote_average.desc', label: 'Rating' },
]

export default function Discover() {
  const [movieResults, setMovieResults] = useState<Movie[]>([])
  const [selectedSortOption, setSelectedSortOption] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  async function getMovies(form?: FormData) {
    const { data } = await api.get<MovieResponse>('/discover/movie', {
      params: {
        sort_by: selectedSortOption.value,
      },
    })
    setMovieResults(data.results)
    setIsLoading(false)
  }

  return (
    <div>
      <h1>Discover new Movies</h1>

      {movieResults && (
        <GridContainer>
          {movieResults.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                id={movie.id}
                posterPath={movie.poster_path}
                rating={movie.vote_average}
                title={movie.title || movie.original_title}
              />
            )
          })}
        </GridContainer>
      )}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get<MovieResponse>('/discover/movie', {})

  const discover = data.results

  return {
    props: { discover },
  }
}
