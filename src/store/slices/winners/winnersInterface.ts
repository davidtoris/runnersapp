
export interface WinnerResponse {
  _id: string,
  apellido: string,
  imgEvidence: string,
  imgPhoto: string,
  kms: string,
  nombre: string,
  numRunner: string,
  time: string,
}

export interface Winner {
  users: []
  total: number
}


export interface UserInterface {
  winners: Winner | null,
  winnerLoading: boolean,
}