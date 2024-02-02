import { UserCreate, UserRepository, UserUpdate } from "./interface";
import { UserRepositoryPrisma } from "./repository";


class UserUseCase {
    private userRepository: UserRepository;
    constructor() {
      this.userRepository = new UserRepositoryPrisma();
    }
  
    async create(data: UserCreate) {
      const verifyUserExists = await this.userRepository.findByEmail(data.email)
      if (verifyUserExists) {
        throw new Error("User ja existe")
      }
      
      await this.userRepository.create(data)

    }
  


    async findAll() {
    }

    async update(id:string, data: UserUpdate) {
    }

    async delete(id:string) {
    }

  }
  
  export { UserUseCase };