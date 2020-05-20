import { envs } from "../configuracao/envs"

module.exports = {
    nome: {
        required: true,
        type: "string"
    },
    uid: {
        type: "string",
        required: true,
        primary: true,
        unique: 'true'
    },
    email: {
        email: true,
        type: "string",
        required: true,
        unique: 'true'
    },
    nickname: {
        required: true,
        unique: 'true',
        type: "string"
    },
    ativo: {
        type: "boolean",
        required: true
    }
};