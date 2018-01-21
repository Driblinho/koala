import { interfaces, controller, httpGet, httpPost, response, next, request, requestBody } from "inversify-koa-utils";
import { injectable, inject, targetName, named } from "inversify";
import { Cat } from "./cat.entity";
import { Response } from "koa";
import { getManager, EntityManager } from "typeorm";
import { KOALA_TYPES } from "koala/ioc/types";
import { CatService } from "./cat.service";

@controller("/cat")
@injectable()
export class CatController implements interfaces.Controller {

    @inject(CatService) public catService: CatService;
    @httpGet("/")

    private async index(@response() res: Response, next: () => Promise<any>) {
        res.body = await this.catService.getAllCats();
    }
    @httpPost("/add")
    private async add(@requestBody("cat") cat: Cat, @response() res: Response) {
        this.catService.create(cat.name, cat.age);
        res.body = `${cat.name} ${cat.age}`;
    }
}