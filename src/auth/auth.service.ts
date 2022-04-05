import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ){}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    const { user_name, password, email } = authCredentialsDto;
    const user = await this.userRepository.findOne({ user_name });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {user_name, email};
      const accessToken: string = await this.jwtService.sign(payload);
      return {accessToken};
    } else {
      throw new UnauthorizedException('')
    }
  }
}
