import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GithubAuthGuard } from '@app/auth/github-auth.guard';
import { RequestGithubProfile } from '@app/auth/github-profile.decorator';
import { GithubProfile } from '@app/auth/type/github-profile';
import { AuthService } from '@app/auth/auth.service';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/github/login')
  @UseGuards(GithubAuthGuard)
  githubLogin() {
    return;
  }

  @Get('/github/callback')
  @UseGuards(GithubAuthGuard)
  githubCallback(@RequestGithubProfile() githubProfile: GithubProfile) {
    return githubProfile;
  }
}
