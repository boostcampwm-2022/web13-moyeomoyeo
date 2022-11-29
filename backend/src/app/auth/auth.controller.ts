import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GithubAuthGuard } from '@app/auth/github-auth.guard';
import { RequestGithubProfile } from '@app/auth/github-profile.decorator';
import { GithubProfile } from '@app/auth/type/github-profile';
import { AuthService } from '@app/auth/auth.service';
import { JwtTokenService } from '@common/module/jwt-token/jwt-token.service';
import { GithubConfigService } from '@config/github/config.service';
import { CookieConfigService } from '@config/cookie/config.service';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly githubConfigService: GithubConfigService,
    private readonly cookieConfigService: CookieConfigService,
  ) {}

  @Get('/github/login')
  @UseGuards(GithubAuthGuard)
  githubLogin() {
    return;
  }

  @Get('/github/callback')
  @UseGuards(GithubAuthGuard)
  async githubCallback(
    @RequestGithubProfile() githubProfile: GithubProfile,
    @Res() response: Response,
  ) {
    const user = await this.authService.socialLogin({
      id: githubProfile.id,
      profileImage: githubProfile._json.avatar_url,
      blogUrl: githubProfile._json.blog,
      githubUrl: githubProfile.profileUrl,
      socialType: 'GITHUB',
    });

    const { accessToken, accessTokenExpires } =
      this.jwtTokenService.generateAccessToken(user);
    const { refreshToken, refreshTokenExpires } =
      this.jwtTokenService.generateRefreshToken(user);

    response.cookie('access_token', accessToken, {
      httpOnly: true,
      expires: new Date(accessTokenExpires * 1000),
      secure: this.cookieConfigService.secure,
      sameSite: this.cookieConfigService.sameSite,
    });
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      expires: new Date(refreshTokenExpires * 1000),
      secure: this.cookieConfigService.secure,
      sameSite: this.cookieConfigService.sameSite,
    });

    response.redirect(this.githubConfigService.redirectUrl);
  }
}
