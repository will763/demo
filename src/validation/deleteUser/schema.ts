import { RouteShorthandOptions } from "fastify";
import Joi from "joi";

export const deleteUserValidation: RouteShorthandOptions = {
    schema: {
        params: Joi.object().keys({
            id: Joi.number().min(1).required().messages({
                'number.base': 'O parametro id deve ser um número.',
                'number.min': 'O valor mínimo do parametro id é 1',
                'any.required': 'O parametro id é obrigatório.'
            }),
        })
    },
}