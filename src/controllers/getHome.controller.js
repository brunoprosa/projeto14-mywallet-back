import { db } from "../app.js";

export async function getHome(req, res){
    
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')

    if(!token) return res.sendStatus(401)

    try{

        const session = await db.collection("sessions").findOne({ token });
	    if (!session) return res.sendStatus(401);

        const user = await db.collection("users").findOne({ id_user: session.id_user })
        const nome = user.nome
        const transacoes = await db.collection('transacoes').find({ id_user: session.id_user }).toArray()
        return res.status(200).send({nome, transacoes})

    } catch(err){
        return res.status(500).send(err.message);
    }
}