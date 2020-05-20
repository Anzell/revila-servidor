import Neode from "neode";
import igbd from "igdb-api-node";
import * as firebaseAuth from "firebase";

const firebase = firebaseAuth.initializeApp(JSON.parse(process.env.FIREBASE_CONFIG));
const neo4j = Neode.fromEnv()
const jogos_igbd = new igbd(process.env.IGBD_KEY)

export const envs = {
    servidor: { port: process.env.port || 3000 },
    neo4j_bd: neo4j.withDirectory(__dirname + "/modelos-neo4j"),
    igbd_jogos:jogos_igbd,
    firebase
}