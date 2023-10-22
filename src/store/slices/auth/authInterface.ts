export interface AuthPayload {
  correo: string,
  password: string,
}

export interface ForgotPayload {
  correo: string,
}

export interface NewPassPayload {
  password: string,
}
