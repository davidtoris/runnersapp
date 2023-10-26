import { AppDispatch } from "@/store"
import { instanceAPI, instancePublicAPI } from "@/config/axiosConfig"
import { AuthPayload, ForgotPayload, NewPassPayload } from "../auth/authInterface"
import { userItem, userLoading, userRespFunc, userStatusFunc } from "../user/userSlice"
import { UserResponse } from "../user/userInterface"
import Cookies from "js-cookie"


export const login = ( user : AuthPayload) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoading(true))
    try {
      const resp = await instancePublicAPI.post<UserResponse>('/auth/login', user)
      Cookies.set('tokenUser', resp.data.token)
      Cookies.set('user', JSON.stringify(resp.data.usuario))
      dispatch(userItem(resp.data));
      dispatch(userRespFunc('login'))
    } catch (error: any) {
      console.log(error)
      dispatch(userStatusFunc(error?.response?.status));
    }
  }
}

export const forgot = ( email : ForgotPayload) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoading(true))
    try {
      const resp = await instancePublicAPI.post('/auth/forgot', email)
      dispatch(userRespFunc('forgot'))
      dispatch(userLoading(false))
    } catch (error: any) {
      console.log(error)
      dispatch(userStatusFunc(error?.response?.status));
    }
  }
}

export const newPass = ( pass : NewPassPayload) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoading(true))
    try {
      const resp = await instanceAPI.post('/auth/newPass', pass)
      dispatch(userRespFunc('newPass'))
    } catch (error: any) {
      console.log(error)
      dispatch(userStatusFunc(error?.response?.status));
    }
  }
}

export const validateToken = ( token : string | '' ) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoading(true))
    try {
      const resp = await instanceAPI.get('/auth/validate', {
        headers: {
          'x-tokens': token,
        },
      })
      dispatch(userRespFunc(''))
    } catch (error : any) {
      console.log(error);
      Cookies.remove('tokenUser')
      Cookies.remove('user')
      // location.replace("/login")
    }
  }
}
