import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMovieById } from 'services/ApiServices';

export const fetchMovieDataThunk = createAsyncThunk(
  'movies/fetchMovieDataThunk',
  async (movieId, thunkApi) => {
    try {
      const movie = await fetchMovieById(movieId);
      return movie;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  movie: null,
  isLoading: false,
  error: false,
};

const postDetailSlice = createSlice({
  name: 'movie',
  initialState: initialState,
  reducers: {
    //these regular reducers are nt needed whe there is a thunk access to data
    // setIsLoading: (state, action) => {
    //   state.isLoading = action.payload;
    // },
    // setMovieDetails: (state, action) => {
    //   state.movie = action.payload;
    // },
    // setError: (state, action) => {
    //   state.error = action.payload;
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovieDataThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovieDataThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movie = action.payload;
      })
      .addCase(fetchMovieDataThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setIsLoading, setMovieDetails, setError } =
  postDetailSlice.actions;
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
