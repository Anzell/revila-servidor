import { gql } from "apollo-server";

export default gql`
    type Query{
        usuario(filtro:UsuarioFiltro!):Usuario
        jogo(filtro:JogoFiltro!):Jogo
        buscaJogos(filtro:JogoFiltro!):[Jogo]
    }
`;