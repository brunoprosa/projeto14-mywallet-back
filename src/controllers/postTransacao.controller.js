import { transacaoSchema } from "../schemas/novaTransacao.schema.js";
import { db } from "../app.js";
import dayjs from "dayjs"

export async function postTransacao(req, res){
    
    const { valor, descricao } = req.body
    const tipo = req.params.tipo
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')
    const dia = dayjs().format('DD-MM')

    if(!token) return res.sendStatus(401)

    const validation = transacaoSchema.validate(req.body, { abortEarly: false })
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try{

        const session = await db.collection("sessions").findOne({ token });
	    if (!session) return res.sendStatus(401);

		const transacao = { 
            id_user: session.id_user, 
            tipo, 
            valor, 
            descricao,
            dia
        }
        
        await db.collection('transacoes').insertOne( transacao )
        return res.sendStatus(200)

    } catch(err){
        return res.status(500).send(err.message);
    }

}