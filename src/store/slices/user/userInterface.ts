export interface UserResponse {
  usuario: User,
  token: string,
}

export interface User {
  _id: string,
  nombre: string,
  apellido: string,
  correo: string,
  password: string,
  numColaborador: string,
  edad: string,
  kms: string,
  sexo: string,
  role: string,
  estado: string,
  numRunner: string,
}

export interface UserPayload {
  nombre: string | null,
  apellido: string | null,
  correo: string | null,
  password: string | null,
  tipo: string | null,
  numColaborador: string | null,
  depto: string | null,
  otroDepto: string | null,
  correoFamiliar: string | null,
  ubicacion: string | null,
  direccion: string | null,
  edad: string | null,
  playera: string | null,
  kms: string | null,
  genero: string | null,
}

export interface UserInterface {
  users: User | null,
  userItem: User | null,
  userStatus: string,
  userUpdate: boolean,
  userFounded: boolean | null,
  userRespStatus: null,
}