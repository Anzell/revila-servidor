import { gql } from "apollo-server";

export default gql`

    type Query{
        usuario(filtro:UsuarioFiltro!):Usuario
        jogo(filtro:JogoFiltro!):Jogo
        buscaJogos(filtro:JogoFiltro!):[Jogo]
        loginUsuarioEmailSenha(email:String!,senha:String!):Usuario
        loginUsuarioCredenciais(dados:UsuarioInput!,crendenciais:Map!):Usuario
    }
`;