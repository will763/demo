import { User, UserCreate, UserRepository, UserUpdate } from "./interface";

class UserRepositoryPrisma implements UserRepository{
    findByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    get(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    create(data: UserCreate): Promise<User> {
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