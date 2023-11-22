import { AppDispatch } from "@/store"
import { instanceAPI, instanceAPIData, instancePublicAPI } from "@/config/axiosConfig"
import { userAll, userItem, userLoading, userRespFunc, userStatusFunc } from "./userSlice"
import { UserPayload, UserResponse } from "./userInterface"
import Cookies from "js-cookie"
import { evidenceLoading, imagesEvidence, imagesPhoto, photoLoading, statusCodeFunc } from "../images/imagesSlice"

export const registerUser = ( user : UserPayload) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoading(true))
    try {
      const resp = await instancePublicAPI.post<UserResponse>('/users', user)
      Cookies.set('tokenUser', resp.data.token)
      Cookies.set('user', JSON.stringify(resp.data.usuario))
      dispatch(userAll(resp.data));
      dispatch(userRespFunc('register'))
    } catch (error: any) {
      console.log(error)
      dispatch(userStatusFunc(error?.response?.status));
    }
  }
}

export const showOneUser = ( id : string, token : string | null ) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoading(true))
    try {
      const resp = await instanceAPI.get(`/users/${id}`, {
        headers: {
          'x-tokens': token,
        },
      })
      dispatch(userItem(resp.data[0]));
    } catch (error: any) {
      console.log(error)
      dispatch(userStatusFunc(error?.response?.status));
    }
  }
}

export const getUsers = ( token : string | null ) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoading(true))
    try {
      const {data} = await instanceAPI.get(`/users`, {
        headers: {
          'x-tokens': token,
        },
      })
      dispatch(userAll(data))
    } catch (error: any) {
      console.log(error)
      dispatch(userStatusFunc(error?.response?.status));
    }
  }
}

export const updatedUser = ( id : string, token : string | null, user : UserPayload ) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoading(true))
    try {
      const resp = await instanceAPI.put(`/users/${id}`, user, {
        headers: {
          'x-tokens': token,
        },
      })
      Cookies.set('user', JSON.stringify(resp.data))
      dispatch(userRespFunc('editRegister'))
    } catch (error: any) {
      console.log(error)
      dispatch(userStatusFunc(error?.response?.status));
    }
  }
}

export const uploadEvidenceService = ( image : any, token : string, type : string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(evidenceLoading(true))
    try {
      const {data} = await instanceAPIData.post(`/users/uploadEvidence`, image, {
        headers: {
          'x-tokens': token,
        },
      })
      dispatch(imagesEvidence(data))
      console.log(data);
      
    } catch (error: any) {
      dispatch(statusCodeFunc(error?.response?.status))
      console.log(error);
    }
  }
}

export const uploadPhotoService = ( image : any, token : string, type : string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(photoLoading(true))
    try {
      const {data} = await instanceAPIData.post(`/users/uploadPhoto`, image, {
        headers: {
          'x-tokens': token,
        },
      })
      dispatch(imagesPhoto(data))
      console.log(data);
      
    } catch (error:any) {
      dispatch(statusCodeFunc(error?.response?.status))
      console.log(error);
    }
  }
}
