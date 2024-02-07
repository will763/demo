import { prisma } from "../database/prisma-client";
import { Login, LoginCreate, LoginRepository, LoginUpdate } from "./interface";


class LoginRepositoryPrisma implements LoginRepository{
    
    async create(data: LoginCreate): Promise<String> {
        const result = await prisma.login.create({
            data: {
                email: data.email,
                name: data.name,
                password: data.password
            }
        })

        return "";
    }
    
    
    async findByEmail(email: string): Promise<Login | null> {
        const result = await prisma.login.findFirst({
            where:{email}
        }) as Login  

        return result
    }
    

    async get(): Promise<Login[]> {
        const results = await prisma.login.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
          },
        });
      
        const filteredResults = results
          .filter(login => login.name !== null)
          .map(login => ({
            id: login.id,
            email: login.email,
            name: login.name as string,
            password: login.password as string,
          }));
      
        return filteredResults;
      }
      
     
    async update(email: string, data: LoginUpdate): Promise<Login> {
        const result = await prisma.login.update({
        where: { email },
        data: {
            password: data.password,
        },
        }) as Login
    
        return result;
    }

    async delete(email: string): Promise<Login> {
        const result = await prisma.login.delete({
            where: { email },
        });
    
        return result as Login;
    }
}

export { LoginRepositoryPrisma };