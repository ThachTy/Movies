import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly userService = new UserService();
  private readonly jwtService = new JwtService();

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService._prisma.nguoiDung.findFirst({
      where: { email },
    });

    if (user && (await bcrypt.compareSync(pass, user.mat_khau))) {
      const { mat_khau, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, pass: string) {
    return {
      token: this.jwtService.sign({ email, pass }),
    };
  }
}
