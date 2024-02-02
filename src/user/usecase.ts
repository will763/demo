import { UserCreate, UserRepository, UserUpdate } from "./interface";
import { UserRepositoryPrisma } from "./repository";

class UserUseCase {
    private userRepository: UserRepository;
    constructor() {
      this.userRepository = new UserRepositoryPrisma();
    }
  
    async findAll() {
    }

    async create(data:UserCreate) {
    }

    async update(id:string, data: UserUpdate) {
    }

    async delete(id:string) {
    }

  }
  
  export { UserUseCase };