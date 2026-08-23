import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { LoginResponse } from './interfaces/login.interface';
import { Public } from './public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() loginDto: LoginDto): Promise<ApiResponse<LoginResponse>> {
    const user = await this.authService.login(loginDto);

    return {
      status: true,
      data: user,
    };
  }
}
