import { useSelector } from "react-redux"
import { rootState } from "../redux"
import { useState, useEffect } from "react"
import cookie from "js-cookie"
import jwt from "jsonwebtoken"

interface TokenData {
  _id: string
  iat: number
  exp: number
}

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const userInfo = useSelector((state: rootState) => state.user.userInfo)

  useEffect(() => {
    checkAuth()
  }, [userInfo])

  const checkAuth = () => {
    if (!userInfo._id) {
      setIsAuth(false)
      return
    }

    console.log(cookie.get("coffeeview-token"))
    const token = cookie.get("coffeeview-token")

    try {
      const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET) as TokenData
      console.log(decoded)
      if (decoded._id === userInfo._id) {
        setIsAuth(true)
      }
    } catch (err) {
      console.log(err)
      setIsAuth(false)
      return
    }
  }

  return { isAuth, setIsAuth, checkAuth }
}
