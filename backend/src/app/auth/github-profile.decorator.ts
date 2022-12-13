import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GithubProfile } from '@app/auth/type/github-profile';

export const RequestGithubProfile = createParamDecorator(
  (data, ctx: ExecutionContext): GithubProfile => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
