import { injectable, inject } from "inversify";
import { KOALA_TYPES } from "../koala/ioc/types";
import { Logger } from "pino";
import { getManager, EntityManager } from "typeorm";
import { Cat } from "./cat.entity";
import { providers } from "koala";

@injectable()
export class CatService {

    @inject(KOALA_TYPES.Logger) private loger: Logger;

    @inject(KOALA_TYPES.EntityManager) public em: providers.Manager;

    @inject("CatRepository") public catRepository: providers.KoalaRepository<Cat>;

    public async create(name: string, age: number) {
        this.loger.info(`${name} ${age}`);
        const cat = new Cat();
        cat.name = name;
        cat.age = age;
        (await this.catRepository()).save(cat);
    }

    public async getAllCats(): Promise<Cat[]> {
        return (await this.catRepository()).find();
    }

}
