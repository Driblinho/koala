import { EntityManager, Repository } from "typeorm";

namespace providers {
    export type Manager = () => Promise<EntityManager>;
    export type KoalaRepository<T> = () => Promise<Repository<T>>;
}

export { providers };