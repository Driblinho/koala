
import { interfaces, TYPE } from "inversify-koa-utils"
import { Container } from "inversify/dts/container/container";
import * as Glob from "glob-fs";
const glob = new Glob()

export function controllerLoader(container: Container) {
    let files = glob.readdirSync('./src/**/*.controller.ts');
    files.forEach(controler => {
        let controlerLoaderVar = require(`../../../${controler}`);
        let className = Object.keys(controlerLoaderVar).pop();
        container.bind<interfaces.Controller>(TYPE.Controller).to(controlerLoaderVar[className]).whenTargetNamed(className);
    });
}