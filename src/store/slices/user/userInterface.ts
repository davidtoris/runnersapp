export interface UserResponse {
  usuario: User,
  token: string,
}

export interface User {
  _id: string,
  apellido: string,
  correo: string,
  correoFamiliar: string,
  depto: string,
  direccion: string,
  edad: string,
  estado: string,
  genero: string,
  images: string,
  kms: string,
  nombre: string,
  numColaborador: string,
  numRunner: string,
  otroDepto: string,
  password: string,
  playera: string,
  role: string,
  tipo: string,
  ubicacion: string,
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
  userFounded: boolean | null,
  userLoading: boolean,
  userStatus: null,
}