import "reflect-metadata"
import { createConnection } from "typeorm"
import * as Koa from "koa"
import * as Router from "koa-router"
import * as bodyParser from "koa-bodyparser"
import { Container } from 'inversify';
import { interfaces, InversifyKoaServer, TYPE } from "inversify-koa-utils"

import { KoalaIoC } from "./app.util"


const PORT: number = Number(process.env.PORT) || 3000;

const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = 'Hello Koala';
});

createConnection();


let server = new InversifyKoaServer(KoalaIoC);

server.setConfig((app) => {
    app
        .use(bodyParser())
        .use(router.routes())
        .use(router.allowedMethods());
});

const app = server.build();
const koalaServer = app.listen(PORT);

export default koalaServer;