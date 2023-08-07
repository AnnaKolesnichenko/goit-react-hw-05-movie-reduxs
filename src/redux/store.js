// import { combineReducers, createStore } from 'redux';
// import { postDetailReducer } from './movieDetailsReducer';
// import { devToolsEnhancer } from '@redux-devtools/extension';

// const rootReducer = combineReducers({
//   movie: postDetailReducer,
// });

// const enhancer = devToolsEnhancer();
// export const store = createStore(rootReducer, enhancer);

import { configureStore } from '@reduxjs/toolkit';
import { postDetailReducer } from './movieDetailsReducer';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reviewsReducer } from './commentsReducer';

const moviePersistConfig = {
  key: 'movie',
  storage: storage,
  whitelist: ['movie'], //what i want to synchronize and save to a localStorage
};

export const store = configureStore({
  reducer: {
    movie: persistReducer(moviePersistConfig, postDetailReducer),
    reviews: reviewsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
