import { prisma } from "../database/prisma-client.js";
import { User, UserCreate, UserRepository, UserUpdate } from "./interface.js";

class UserRepositoryPrisma implements UserRepository {
    async create(data: UserCreate): Promise<void> {
        await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
            }
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        return await prisma.user.findFirst({
            where: { email }
        })
    }

    async getAll(): Promise<User[]> {
        const results = await prisma.login.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        const filteredResults = results
            .filter((user:User) => user.name !== null)
            .map(user => ({
                id: user.id,
                email: user.email,
                name: user.name,
            }));

        return filteredResults;
    }


    async update(email: string, data: UserUpdate): Promise<User> {
        return await prisma.user.update({
            where: { email },
            data: {
                email: data.email,
                name: data.name
            },
        })
    }

    async delete(email: string): Promise<User> {
        return await prisma.user.delete({
            where: { email },
        });
    }
}

export { UserRepositoryPrisma };