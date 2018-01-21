

import { Container } from "inversify/dts/container/container";
import * as Glob from "glob-fs";
import { ObjectType, Entity } from "typeorm";
const glob = new Glob()

export namespace loader {

    export function findAll(fileExtension: string, op: (className: string, classInstance) => void) {
        //let files = glob.readdirSync('./src/**/*.controller.ts');
        let files = glob.readdirSync(`./src/**/*.${fileExtension}`);
        files.forEach(file => {
            let requireFile = require(`../../../${file}`);
            let className = Object.keys(requireFile).pop();
            op(className, requireFile[className])
        });
    }

    export function findControllers(controller: (className: string, classInstance) => void) {
        findAll("controller.ts", controller);
    }

    export function findServices(service: (classInstance) => void) {
        findAll("service.ts", (n, i) => service(i));
    }

    export function findRepository(repo: (className: string, classInstance: Function) => void) {
        findAll("entity.ts", repo);
    }
}

