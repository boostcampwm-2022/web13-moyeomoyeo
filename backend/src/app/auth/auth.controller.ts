import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {}
