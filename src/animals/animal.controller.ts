import { interfaces, controller, httpGet, response, next } from 'inversify-koa-utils';
import { injectable, inject } from 'inversify';
import { IRouterContext } from "koa-router"
import { Connection } from 'typeorm/connection/Connection';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { Cat } from './cat.entity';
import { Response } from 'koa';


import { KOALA_TYPES } from "../app.util/ioc/types"
import { getManager } from 'typeorm';

@controller('/cat')
@injectable()
export class CatController implements interfaces.Controller {

    @httpGet('/')
    private async index( @response() res: Response, next: () => Promise<any>) {
        let em: EntityManager = getManager();
        let result = await em.find(Cat);
        res.body = result
    }

    @httpGet("/add")
    private async addNewCat( @response() res: Response) {

        let em: EntityManager = getManager();
        const cat = new Cat();
        cat.name = "filemon";
        cat.age = 5;
        try {
            res.body = em.save(cat)
        } catch (error) {
            console.log(error)
            res.body = "Wystąpił błąd";
        }
    }

}