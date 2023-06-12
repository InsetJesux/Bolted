import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { JWTPayloadDto } from '../dto/jwt-payload.dto';
import { AuthService } from '../auth.service';
import { validate, validateOrReject, ValidatorOptions } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JWTPayloadDto) {
    const jwtPayload = plainToInstance(JWTPayloadDto, payload);
    await validateOrReject(jwtPayload).catch((errors) => {
      throw new UnauthorizedException();
    });

    return this.authService.validateJWT(payload);
  }
}
