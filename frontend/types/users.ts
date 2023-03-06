import { Key } from "react"

//export type User = {
//    id: Key
//    name: String
//    email: String
//    website: String
//    address: {
//        city: String
//    }
//}


export type User = {

  id: Key;
  username: String;
  email: String;
  password?: String;
  fullname: String;
  enable2fa: Boolean;
  refreshToken?: String;
  avatar: Uint8Array;
}
