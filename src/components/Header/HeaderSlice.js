import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  active: 'all',
}

export const HeaderSlice = createSlice({
  name: 'active_header',
  initialState,
  reducers: {
    activeHead: (state, action) => {
      state.active = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { activeHead } = HeaderSlice.actions
export default HeaderSlice.reducer