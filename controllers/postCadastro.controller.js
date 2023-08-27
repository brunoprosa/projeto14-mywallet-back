import { db } from "../src/app.js";
import { cadastroSchema } from "../schemas/cadastro.schema.js";
import bcrypt from 'bcrypt';

export async function postCadastro(req, res){

    const {nome, email, senha} = req.body
    
    const validation = cadastroSchema.validate(req.body, { abortEarly: false })
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    let id

    try{

        const exist = await db.colletion('users').find({ email })
        if(exist) return res.status(409).send('E-mail já cadastrado')

        await db.colletion('users').count({}, (error, size) => id = size)

        const hash = bcrypt.hashSync(senha, 10)
        const user = { id_user, nome, email, hash }

        await db.colletion('users').insertOne( user )
        res.sendStatus(201);

    } catch(err){
        return res.status(500).send(err.message);
    }
}