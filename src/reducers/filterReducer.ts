import { Action, Actions, State } from '../pages/movies/discover'

export function filterReducer(state: State, action: Action) {
  switch (action.type) {
    case Actions.setIsLoading:
      return {
        ...state,
        isLoading: action.isLoading,
      }

    case Actions.setMovieResults:
      return {
        ...state,
        movieResults: action.movieResults,
      }

    case Actions.selectSortOption:
      return {
        ...state,
        sortOption: action.sortOption,
      }

    case Actions.submitFilters:
      const selectedOptions = Object.fromEntries(
        Object.entries(action.filters).filter(([_, value]) => value == true)
      )

      return {
        ...state,
        selectedOptions,
      }

    default:
      return state
  }
}
