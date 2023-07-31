import { combineReducers, createStore } from 'redux';
// import { devToolsEnhancer } from '@redux-devtools/extension';

const initialState = {
  movieDetails: null,
  isLoading: false,
  error: false,
};

const postDetailReducer = (state = initialState, action) => {
  return state;
};

const rootReducer = combineReducers({
  movieDetails: {},
});

// const enhancer = devToolsEnhancer();
export const store = createStore(rootReducer);
