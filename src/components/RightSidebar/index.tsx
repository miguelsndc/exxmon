import { RiSearchLine } from 'react-icons/ri'
import Link from 'next/link'
import { useMovie } from '../../contexts/MovieContext'
import { Movie } from '../MovieSmall'
import { Wrapper, SearchMovieForm, MenuTitle, CtaButton } from './styles'

import { Result } from '../../types/Movie'
import { sliceArray } from '../../utils/sliceArray'

export function RightSidebar() {
  const { mostPopularMovies, allGenres } = useMovie()

  function getFirstThreeMovies(movies?: Result[]) {
    return sliceArray(movies, 0, 3)
  }

  function getCorrespondingMovieGenres(movies?: Result[]) {
    if (!movies || movies == null) return

    const mappedMovies = movies?.map(({ genre_ids, ...rest }) => {
      const genres = genre_ids.map((genreId) => {
        return allGenres?.genres.find(({ id }) => id === genreId)
      })
      return {
        genres,
        ...rest,
      }
    })

    return mappedMovies
  }

  function formatMovies(movies: Result[] | undefined) {
    const topMovies = getFirstThreeMovies(movies)
    const formattedMovies = getCorrespondingMovieGenres(topMovies)

    return formattedMovies
  }

  const formattedMovies = formatMovies(mostPopularMovies)

  return (
    <Wrapper>
      <SearchMovieForm>
        <RiSearchLine color={'#5c5d63'} size="1rem" />
        <input type="text" placeholder="Search" />
      </SearchMovieForm>
      <MenuTitle>Popular Movies</MenuTitle>
      <nav>
        {formattedMovies?.map((movie) => {
          return (
            <Movie
              key={movie.id}
              name={movie.original_title}
              backdropPath={movie.poster_path}
              genres={movie.genres}
              rating={movie.vote_average}
            />
          )
        })}
      </nav>

      <Link href="/movies/popular">
        <CtaButton>See More</CtaButton>
      </Link>
    </Wrapper>
  )
}
