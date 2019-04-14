// Constants
import { AUTH_LOADING, AUTH_FAILURE, AUTH_SUCCESS } from '../Constants';

export function authLoading(payload) {
	return {
		type: AUTH_LOADING,
		payload
	};
}

export function authFailure(payload) {
	return {
		type: AUTH_FAILURE,
		payload
	};
}

export function authSuccess(payload) {
	return {
		type: AUTH_SUCCESS,
		payload
	};
}
