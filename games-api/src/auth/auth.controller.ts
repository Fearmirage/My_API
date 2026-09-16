import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service.js';

@Controller('oauth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}


    @ApiBody({ // Metadata for Swagger
        schema: {
            type: 'object',
            properties: {
            grant_type: {
                type: 'string',
                example: 'client_credentials',
            },
            client_id: {
                type: 'string',
                example: 'games-admin',
            },
            client_secret: {
                type: 'string',
                example: 'games-secret',
            },
            },
        },
    })
    @ApiResponse({ // Metadata for Swagger
        status: 200,
        description: 'OAuth access token generated successfully.',
    })
    @ApiResponse({ // Metadata for Swagger
        status: 401,
        description: 'Invalid client credentials.',
    })
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
