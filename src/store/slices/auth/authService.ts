import { AppDispatch } from "@/store"
import { instanceAPI, instancePublicAPI } from "@/config/axiosConfig"
import { AuthPayload, ForgotPayload, NewPassPayload } from "../auth/authInterface"
import { userItem, userLoading, userStatusFunc } from "../user/userSlice"
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
      dispatch(userStatusFunc(resp.status));
      dispatch(userLoading(false))
    } catch (error: any) {
      console.log(error)
      dispatch(userStatusFunc(error?.response?.status));
      dispatch(userLoading(false))
    }
  }
}

export const forgot = ( email : ForgotPayload) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoading(true))
    try {
      const resp = await instancePublicAPI.post('/auth/forgot', email)
      dispatch(userStatusFunc(resp.status));
      dispatch(userLoading(false))
    } catch (error: any) {
      console.log(error)
      dispatch(userStatusFunc(error?.response?.status));
      dispatch(userLoading(false))
    }
  }
}

export const newPass = ( pass : NewPassPayload) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoading(true))
    try {
      const resp = await instanceAPI.post('/auth/newPass', pass)
      dispatch(userStatusFunc(resp.status));
      dispatch(userLoading(false))
    } catch (error: any) {
      console.log(error)
      dispatch(userStatusFunc(error?.response?.status));
      dispatch(userLoading(false))
    }
  }
}

export const validateToken = ( token : string | '' ) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoading(true))
    console.log(token);
    try {
      const {data} = await instanceAPI.get('/auth/validate', {
        headers: {
          'x-tokens': token,
        },
      })
      console.log(data);
    } catch (error : any) {
      console.log(error);
      Cookies.remove('tokenUser')
      Cookies.remove('user')
      location.replace("/login")
    }
  }
}
