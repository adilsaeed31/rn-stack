import { MOVIE_PROGRESS, MOVIE_SUCCESS, MOVIE_FAILURE } from "../Constants";
import chunk from "lodash/chunk";

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
        records: chunk(payload, 3),
        isLoading: false,
        hasError: false
      };
    case MOVIE_FAILURE:
      return {
        records: [],
        isLoading: false,
        hasError: true
      };
    default:
      return state;
  }
};

export default MovieSearchReducer;
