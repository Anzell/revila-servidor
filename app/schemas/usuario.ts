import { gql } from "apollo-server"


export default gql`
    type Usuario{
        id_firebase:String!
        nome:String!
        email:String!
        nickname:String!
    }

    input UsuarioInput{
        id_firebase:String!
        nome:String!
        email:String!
        nickname:String!
    }

    input UsuarioFiltro{
        id_firebase:String
        nickname:String
    }
`;

