import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = {
      id: 1,
      email: 'admin',
      password: '$2a$12$luzYYgcdCKsBftPfrTwnKuYBk1c8Kkrvi0nojbX9POWJourMPzbzq',
      isAdmin: true,
    };

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (user && isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      flag: process.env.FLAG,
    };
  }
}
