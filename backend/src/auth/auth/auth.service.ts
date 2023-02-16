import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const users  = [
  {
    id:1,
    username: 'user1@user.com', 
    password: '$2b$10$ExYUtIhDn./x.S28oBHJD.H5FmhX5FVCP8BBRHKQLeKRFgxxdirdK',
    role: 'admin'
  },
  {
    id:2,
    username: 'user2@user.com', 
    password: '$2b$10$ExYUtIhDn./x.S28oBHJD.H5FmhX5FVCP8BBRHKQLeKRFgxxdirdK',
    role: 'user'
  },
  {
    id:3,
    username: 'user3@user.com', 
    password: '$2b$10$ExYUtIhDn./x.S28oBHJD.H5FmhX5FVCP8BBRHKQLeKRFgxxdirdK',
    role: 'user'
  },
  // bcrypt method
]

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService ){

  }
  login(username, password){
    const user = this.validateCredentials(username, password);
    const payload = {
      sub: user.id,
      username: user.username,
    };
    // Depois de autenticado o usuário o metodo login devolve o tolken com o payload
    return this.jwtService.sign(payload);

  }

  validateCredentials(username, password){
    // Compara username e o hash o password que o usuário forneceu com o hash do banco
    // Na aplicacao final trocar esse hardcode por uma consulta no banco
    const user = users.find(
      (u)=> u.username === username && bcrypt.compareSync(password, u.password),
    );
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  }
  

}
