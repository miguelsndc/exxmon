import { useEffect, useReducer } from 'react'
import { filterReducer } from '../../../reducers/filterReducer'
import { api } from '../../../services/api'
import { Movie, MovieResponse } from '../../../types/Movie'
import { GridContainer } from '../../../styles/pages/Popular'
import { MovieCard } from '../../../components/MovieCard'
import { Filters } from '../../../styles/pages/Discover'
import { Select } from '../../../components/Select'
import { GetStaticProps } from 'next'

export enum Actions {
  selectSortOption = 'SELECT_SORT_OPTION',
  setIsLoading = 'SET_IS_LOADING',
  setMovieResults = 'SET_MOVIE_RESULTS',
}

type Option = {
  value: string
  label: string
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
}

const initialState: State = {
  isLoading: true,
  movieResults: null,
  sortOption: sortOptions[0],
}

export type Action =
  | { type: Actions.selectSortOption; sortOption: Option }
  | { type: Actions.setMovieResults; movieResults?: Movie[] }
  | { type: Actions.setIsLoading; isLoading: boolean }

export default function Discover() {
  const [state, dispatch] = useReducer(filterReducer, initialState)

  async function getMovies() {
    const { data } = await api.get<MovieResponse>('/discover/movie', {
      params: {
        sort_by: state.sortOption.value,
      },
    })

    return data
  }

  useEffect(() => {
    getMovies().then((data) => {
      dispatch({ type: Actions.setMovieResults, movieResults: data.results })
      dispatch({ type: Actions.setIsLoading, isLoading: false })
    })
  }, [state.sortOption])

  return (
    <div>
      <h1>Discover new Movies</h1>
      <Filters>
        <Select
          options={sortOptions}
          defaultValue={sortOptions[0]}
          onChange={dispatch}
        />
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
