import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, } from '@nestjs/common'; 
import { AuthService } from './auth.service.js';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        if (!authorization) {
            throw new UnauthorizedException( 'Missing authorization header', );
        }
        const [type, token] = authorization.split(' ');
        if (type !== 'Bearer' || !token) {
            throw new UnauthorizedException( 'Invalid authorization header', );
        }
        const valid = this.authService.validateToken(token);
        if (!valid) {
            throw new UnauthorizedException( 'Invalid access token', );
        }

        return true;
    }
}