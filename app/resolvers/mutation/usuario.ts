import { envs } from "../../configuracao/envs";

export const UsuarioMutation = {
    async criarUsuario(_, { dados }) {
        try {
            const usuario = await envs.bd.create("Usuario", { ...dados, ativo: 1 });
            return usuario.properties();
        } catch (e) {
            throw new Error("Erro ao criar usuario");
        }

    }
}