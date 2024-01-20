import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  posts: [],
  status: '',
  error: '',
  filteredPost: []
}

export const fetchCountryData = createAsyncThunk('data/fetchCountryData', async () => {
  try {
    const response = await axios.get('https://restcountries.com/v2/all?fields=name,region,flag');
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const postsSlice = createSlice({
  name: 'active_header',
  initialState,
  reducers: {
    filteredDataAction : (state, action) => {
      state.filteredPost = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountryData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchCountryData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
})

// Action creators are generated for each case reducer function
export const { filteredDataAction } = postsSlice.actions
export default postsSlice.reducer