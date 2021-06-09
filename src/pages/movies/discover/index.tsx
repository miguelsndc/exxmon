import { useEffect, useReducer } from 'react'
import { filterReducer } from '../../../reducers/filterReducer'
import { api } from '../../../services/api'
import {
  Genre,
  GenreResponse,
  Movie,
  MovieResponse,
} from '../../../types/Movie'
import { GridContainer } from '../../../styles/shared'
import { MovieCard } from '../../../components/MovieCard'
import {
  Filters,
  DiscoverContainer,
  CheckboxInput,
} from '../../../styles/pages/Discover'
import { Select } from '../../../components/Select'
import { GetStaticProps } from 'next'
import { useForm } from 'react-hook-form'

export enum Actions {
  selectSortOption = 'SELECT_SORT_OPTION',
  setIsLoading = 'SET_IS_LOADING',
  setMovieResults = 'SET_MOVIE_RESULTS',
  submitFilters = 'SUBMIT_FILTERS',
}

type Option = {
  value: string
  label: string
}

type GenreFilters = {
  '12'?: boolean
  '14'?: boolean
  '16'?: boolean
  '18'?: boolean
  '27'?: boolean
  '28'?: boolean
  '35'?: boolean
  '36'?: boolean
  '37'?: boolean
  '53'?: boolean
  '80'?: boolean
  '99'?: boolean
  '878'?: boolean
  '9648'?: boolean
  '10402'?: boolean
  '10749'?: boolean
  '10751'?: boolean
  '10752'?: boolean
  '10770'?: boolean
}

const sortOptions: Option[] = [
  { value: 'popularity.desc', label: 'Popularity' },
  { value: 'release_date.desc', label: 'Release Date' },
  { value: 'original_title.desc', label: 'Alphabetical' },
  { value: 'vote_average.desc', label: 'Rating' },
]

export type State = {
  movieResults?: Movie[] | null
  isLoading?: boolean
  sortOption?: Option
  selectedOptions: GenreFilters | null
}

const initialState: State = {
  isLoading: true,
  movieResults: null,
  sortOption: sortOptions[0],
  selectedOptions: null,
}

export type Action =
  | { type: Actions.setMovieResults; movieResults?: Movie[] }
  | { type: Actions.setIsLoading; isLoading: boolean }
  | { type: Actions.selectSortOption; sortOption: Option }
  | { type: Actions.submitFilters; filters: GenreFilters; sortOption: Option }

type DiscoverProps = {
  genres: Genre[]
}

export default function Discover({ genres }: DiscoverProps) {
  const { register, handleSubmit } = useForm()
  const [state, dispatch] = useReducer(filterReducer, initialState)

  async function getMovies(fetchParams: any) {
    const { data } = await api.get<MovieResponse>('/discover/movie', {
      params: fetchParams,
    })

    return data
  }

  function mapSelectedOptionsToGenreIds(options: GenreFilters | null) {
    const genreIds = Object.keys(options)
    return genreIds
  }

  useEffect(() => {
    if (state.selectedOptions) {
      const selectedOptions = state.selectedOptions
      const selectedSortOption = state.sortOption.value

      const genreIds = mapSelectedOptionsToGenreIds(selectedOptions)

      getMovies({
        sort_by: selectedSortOption,
        with_genres: genreIds.join(', '),
      }).then((res) => {
        dispatch({ type: Actions.setMovieResults, movieResults: res.results })
      })
    }
  }, [state.selectedOptions])

  function handleFilters(data: GenreFilters) {
    dispatch({
      type: Actions.submitFilters,
      filters: data,
      sortOption: state.sortOption,
    })
  }

  return (
    <DiscoverContainer>
      <h1>Discover new Movies</h1>

      <Filters onSubmit={handleSubmit(handleFilters)}>
        <Select
          options={sortOptions}
          defaultValue={sortOptions[0]}
          onChange={dispatch}
        />
        <div>
          {genres.map((genre) => {
            return (
              <CheckboxInput key={genre.id}>
                <input
                  type="checkbox"
                  id={genre.name}
                  {...register(String(genre.id))}
                />
                <label htmlFor={genre.name}>{genre.name}</label>
              </CheckboxInput>
            )
          })}
        </div>
        <button type="submit">Aplicar filtros</button>
      </Filters>

      {state.movieResults && (
        <GridContainer>
          {state.movieResults.map((movie) => {
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
    </DiscoverContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get<MovieResponse>('/discover/movie', {})
  const genreListRes = await api.get<GenreResponse>('/genre/movie/list')

  const discover = data.results
  const genres = genreListRes.data.genres

  return {
    props: { discover, genres },
  }
}
