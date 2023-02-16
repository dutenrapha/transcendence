import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService){}
  @Post('login')
  login(@Body() body) {
    return {token: this.authService.login(body.username, body.password)};
  }

  @Get('test-auth-unproteced')
  unproteced() {
    return {
      name: 'Essa rota não está protegida'
    }
  }

  @UseGuards(JwtGuard)
  @Get('test-auth-proteced')
  proteced(@Req() req) {
    // console.log(req.user)
    return {
      name: 'Essa rota está protegida'
    }
  }
}
