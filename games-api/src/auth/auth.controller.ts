import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';

import { AuthService } from './auth.service.js';

@Controller('oauth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('token')
    createToken(
        @Body()
        body: {
            grant_type: string;
            client_id: string;
            client_secret: string;
        }
    )
    {
        if (body.grant_type !== 'client_credentials') {
            return {
                error: 'unsupported_grant_type',
            };
        }

        return this.authService.createToken(
        body.client_id,
        body.client_secret,
        );
    }
}
