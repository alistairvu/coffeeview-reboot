import { createSlice } from "@reduxjs/toolkit"
import { loginUser, registerUser } from "./actions"

interface UserInfo {
  _id: string
  firstName: string
  lastName: string
  email: string
  isAdmin: boolean
}

const initialState = {
  userInfo: {} as UserInfo,
  isRegistering: false,
  registerError: "",
  isLoggingIn: false,
  loginError: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    resetLogin: (state) => ({ ...state, loginError: "" }),
    resetRegister: (state) => ({ ...state, registerError: "" }),
    logoutUser: (state) => ({ ...state, userInfo: {} as UserInfo }),
  },

  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, () => ({ ...initialState, isLoggingIn: true, loginError: "" }))
    builder.addCase(loginUser.rejected, (_, action) => ({
      ...initialState,
      isLoggingIn: false,
      loginError: action.payload as string,
    }))
    builder.addCase(loginUser.fulfilled, (_, action) => ({
      ...initialState,
      isLoggingIn: false,
      loginError: "",
      userInfo: action.payload,
    }))

    builder.addCase(registerUser.pending, () => ({ ...initialState, isRegistering: true, registerError: "" }))
    builder.addCase(registerUser.rejected, (_, action) => ({
      ...initialState,
      isRegistering: false,
      registerError: action.payload as string,
    }))
    builder.addCase(registerUser.fulfilled, (_, action) => ({
      ...initialState,
      isRegistering: false,
      registerError: "",
      userInfo: action.payload,
    }))
  },
})

const { actions, reducer } = userSlice
export const { logoutUser, resetLogin, resetRegister } = actions
export { loginUser, registerUser }
export default reducer
