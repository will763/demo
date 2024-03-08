import { RouteShorthandOptions } from "fastify";
import Joi from "joi";

export const updateUserValidation: RouteShorthandOptions = {
    schema: {
        params: Joi.object().keys({
            id: Joi.number().min(1).required().messages({
                'number.base': 'O parametro id deve ser um número.',
                'number.min': 'O valor mínimo do parametro id é 1',
                'any.required': 'O parametro id é obrigatório.'
            }),
        }),
        body: Joi.object().keys({
            email: Joi.string().email().required().messages({
                'string.email': 'O campo de email deve ser um endereço de e-mail válido.',
                'any.required': 'O campo de email é obrigatório.'
            }),
            password: Joi.string().min(12).max(32).required().messages({
                'string.base': 'password deve ser uma string',
                'string.min': 'password deve ter no mínimo {#limit} caracteres.',
                'string.max': 'password deve ter no máximo {#limit} caracteres.',
                'any.required': 'O campo de password é obrigatório.'
            }),
            name: Joi.string().min(3).max(26).required().messages({
                'string.base': 'O name deve ser uma string',
                'string.min': 'O name deve ter no mínimo {#limit} caracteres.',
                'string.max': 'O name deve ter no máximo {#limit} caracteres.',
                'any.required': 'O campo de name é obrigatório.'
            })
        })
    }
}