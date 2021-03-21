import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import cookie from "js-cookie"

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
    const res = await axios.put("/api/users", loginInfo, { withCredentials: true })
    const { data, token } = res.data
    cookie.set("coffeeview-token", token)
    return data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const registerUser = createAsyncThunk("user/register", async (registerInfo: RegisterInfo, thunkAPI) => {
  try {
    const res = await axios.post("/api/users", registerInfo)
    const { data, token } = res.data
    cookie.set("coffeeview-token", token)
    return data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})
