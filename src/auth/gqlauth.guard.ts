import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const reqCtx = ctx.getContext();
    console.log('arg:  ' + ctx.getArgs(), 'class : ' + ctx.getClass() + reqCtx);

    return reqCtx;
  }
}
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const ctx = GqlExecutionContext.create(context);
    console.log('roles: ', roles);
    console.log('context: ', context.switchToHttp().getRequest());
    console.log('gqlContext: ', ctx.getContext().req.headers.input);

    return true;
  }
}
