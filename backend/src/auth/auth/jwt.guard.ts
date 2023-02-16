import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// Esse parâmetro 'jwt' está ligado com a estratégia que criamos no servico jwt-strategy.service
export class JwtGuard extends AuthGuard('jwt') {}