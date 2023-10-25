import { AppDispatch } from "@/store"
import { instanceAPI, instancePublicAPI } from "@/config/axiosConfig"
import { AuthPayload, ForgotPayload, NewPassPayload } from "../auth/authInterface"
import { userError, userItem, userLoading, userRespStatusAct, userUpdate } from "../user/userSlice"
import { UserResponse } from "../user/userInterface"


export const login = ( user : AuthPayload) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoading())
    try {
      const {data} = await instancePublicAPI.post<UserResponse>('/auth/login', user)
      dispatch(userItem(data));
      dispatch(userUpdate(true));
      localStorage.setItem('tokenUser', data.token)
      localStorage.setItem('user', JSON.stringify(data.usuario))
    } catch (error: any) {
      console.log(error)
      dispatch(userError());
      dispatch(userRespStatusAct(error?.response?.status));
    }
  }
}

export const forgot = ( email : ForgotPayload) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoading())
    try {
      const resp = await instancePublicAPI.post('/auth/forgot', email)
      dispatch(userRespStatusAct(resp.status));
    } catch (error: any) {
      console.log(error)
      dispatch(userRespStatusAct(error?.response?.status));
    }
  }
}

export const newPass = ( pass : NewPassPayload) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoading())
    try {
      const resp = await instanceAPI.post('/auth/newPass', pass)
      dispatch(userRespStatusAct(resp.status));
    } catch (error: any) {
      console.log(error)
      dispatch(userRespStatusAct(error?.response?.status));
    }
  }
}

export const validateToken = ( token : string | null ) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoading())
    try {
      const {data} = await instanceAPI.get('/auth/validate', {
        headers: {
          'x-tokens': token,
        },
      })
      console.log(data);
    } catch (error : any) {
      console.log(error);
      location.replace("/login")
      localStorage.removeItem('user')
      localStorage.removeItem('tokenUser')
    }
  }
}
