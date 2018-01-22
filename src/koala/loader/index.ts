
import { Container } from "inversify";
import * as Glob from "glob-fs";
import { ObjectType, Entity } from "typeorm";
const glob = new Glob();

export namespace loader {

    export function findAll(fileExtension: string, op: (className: string, classInstance: any) => void) {
        const files = glob.readdirSync(`./src/**/*.${fileExtension}`);
        files.forEach(file => {
            const requireFile = require(`../../../${file}`);
            const className = Object.keys(requireFile).pop();
            op(className, requireFile[className]);
        });
    }

    export function findControllers(controller: (className: string, classInstance: any) => void) {
        findAll("controller.ts", controller);
    }

    export function findServices(service: (classInstance: any) => void) {
        findAll("service.ts", (n, i) => service(i));
    }

    export function findRepository(repo: (className: string, classInstance: Function) => void) {
        findAll("entity.ts", repo);
    }
}
