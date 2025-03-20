import { Injectable,  HttpException, HttpStatus } from '@nestjs/common';
import { LoginDto } from './dto/login';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { signInWithEmailAndPasswordMethod } from 'src/firebase/firebaseAuth';

@Injectable()
export class AuthService {
  async login(loginDto: LoginDto) {

    try{
      const loggedIn = await signInWithEmailAndPasswordMethod(loginDto.email, loginDto.password);

      // Extract the JWT (idToken) from the response
      const idToken = await loggedIn.user.getIdToken();


      if (!idToken) {
        throw new HttpException('Failed to retrieve JWT', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      return {  token: idToken };
    }catch(error){
      throw new HttpException(`Error in login (${error.code})`, HttpStatus.INTERNAL_SERVER_ERROR)
    }


  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
