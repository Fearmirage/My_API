import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
    private clients = [
        {
        clientId: 'games-admin',
        clientSecret: 'games-secret',
        },
    ];

    private tokens: string[] = [];

    createToken(clientId: string, clientSecret: string) {
        const client = this.clients.find(
        (client) =>
            client.clientId === clientId &&
            client.clientSecret === clientSecret,
        );

        if (!client) {
            throw new UnauthorizedException('Invalid client credentials');
        }

        const accessToken = randomBytes(32).toString('hex');

        this.tokens.push(accessToken);

        return {
            access_token: accessToken,
            token_type: 'Bearer',
            expires_in: 3600,
        };
    }

    validateToken(token: string) {
        return this.tokens.includes(token);
    }
}