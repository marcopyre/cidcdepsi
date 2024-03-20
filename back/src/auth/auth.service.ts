import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { UsersService } from 'src/users/users.service';
dotenv.config();

export enum Provider {
  GOOGLE = 'google',
}

export type IUser = {
  id: number;
  Oauth: string;
  isAdmin: boolean;
};

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY = process.env.JWT_KEY; // <- replace this with your secret key

  constructor(private readonly usersService: UsersService) {}

  async validateOAuthLogin(
    thirdPartyId: string,
    provider: Provider,
  ): Promise<string> {
    try {
      const user: IUser =
        await this.usersService.findOneByThirdPartyId(thirdPartyId);

      if (!user) await this.usersService.registerOAuthUser(thirdPartyId);

      const payload = {
        thirdPartyId,
        provider,
      };

      const jwt: string = sign(payload, this.JWT_SECRET_KEY, {
        expiresIn: '7d',
      });
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }

  async verifyTokenClaims(payload: {
    thirdPartyId: string;
    provider: string;
    iat: number;
    exp: number;
  }) {
    const user = await this.usersService.findOneByThirdPartyId(
      payload.thirdPartyId,
    );

    return user.isAdmin;
  }
}
