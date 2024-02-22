import { prisma } from "../database/prisma-client.js";
import { CreateLoginWithUser, CreateLoginWithUserId, Login, LoginRepository } from "./interface.js";

class LoginRepositoryPrisma implements LoginRepository {
    async createLoginWithUserId(data: CreateLoginWithUserId): Promise<void> {
        await prisma.login.create({
            data: {
                email: data.email,
                name: data.name,
                password: data.password,
                userId: data.userId
            }
        })
    }

    async createLoginWithUser(data: CreateLoginWithUser): Promise<void> {
        await prisma.login.create({
            data: {
                email: data.email,
                name: data.name,
                password: data.password,
                user: {
                    create: {
                        email: data.email,
                        name: data.name
                    }
                } 
            }
        })
    }

    async findByEmail(email: string): Promise<Login | null> {
        return await prisma.login.findFirst({
            where: { email }
        })
    }

}

export { LoginRepositoryPrisma };