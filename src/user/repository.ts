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

        return "";
    }
    
    
    async findByEmail(email: string): Promise<User | null> {
        const result = await prisma.user.findFirst({
            where:{email}
        }) as User  

        return result
    }
    

    async get(): Promise<User[]> {
        const results = await prisma.user.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
          },
        });
      
        const filteredResults = results
          .filter(user => user.name !== null)
          .map(user => ({
            id: user.id,
            email: user.email,
            name: user.name as string,
            password: user.password as string,
          }));
      
        return filteredResults;
      }
      
     
    async update(email: string, data: UserUpdate): Promise<User> {
        const result = await prisma.user.update({
        where: { email },
        data: {
            password: data.password,
        },
        }) as User
    
        return result;
    }

    async delete(email: string): Promise<User> {
        const result = await prisma.user.delete({
            where: { email },
        });
    
        return result as User;
    }
}

export { UserRepositoryPrisma };