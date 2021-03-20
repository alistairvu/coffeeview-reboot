import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import cookie from "cookie"

interface LoginInfo {
  email: string
  password: string
}

interface RegisterInfo extends LoginInfo {
  firstName: string
  lastName: string
}

export const loginUser = createAsyncThunk("user/login", async (loginInfo: LoginInfo, thunkAPI) => {
  try {
    const res = await axios.put("/api/users", loginInfo)
    const { data } = res.data
    return data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const registerUser = createAsyncThunk("user/login", async (registerInfo: RegisterInfo, thunkAPI) => {
  try {
    const res = await axios.put("/api/users", registerInfo)
    const { data } = res.data
    return data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})
