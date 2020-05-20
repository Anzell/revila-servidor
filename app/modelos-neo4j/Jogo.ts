module.exports = {
    id: {
        primary: true,
        unique: 'true',
        type: 'int',
        required: true
    },
    nome: {
        type: 'string',
        required: true
    },
    capa: {
        type: 'string'
    }
}