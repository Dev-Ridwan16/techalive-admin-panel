import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    clearUser: (state) => {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
