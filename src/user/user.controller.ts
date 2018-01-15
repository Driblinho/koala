import { interfaces, controller, httpGet } from 'inversify-koa-utils';
import { injectable, inject } from 'inversify';
import { IRouterContext } from "koa-router"


@controller('/user')
@injectable()
export class UserController implements interfaces.Controller {


    @httpGet('/')
    private index(ctx: IRouterContext, next: () => Promise<any>): string {
        return ctx.body = "hello from decorator";
    }

}