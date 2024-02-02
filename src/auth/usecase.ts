import { UserRepository } from "../user/interface";
import { UserRepositoryPrisma } from "../user/repository";
import { signin, signup } from "./interface";

class AuthUseCase {

    async signin({ email, password }: signin) {
    }

    async signup({ email, password, name }: signup) {
    }

  }
  
  export { AuthUseCase };