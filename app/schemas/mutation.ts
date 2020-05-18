import { gql } from "apollo-server";

export default gql`
    scalar Map

    type Mutation{
        cadastraUsuarioEmailSenha(dados:UsuarioInput!,senha:String!):Usuario
    }
`;