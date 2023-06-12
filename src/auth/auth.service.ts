import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../users/entities/user.entity';
import { JWTPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: { id: true, email: true, password: true, isActive: true },
    });

    if (!user) throw new UnauthorizedException();

    if (!user.isActive) throw new UnauthorizedException(`Account disabled`);

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException();

    return user;
  }

  async validateJWT(payload: JWTPayloadDto) {
    const { id, email } = payload;

    const user = await this.userRepository.findOneBy({ id, email });

    if (!user.isActive) throw new UnauthorizedException(`Account disabled`);

    return user;
  }

  async login(user: User) {
    const payload: JWTPayloadDto = { id: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
