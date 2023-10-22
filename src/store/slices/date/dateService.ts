import { AppDispatch } from "@/store"
import { instanceAPI } from "@/config/axiosConfig"
import { dateAll, dateLoading } from "./dateSlice"


export const getDate = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(dateLoading())
    try {
      const {data} = await instanceAPI.get('/date')
      dispatch(dateAll(data));
    } catch (error) {
      console.log(error);
    }
  }
}