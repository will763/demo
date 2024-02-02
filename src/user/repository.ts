import { prisma } from "../database/prisma-client";
import { User, UserCreate, UserRepository, UserUpdate } from "./interface";

class UserRepositoryPrisma implements UserRepository{
    
    async create(data: UserCreate): Promise<String> {
        const result = await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: data.password
            }

        })

        return "result";
    }
    
    
    async findByEmail(email: string): Promise<User | null> {
        const result = await prisma.user.findFirst({
            where:{email}
        }) as User  

        return result
    }


    get(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: UserUpdate): Promise<User> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
}

export { UserRepositoryPrisma };