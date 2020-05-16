import { envs } from "../../configuracao/envs";

export const JogoResolver = {
    async jogo(_, { filtro }) {
        if (!filtro) {
            return null;
        }
        if (filtro.id) {
            const jogoEncontrado = await envs.bd.first("Jogo", "id", filtro.id);
            if (jogoEncontrado) {
                return jogoEncontrado.properties();
            } else {
                const { data } = await envs.bdJogos.fields(["name", "id", "cover.image_id"]).where(`id=${filtro.id}`).limit(1).request("/games");
                const jogoObj = {
                    id: data[0].id,
                    nome: data[0].name,
                    capa: data[0].cover ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${data[0].cover.image_id}.jpg` : null
                }
                await envs.bd.create("Jogo", { ...jogoObj });
                return jogoObj;
            }
        }
    },
    async buscaJogos(_, { filtro }) {
        if (!filtro) {
            return null;
        }
        if (filtro.busca) {
            const { data } = await envs.bdJogos.fields(["name", "id", "cover.image_id"]).offset(filtro.offset).limit(10).search(`${filtro.busca}`).request("/games");
            console.log(data);
            const jogosEncontrados = [];
            for (let jogo of data) {
                jogosEncontrados.push({
                    id: jogo.id,
                    nome: jogo.name,
                    capa: jogo.cover ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${jogo.cover.image_id}.jpg` : null
                })
            }
            return jogosEncontrados;
        }
    }


}