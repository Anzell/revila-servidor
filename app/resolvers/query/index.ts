import { UsuarioResolver } from "./usuario";
import { JogoResolver } from "./jogo";

export const Query = {
    ...UsuarioResolver,
    ...JogoResolver
}