import { FastifySchema, FastifySchemaCompiler } from "fastify"
import Joi from "joi"

export const validatorCompiler: FastifySchemaCompiler<FastifySchema> = ({ schema, method, url, httpPart }) => {
    // @ts-ignore
    return data => schema.validate(data)
}