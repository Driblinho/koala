import { Container, interfaces } from "inversify"
import { EntityManager, getManager, ObjectType, Entity } from "typeorm"
import { Repository } from "typeorm/repository/Repository";

namespace bind_database {
    export function binEntityManager(container: Container, type: symbol) {
        container.bind<EntityManager>(type).toProvider<EntityManager>((context) => {
            return () => {
                return new Promise<EntityManager>((resolve, reject) => {
                    resolve(getManager())
                });
            };
        });
    }

    // export function bindRepository(container: Container, entity: ObjectType<Entity> | string) {
    //     container.bind<Repository<Cat>>(Repository<Cat>).toProvider<EntityManager>((context) => {
    //         return () => {
    //             return new Promise<EntityManager>((resolve, reject) => {
    //                 resolve(getManager())
    //             });
    //         };
    //     });
    // }
}