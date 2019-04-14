import { AUTH_LOADING, AUTH_FAILURE, AUTH_SUCCESS } from '../Constants';

const initialState = {
	status: null,
	message: null,
	isLoading: false
};

const AuthReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case AUTH_FAILURE:
			return {
				status: payload.status,
				message: payload.message,
				isLoading: false
			};
		case AUTH_SUCCESS:
			return {
				status: payload.status,
				message: payload.message,
				data: payload.data,
				isLoading: false
			};
		case AUTH_LOADING:
			return {
				...state,
				isLoading: payload.isLoading
			};
		default:
			return state;
	}
};

export default AuthReducer;
