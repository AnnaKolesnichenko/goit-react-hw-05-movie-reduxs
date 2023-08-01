import { combineReducers, createStore } from 'redux';
import { postDetailReducer } from './movieDetailsReducer';
import { devToolsEnhancer } from '@redux-devtools/extension';



const rootReducer = combineReducers({
  movie: postDetailReducer,
});

const enhancer = devToolsEnhancer();
export const store = createStore(rootReducer, enhancer);