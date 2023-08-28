import joi from "joi";

export const transacaoSchema = joi.object({
    valor: joi.number().positive().precision(2).required(),
    descricao: joi.string().required()
})