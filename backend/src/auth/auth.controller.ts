import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request as RequestType, Response as ResponseType } from 'express';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from './jwt/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Req() req: RequestType, @Res({ passthrough: true }) res: ResponseType): Promise<void> {
    res.cookie('access_token', '', { maxAge: -1, httpOnly: true });
    res.cookie('refresh_token', '', { maxAge: -1, httpOnly: true });
    return await this.authService.logout(req.user['sub']);
  }
}