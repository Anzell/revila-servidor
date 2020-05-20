import { gql } from "apollo-server"


export default gql`
    
    type Usuario{
        uid:String!
        nome:String!
        email:String!
        token:String
        nickname:String!
    }

    input UsuarioInput{
        uid:String!
        nome:String!
        email:String!
        nickname:String!
    }

    input UsuarioFiltro{
        uid:String
        nickname:String
    }

    input UsuarioLogin{
        email:String!
        senha:String!
    }
`;
