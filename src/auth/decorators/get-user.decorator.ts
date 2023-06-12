import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

import { User } from '../../users/entities/user.entity';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    const user: User = req.user;

    if (!user) throw new InternalServerErrorException('User not found');

    if (!data) return user;

    if (!user[data])
      throw new InternalServerErrorException('User data not found');

    return user[data];
  },
);
