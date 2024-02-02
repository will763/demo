import { UserRepository } from "../user/interface";
import { UserRepositoryPrisma } from "../user/repository";
import { Login } from "./interface";

class AuthUseCase {
    private userRepository: UserRepository;
    constructor() {
      this.userRepository = new UserRepositoryPrisma();
    }
  
    async login({ email, password }: Login) {
    }

  }
  
  export { AuthUseCase };