import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRECT_KEY,
    });
  }

  async validate(payload: any) {
    let { email, mat_khau } = payload;

    const user = this.authService.validateUser(email, mat_khau);
    if (!user) {
      // Email, mật khẩu không hợp lệ
      throw new UnauthorizedException('Đăng nhập thất bại');
    }

    return user;
  }
}
