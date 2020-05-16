import { gql } from "apollo-server";

export default gql`
    type Query{
        usuario(filtro:UsuarioFiltro!):Usuario
        buscaJogo(filtro:JogoFiltro!):Jogo
    }
`;