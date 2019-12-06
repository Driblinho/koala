import * as path from 'path'
import { Container } from "inversify";
import * as Glob from "glob-fs";
import { ObjectType, Entity } from "typeorm";
const glob = new Glob();

const RUN_TYPE: number = Number(process.env.RUN_TYPE) || 1;

export namespace loader {

    export function findAll(fileExtension: string, op: (className: string, classInstance: any) => void) {
        let files

        if(RUN_TYPE == 1) {
            fileExtension = fileExtension.replace(".ts", ".js")
            files = glob.readdirSync(`/**/*.${fileExtension}`)
        } else if(RUN_TYPE == 2) {
            files = glob.readdirSync(`./src/**/*.${fileExtension}`)
        }
        
        files.forEach(file => {
            let requireFile;
            if (RUN_TYPE == 2) {
                requireFile = require(`../../../${file}`);
            } else {
                requireFile = require(`./../../${file}`);
            }
            
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
