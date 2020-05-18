import { envs } from "../../configuracao/envs";

export const UsuarioResolver = {
    // async usuario(_, { filtro }) {
    //     if (!filtro) {
    //         return null;
    //     }
    //     if (filtro.id) {
    //         const usuario = await envs.bd.first("Usuario", "uid", filtro.uid);
    //         if (!usuario) {
    //             return null;
    //         }
    //         return usuario.properties();
    //     } else if (filtro.nickname) {
    //         const usuario = await envs.bd.first("Usuario", "nickname", filtro.nickname);
    //         if (!usuario) {
    //             return null;
    //         }
    //         return usuario.properties();
    //     } else {
    //         return null;
    //     }
    // },

    async loginUsuarioEmailSenha(_, { email, senha }) {
        try {
            if (!email || !senha) {
                return null;
            }
            const usuarioFirebase = await envs.f.auth().signInWithEmailAndPassword(email, senha);
            const usuario = await envs.bd.model("Usuario").first("uid", usuarioFirebase.user.uid);
            return usuario.properties();
        } catch (e) {
            switch (e.code) {
                case "auth/user-not-found":
                    throw new Error("Email ou senha inválidos");
                default:
                    throw new Error("Erro ao fazer login");
            }
        }
    },

    async loginUsuarioCredenciais(_, { dados, credenciais }) {
        try {
            if (!dados) {
                return null;
            }
            const usuarioFirebase = await envs.f.auth().signInWithCredential(credenciais);
            dados.uid = usuarioFirebase.user.uid;
            const usuario = await envs.bd.model("Usuario").first("uid", dados.uid);
            return usuario.properties();
        } catch (e) {
            throw new Error("Erro ao fazer login");
        }
    }


};