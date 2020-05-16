import { envs } from "../../configuracao/envs";

export const JogoResolver = {
    async buscaJogo(_, { filtro }) {
        if (!filtro) {
            return null;
        }
        if (filtro.id) {
            const jogoEncontrado = await envs.bd.first("Jogo", "id", filtro.id);
            if (jogoEncontrado) {
                return jogoEncontrado.properties();
            } else {
                const { data } = await envs.bdJogos.fields(["name", "id", "cover.url"]).where(`id=${filtro.id}`).limit(1).request("/games");
                const jogoObj = {
                    id: data[0].id,
                    nome: data[0].name,
                    capa: `https:${data[0].cover.url}`
                }
                await envs.bd.create("Jogo", { ...jogoObj });
                return jogoObj;
            }
        }
    }

}