import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByThirdPartyId(Oauth: string) {
    const user = await this.userRepository.findOneBy({ Oauth });
    return user;
  }

  async registerOAuthUser(Oauth: string) {
    const user = this.userRepository.create({
      Oauth,
    });
    await this.userRepository.save(user);
  }
}
