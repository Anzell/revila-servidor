import { ApolloServer, gql } from "apollo-server";
import { envs } from "../configuracao/envs";
import { typeDefs } from "../schemas/index";
import { resolvers } from "../resolvers/index";

export class Servidor {
    aplicacao: ApolloServer;

    iniciaServidor(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.aplicacao = new ApolloServer({
                    typeDefs,
                    resolvers
                });
                this.aplicacao.listen(envs.servidor.port, () => {
                    resolve(this.aplicacao);
                });

            } catch (e) {
                reject(e);
            }
        });
    }

    bootstrap(): Promise<Servidor> {
        return this.iniciaServidor().then(() => this);
    }
}