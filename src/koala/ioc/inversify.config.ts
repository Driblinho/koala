
import { Container } from "inversify"
import { interfaces, TYPE } from "inversify-koa-utils"
import { KOALA_TYPES } from "./types";
import { loader } from "../loader"
import * as session from "koa-session"
import * as Pino from "pino"
import { Logger } from "pino";
import { EntityManager } from "typeorm/entity-manager/EntityManager";
import { getManager, getConnection, Entity } from "typeorm";
import { Repository } from "typeorm/repository/Repository";
import { Cat } from "../../cat/cat.entity";

const KoalaIoC = new Container();

// Bind Controllers
loader.findControllers((name, instance) => {
    KoalaIoC.bind<interfaces.Controller>(TYPE.Controller).to(instance).whenTargetNamed(name);
})

// Auto bind services
loader.findServices(service => {
    KoalaIoC.bind(service).to(service);
})

// Bind Pino logger
KoalaIoC.bind<Logger>(KOALA_TYPES.Logger).toConstantValue(Pino());

// Auto bind EntityManager
KoalaIoC.bind<EntityManager>(KOALA_TYPES.EntityManager).toProvider<EntityManager>((context) => {
    return () => {
        return new Promise<EntityManager>((resolve, reject) => {
            resolve(getManager())
        });
    };
});

// Auto bind Repository
loader.findRepository((m, i) => {
    console.log(m);

    KoalaIoC.bind(`${m}Repository`).toProvider((context) => {
        return () => {
            return new Promise((resolve, reject) => {
                resolve(getManager().getRepository(Cat))
            });
        };
    });
})


export { KoalaIoC };