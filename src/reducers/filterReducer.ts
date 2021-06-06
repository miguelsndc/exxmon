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
      console.log(action.sortOption)
      return {
        ...state,
        sortOption: action.sortOption,
      }

    default:
      return state
  }
}
