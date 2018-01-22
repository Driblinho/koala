
import { Container } from "inversify";
import { interfaces, TYPE } from "inversify-koa-utils";
import { KOALA_TYPES } from "./types";
import { loader } from "../loader";
import * as session from "koa-session";
import * as Pino from "pino";
// tslint:disable-next-line:no-duplicate-imports
import { Logger } from "pino";
import { getManager, getConnection, Entity, Repository, EntityManager } from "typeorm";
import { Cat } from "../../cat/cat.entity";

const koalaIoC = new Container();

// Bind Controllers
loader.findControllers((name, instance) => {
    koalaIoC.bind<interfaces.Controller>(TYPE.Controller).to(instance).whenTargetNamed(name);
});

// Auto bind services
loader.findServices(service => {
    koalaIoC.bind(service).to(service);
});

// Bind Pino logger
koalaIoC.bind<Logger>(KOALA_TYPES.Logger).toConstantValue(Pino());

// Auto bind EntityManager
koalaIoC.bind<EntityManager>(KOALA_TYPES.EntityManager).toProvider<EntityManager>((context) => {
    return () => {
        return new Promise<EntityManager>((resolve, reject) => {
            resolve(getManager());
        });
    };
});

// Auto bind Repository
loader.findRepository((m, i) => {
    koalaIoC.bind(`${m}Repository`).toProvider((context) => {
        return () => {
            return new Promise((resolve, reject) => {
                resolve(getManager().getRepository(Cat));
            });
        };
    });
});

export { koalaIoC };