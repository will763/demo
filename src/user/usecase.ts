import { UserCreate, UserRepository, UserUpdate } from "./interface";
import { UserRepositoryPrisma } from "./repository";
import bcrypt from "bcrypt"


class UserUseCase {
    private userRepository: UserRepository;
    constructor() {
      this.userRepository = new UserRepositoryPrisma();
    }
  
    async create(data: UserCreate) {
      await this.userRepository.create(data)
    }

    async findAll() {
    }

    async findByEmail(email:string) {
      return await this.userRepository.findByEmail(email)
    }

    async update(id:string, data: UserUpdate) {
    }

    async delete(id:string) {
    }

  }
  
  export { UserUseCase };