import "reflect-metadata";
import { createConnection, EntityManager, getManager } from "typeorm";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import { Container } from "inversify";
import { interfaces, InversifyKoaServer, TYPE, next } from "inversify-koa-utils";
import * as session from "koa-session";

import { koalaIoC, CONFIG, KOALA_TYPES } from "./koala";

const PORT: number = Number(process.env.PORT) || 3000;

const router = new Router();

router.get("/", (ctx, next) => {
    ctx.body = "Hello Koala";
});

createConnection();

const server = new InversifyKoaServer(koalaIoC);

server.setConfig(app => {
    app.keys = ["some secret hurr"];
    app
        .use(session(CONFIG.SESSION_CONFIG, app))
        .use(bodyParser())
        .use(router.routes())
        .use(router.allowedMethods());
});

const app = server.build();

const koalaServer = app.listen(PORT);

export { koalaServer };