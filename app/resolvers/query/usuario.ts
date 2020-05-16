import { envs } from "../../configuracao/envs";

export const UsuarioResolver = {
    async usuario(_, { filtro }) {
        if (!filtro) {
            return null;
        }
        if (filtro.id) {
            const usuario = await envs.bd.first("Usuario", "uid", filtro.uid);
            if (!usuario) {
                return null;
            }
            return usuario.properties();
        } else if (filtro.nickname) {
            const usuario = await envs.bd.first("Usuario", "nickname", filtro.nickname);
            if (!usuario) {
                return null;
            }
            return usuario.properties();
        } else {
            return null;
        }
    }
};