import { Key } from "react"

export type User = {

  id: Key;
  username: String;
  email: String;
  password?: String;
  firstName: String;
  lastName: String;
  enable2fa: Boolean;
  refreshToken?: String;
  avatar: Uint8Array;
}
