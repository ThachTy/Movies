import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './/auth.service';
import { CreaterDangNhapDTO } from '@/dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  private readonly authService = new AuthService();

  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          default: 'demo9@email.com',
        },
        mat_khau: {
          type: 'object',
          default: 'Passw0rd',
        },
      },
    },
  })
  @Post('/login')
  async login(@Body() body: CreaterDangNhapDTO) {
    const { email, mat_khau } = body;

    return await this.authService.login(email, mat_khau);
  }
}
