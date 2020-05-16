import { envs } from "../../configuracao/envs";

export const UsuarioResolver = {
    async usuario(_, { filtro }) {
        if (!filtro) {
            return null;
        }
        if (filtro.id_firebase) {
            const usuario = await envs.bd.first("Usuario","id_firebase",filtro.id_firebase);
            return usuario.properties();
        } else if (filtro.nickname) {
            const usuario = await envs.bd.first("Usuario","nickname",filtro.nickname);
            return usuario.properties();
        } else {
            return null;
        }
    }
};