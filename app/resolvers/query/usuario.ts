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

    async loginUsuarioEmailSenha(_, { dados },context) {
        try {
            if (!dados.email || !dados.senha) {
                return null;
            }
            const usuarioFirebase = await envs.firebase.auth().signInWithEmailAndPassword(dados.email, dados.senha);
            const usuario = await envs.neo4j_bd.model("Usuario").first("uid", usuarioFirebase.user.uid);
            if(!usuario){
                const usuarioNovoObj = {
                    uid:usuarioFirebase.user.uid,
                    email:usuarioFirebase.user.email,
                    nome:usuarioFirebase.user.email.split("@")[0],
                    nickname:usuarioFirebase.user.email.split("@")[0]
                } 
               
                const usuarioNovo = await envs.neo4j_bd.model("Usuario").create({...usuarioNovoObj,ativo:1});
                return usuarioNovo.properties()+await usuarioFirebase.user.getIdToken();
            }
            const usuarioEncontrado={
                uid:usuario.get('uid'),
                nome:usuario.get('nome'),
                email:usuario.get('email'),
                nickname:usuario.get('nickname'),
                token:await usuarioFirebase.user.getIdToken()
            };
            return usuarioEncontrado;
        } catch (e) {
            console.log(e)
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
            const usuarioFirebase = await envs.firebase.auth().signInWithCredential(credenciais);
            dados.uid = usuarioFirebase.user.uid;
            const usuario = await envs.neo4j_bd.model("Usuario").first("uid", dados.uid);
            return usuario.properties();
        } catch (e) {
            throw new Error("Erro ao fazer login");
        }
    }


};