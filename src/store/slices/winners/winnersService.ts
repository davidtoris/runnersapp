import { AppDispatch } from "@/store"
import { instanceAPI } from "@/config/axiosConfig"
import { winnerLoading, winners } from "./winnersSlice"
import { WinnerResponse } from "./winnersInterface"

export const getWinners = (genero : string, kms : string, edad : string, token : string,) => {
  return async (dispatch: AppDispatch) => {
    dispatch(winnerLoading(true))
    try {
      const {data} = await instanceAPI.get<WinnerResponse>(`/winners?genero=${genero}&kms=${kms}&edad=${edad}`, {
        headers: {
          'x-tokens': token,
        },
      })
      dispatch(winners(data));
    } catch (error: any) {
      console.log(error)
    }
  }
}
