import { User, UserCreate, UserRepository } from "./interface";

class UserRepositoryPrisma implements UserRepository{
    create(data: UserCreate): Promise<User> {
        throw new Error("Method not implemented.");
    }
}

export { UserRepositoryPrisma };