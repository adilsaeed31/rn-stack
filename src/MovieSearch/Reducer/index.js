import { MOVIE_PROGRESS, MOVIE_SUCCESS, MOVIE_FAILURE } from "../Constants";

const initialState = {
  records: [],
  isLoading: false,
  hasError: false
};

const MovieSearchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case MOVIE_PROGRESS:
      return {
        ...state,
        isLoading: true,
        hasError: false
      };
    case MOVIE_SUCCESS:
      return {
        ...state,
        records: [...state.records, ...payload],
        isLoading: false,
        hasError: false
      };
    case MOVIE_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true
      };
    default:
      return state;
  }
};

export default MovieSearchReducer;
