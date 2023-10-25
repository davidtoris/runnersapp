import { AppDispatch } from "@/store"
import { instanceAPI, instanceAPIData, instancePublicAPI } from "@/config/axiosConfig"
import { userAll, userItem, userLoading, userRespStatusAct, userUpdateAct } from "./userSlice"
import { User, UserPayload } from "./userInterface"


export const registerUser = ( user : UserPayload) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoading())
    try {
      const resp = await instancePublicAPI.post<User>('/users', user)
      dispatch(userAll(resp.data));
      dispatch(userUpdateAct(true));
      dispatch(userRespStatusAct(resp.status))
    } catch (error: any) {
      console.log(error)
      dispatch(userRespStatusAct(error?.response?.status));
    }
  }
}

export const showOneUser = ( id : string, token : string | null ) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoading())
    try {
      const resp = await instanceAPI.get(`/users/${id}`, {
        headers: {
          'x-tokens': token,
        },
      })
      console.log(resp);
      dispatch(userItem(resp.data[0]));
      // dispatch(userUpdateAct(true));
      // userRespStatusAct(resp.status)
    } catch (error: any) {
      console.log(error)
      dispatch(userRespStatusAct(error?.response?.status));
    }
  }
}

export const updatedUser = ( id : string, token : string | null, user : UserPayload ) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoading())
    try {
      const resp = await instanceAPI.put(`/users/${id}`, user, {
        headers: {
          'x-tokens': token,
        },
      })
      console.log(resp?.data);
      localStorage.setItem('user', JSON.stringify(resp.data))
      // dispatch(userItem(resp.data[0]));
      // dispatch(userUpdateAct(true));
      dispatch(userRespStatusAct(resp.status))
    } catch (error: any) {
      console.log(error)
      dispatch(userRespStatusAct(error?.response?.status));
    }
  }
}

export const uploadImage = ( image : any) => {
  return async (dispatch: AppDispatch) => {
    try {
      const {data} = await instanceAPIData.post('/users/uploadImage', image )
      console.log(data);
      
    } catch (error) {
      
    }
  }
}
