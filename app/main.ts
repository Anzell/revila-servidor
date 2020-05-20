require('dotenv').config()
import { Servidor } from "./servidor/servidor";
const servidor = new Servidor();

servidor.bootstrap().then(_=>{
    console.log("Servidor em execucao")
}).catch(e=>{
    throw new Error("Erro ao iniciar servidor: "+e);
});