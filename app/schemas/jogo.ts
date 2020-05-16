import { gql } from "apollo-server";

export default gql`
    type Jogo{
        id:Int!
        nome:String
        capa:String
    }

    input JogoFiltro{
        id:Int
        busca:String
        offset:Int
    }
`;