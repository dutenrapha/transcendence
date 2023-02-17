import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy, 'jwt') {
  constructor(){
    super({
      // Vamos fazer autenticacao a patir to token no header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // False, pois queremos que ele valide a expiracao do tolken nao esta vencida
      ignoreExpiration: false,
      // Chave de validacao, tem que ser via variavel de ambiente
      secretOrKey: 'abc123456',
    })
  }

  async validate(payload) {
    return payload;
  }
}
