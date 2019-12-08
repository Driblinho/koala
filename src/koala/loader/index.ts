import * as path from 'path'
import * as fs from 'fs'
import { Container } from "inversify";
import { ObjectType, Entity } from "typeorm";
const RUN_TYPE: number = Number(process.env.RUN_TYPE) || 1;

export namespace loader {

    function getFileFromDir(dir) {
        var results = [];
        var list = fs.readdirSync(dir);
        list.forEach(function(file) {
            file = dir + '/' + file;
            var stat = fs.statSync(file);
            if (stat && stat.isDirectory()) { 
                /* Recurse into a subdirectory */
                results = results.concat(getFileFromDir(file));
            } else { 
                /* Is a file */
                results.push(file);
            }
        });
        return results;
    }

    

    export function findAndLoad(fileExtension: string, op: (className: string, classInstance: any) => void) {
         
        if(RUN_TYPE!=2) 
            fileExtension = fileExtension.replace(".ts", ".js")
            
        const myRegx = new RegExp(`([a-zA-Z0-9\\s_\\\.\\-\\(\\):])+(.${fileExtension})$`)

        getFileFromDir(path.join(__dirname, '/../..')).forEach(file => {
            if(myRegx.test(file)) {
                const requireFile = require(file);
                const className = Object.keys(requireFile).pop();
                op(className, requireFile[className]);   
            }
        })

    }

    export function findControllers(controller: (className: string, classInstance: any) => void) {
        findAndLoad("controller.ts", controller);
    }

    export function findServices(service: (classInstance: any) => void) {
        findAndLoad("service.ts", (n, i) => service(i));
    }

    export function findRepository(repo: (className: string, classInstance: Function) => void) {
        findAndLoad("entity.ts", repo);
    }
}
