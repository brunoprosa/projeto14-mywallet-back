import { db } from "../app.js";

export async function deleteSession(req, res){

    const {token} = req.body
    console.log(token)

    try{
        await db.collection('sessions').deleteOne({ token })
        res.status(200).send('logout concluido')
    } catch(err){
        return res.status(500).send(err.message);
    }
    
}