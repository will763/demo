import { UserRepository } from "../user/interface";
import { UserRepositoryPrisma } from "../user/repository";
import { signin, signup } from "./interface";

class AuthUseCase {
    private userRepository: UserRepository;
    constructor() {
      this.userRepository = new UserRepositoryPrisma();
    }
  
    async signin({ email, password }: signin) {
    }

    async signup({ email, password, name }: signup) {
    }

  }
  
  export { AuthUseCase };