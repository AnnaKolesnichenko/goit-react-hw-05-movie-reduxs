import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchReviews } from 'services/ApiServices';

//second thunk to fetch comments
export const fetchReviewsThunk = createAsyncThunk(
  'reviews/fetchReviewsThunk',
  async (movieId, thunkApi) => {
    try {
      const reviews = await fetchReviews(movieId);
      return reviews;
    } catch (error) {
      return thunkApi.rejectWithValue(error.messages);
    }
  }
);

const initialState = {
  reviews: [],
  isLoading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: initialState,

  extraReducers: builder => {
    builder
      .addCase(fetchReviewsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReviewsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const reviewsReducer = reviewsSlice.reducer;
