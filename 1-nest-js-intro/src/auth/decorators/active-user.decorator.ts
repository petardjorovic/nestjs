import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/constants/constants';
import { ActiveUserType } from '../interfaces/active-user-type.interface';

export const activeUser = createParamDecorator(
  (field: keyof ActiveUserType | undefined, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    const user: ActiveUserType = request[REQUEST_USER_KEY];

    return field ? user?.[field] : user;
  },
);
