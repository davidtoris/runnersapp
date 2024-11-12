import { AppDispatch } from "@/store"
import { instanceAPI, instanceAPIData, instancePublicAPI } from "@/config/axiosConfig"
import { userAll, userItem, userLoading, userRespFunc, userStatusFunc } from "./userSlice"
import { User, UserPayload, UserResponse } from "./userInterface"
import Cookies from "js-cookie"
import { errorEvidenceFunc, errorPhotoFunc, evidenceLoading, imagesEvidence, imagesPhoto, photoLoading } from "../images/imagesSlice"

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
      const {data} = await instanceAPI.get<User>(`/users`, {
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
      dispatch(errorEvidenceFunc(200))
      console.log(data);
      
    } catch (error: any) {
      console.log(error);
      if (error.request.status === 0) {
        dispatch(errorEvidenceFunc(413))
      }
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
      dispatch(errorPhotoFunc(200))
    } catch (error:any) {
      console.log(error);
      if (error.request.status === 0) {
        dispatch(errorPhotoFunc(413))
      }
    }
  }
}

export const saveTime = ( time : {}, token : string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoading(true))
    try {
      const { data } = await instanceAPI.post('/users/saveTime', time, {
        headers: {
          'x-tokens': token,
        },
      })
      dispatch(userItem(data))
      dispatch(userRespFunc('evidence'))
      
    } catch (error:any) {
      console.log(error);
      if (error.request.status === 0) {
        dispatch(errorPhotoFunc(413))
      }
    }
  }
}
