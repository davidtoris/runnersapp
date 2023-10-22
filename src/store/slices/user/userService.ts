import { AppDispatch } from "@/store"
import { instanceAPI, instanceAPIData, instancePublicAPI } from "@/config/axiosConfig"
import { userAll, userLoading, userRespStatusAct, userUpdate } from "./userSlice"
import { User, UserPayload } from "./userInterface"


export const registerUser = ( user : UserPayload) => {
  return async (dispatch: AppDispatch) => {
    dispatch(userLoading())
    try {
      const resp = await instancePublicAPI.post<User>('/users', user)
      dispatch(userAll(resp.data));
      dispatch(userUpdate(true));
      userRespStatusAct(resp.status)
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

// export const changePassword = ( token : changePasswordPayload) => {
//   return async (dispatch: AppDispatch) => {
//     try {
//       await instanceAPI.post<UserResponse>('/user/changePassword', token )
//       dispatch(changePasswordTrue('true'));
//     } catch (error) {
//       dispatch(changePasswordTrue('false'));
//     }
//   }
// }

// export const savePassword = ( newPassword : savePasswordPayload) => {
//   return async (dispatch: AppDispatch) => {
//     try {
//       await instanceAPI.post<UserResponse>('/user/savePassword', newPassword )
//       dispatch(savePasswordTrue('true'));
//     } catch (error) {
//       dispatch(savePasswordTrue('false'));
//     }
//   }
// }