import { AppDispatch } from "@/store"
import { instanceAPI } from "@/config/axiosConfig"
import { dateAll, dateLoading } from "./dateSlice"

export const getDate = (token : string | null) => {
  return async (dispatch: AppDispatch) => {
    dispatch(dateLoading())
    try {
      const {data} = await instanceAPI.get('/date', {
        headers: {
          'x-tokens': token,
        },
      })
      dispatch(dateAll(data));
    } catch (error) {
      console.log(error);
    }
  }
}