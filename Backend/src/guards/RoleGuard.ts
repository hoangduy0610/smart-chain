import {CanActivate, ExecutionContext, HttpStatus, Injectable, Logger} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {ApplicationException} from '../controllers/ExceptionController';
import {MessageCode} from '../commons/MessageCode';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {
	}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.get<string[]>('roles', context.getHandler());
		if (!roles) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		const hasRole = () => user.roles.some((role) => roles.includes(role));
		if (user && user.roles && hasRole()) {
			return true;
		}
		Logger.warn('User ' + user.username + ' need ' + roles + ' permission to access ' + request.originalUrl, null, false);
		throw new ApplicationException(HttpStatus.FORBIDDEN, MessageCode.USER_NOT_HAVE_PERMISSION);
	}
}
