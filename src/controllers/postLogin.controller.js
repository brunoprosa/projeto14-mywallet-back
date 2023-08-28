import { loginSchema } from "../schemas/login.schema.js";
import { db } from "../app.js";
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

export async function postLogin(req, res){
    
    const { email, senha } = req.body

    const validation = loginSchema.validate(req.body, { abortEarly: false })
    if (validation.error) { 
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try{

        const user = await db.collection('users').findOne({ email })
        if(!user) return res.status(404).send('E-mail não cadastrado')

        if(bcrypt.compareSync(senha, user.hash)) {
            
            const token = uuid();
            
            await db.collection("sessions").insertOne( { id_user: user.id_user, token } )
            res.status(200).send(token);

        } else return res.status(401).send('Senha incorreta')

    } catch(err){
        return res.status(500).send(err.message);
    }
}