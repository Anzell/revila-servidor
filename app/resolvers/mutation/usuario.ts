import { envs } from "../../configuracao/envs";

export const UsuarioMutation = {
    async cadastraUsuarioEmailSenha(_, { dados, senha }) {
        try {
            if (!dados) {
                return null;
            }
            const usuarioFirebase = await envs.firebase.auth().createUserWithEmailAndPassword(dados.email, senha);
            dados.uid = usuarioFirebase.user.uid;
            const usuario = await envs.neo4j_bd.create("Usuario", { ...dados, ativo: 1 });
            return usuario.properties();
        } catch (e) {
            throw new Error("Erro ao criar usuario");
        }
    }
}