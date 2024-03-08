import { RouteShorthandOptions } from "fastify";
import Joi from "joi";

export const signinValidation: RouteShorthandOptions = {
  schema: {
    body: Joi.object().keys({
      email: Joi.string().email().required().messages({
        'string.email': 'O campo de email deve ser um endereço de e-mail válido.',
        'any.required': 'O campo de email é obrigatório.'
      }),
      password: Joi.string().min(12).max(32).required().messages({
        'string.base': 'A senha deve ser uma string',
        'string.min': 'A senha deve ter no mínimo {#limit} caracteres.',
        'string.max': 'A senha deve ter no máximo {#limit} caracteres.',
        'any.required': 'O campo de senha é obrigatório.'
      })
    })
  },
}