import { User, UserCreate, UserRepository, UserUpdate } from "./interface";
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

    async get(): Promise<Array<{ name: string; email: string }>> {

      const userList = await this.userRepository.get();
    
      const simplifiedResults = userList.map(user => ({ name: user.name, email: user.email }));
    
      return simplifiedResults;
    }
    

    async updatePassword(email: string, newPassword: string): Promise<void> {

      const existingUser = await this.userRepository.findByEmail(email);
      if (!existingUser) {
        throw new Error("User not found");
      }

      await this.userRepository.update(email, {
        email: existingUser.email,
        name: existingUser.name,
        password: newPassword,
      });
    }

    async delete(email: string): Promise<void> {
      
      const existingUser = await this.userRepository.findByEmail(email);
    
      if (!existingUser) {
        throw new Error("Usuário não encontrado");
      }
    
      await this.userRepository.delete(email);
    }
    
}

export { UserUseCase };