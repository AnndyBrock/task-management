import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>{
    const {user_name, password, email} = authCredentialsDto;
    //hash password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = this.create({ user_name, password: hashPassword, email });
    try {
      await this.save(user);
    } catch (e) {
      //Check for duplicate values
      if(e.code === '23505'){
        throw new ConflictException('User with same data already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}