// Constants
import { MOVIE_PROGRESS, MOVIE_SUCCESS, MOVIE_FAILURE } from "../Constants";

export function movieProgress() {
  return {
    type: MOVIE_PROGRESS
  };
}

export function movieSuccess(payload) {
  return {
    type: MOVIE_SUCCESS,
    payload
  };
}

export function movieFailure() {
  return {
    type: MOVIE_FAILURE
  };
}
