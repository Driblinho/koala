
import { Container } from "inversify"
import { KOALA_TYPES } from "./types";
import { controllerLoader } from "../loader"

const KoalaIoC = new Container();
controllerLoader(KoalaIoC)

export { KoalaIoC };