import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movie: null,
    isLoading: false,
    error: false,
  };

  const postDetailSlice = createSlice({
    name: 'movie',
    initialState: initialState,
    reducers: {
      setIsLoading: (state, action) => {
        state.isLoading = action.payload;
      },
      setMovieDetails: (state, action) => {
        state.movie = action.payload;
      },
      setError: (state, action) => {
        state.error = action.payload;
      },
    }
  });

  export const {setIsLoading, setMovieDetails, setError} = postDetailSlice.actions;
  export const postDetailReducer = postDetailSlice.reducer;
  
  // REDUX approach 
  //export const postDetailReducer = (state = initialState, action) => {
  //   switch(action.type) {
  //     case "movie/setIsLoading": {
  //       return {
  //         ...state,
  //         isLoading: action.payload
  //       }
  //     }
  //     case "movie/setMovieDetails": {
  //       return {
  //         ...state,
  //         movie: action.payload
  //       }
  //     }
  //     case "movie/setError": {
  //       return {
  //         ...state,
  //         error: action.payload
  //       }
  //     }
  //     default: return state;
  //   }
  // };

  // export const setIsLoading = (payload) => {
  //   return {
  //     type: 'movie/setIsLoading',
  //     payload,
  //   };
  // };

  // export const setMovieDetails = (payload) => {
  //   return {
  //     type: 'movie/setMovieDetails',
  //     payload,
  //   };
  // };

  // export const setError = (payload) => {
  //   return {
  //     type: 'movie/setError',
  //     payload,
  //   };
  // };

  //{type: "movie/setIsLoading", payload: true | false}
  //{type: "movie/setMovieDetails", payload: {...}}
  //{type: "movie/setError", payload: true | false}