import { gql } from "apollo-server";

export default gql`
    type Mutation{
        criarUsuario(dados:UsuarioInput!):Usuario
    }
`;