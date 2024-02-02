import { UserCreate, UserRepository } from "./interface";
import { UserRepositoryPrisma } from "./repository";

class UserUseCase {
    private userRepository: UserRepository;
    constructor() {
      this.userRepository = new UserRepositoryPrisma();
    }
  
    async create({ name, email, password }: UserCreate) {
    }

  }
  
  export { UserUseCase };