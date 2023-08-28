import { db } from "../app.js";
import { cadastroSchema } from "../schemas/cadastro.schema.js";
import bcrypt from 'bcrypt';

export async function postCadastro(req, res){

    const {nome, email, senha} = req.body
    
    const validation = cadastroSchema.validate(req.body, { abortEarly: false })
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors)
    }

    let id_user

    try{

        const exist = await db.collection('users').find({ email }).toArray()
        if(exist.length === 1) return res.status(409).send('E-mail já cadastrado')

        await db.collection('users').count({}, (error, size) => id_user = size)

        const hash = bcrypt.hashSync(senha, 10)
        const user = { id_user, nome, email, hash }

        await db.collection('users').insertOne( user )
        res.sendStatus(201)

    } catch(err){
        console.log(err)
        return res.status(500).send(err.message)
    }
}