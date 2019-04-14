import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AuthReducer from '../Auth/Reducer';

// Add blank object for initialState
const Store = (initialState = {}) => {
	// Add more reduces later if needed
	let reducer = combineReducers({
		AuthReducer
	});

	// create store here and attach reducer with initialState and compose
	// development extension of Redux through applyMiddleWare
	let store = createStore(
		reducer,
		initialState,
		compose(
			applyMiddleware(thunk),
			window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
		)
	);

	return store;
};

export default Store;
