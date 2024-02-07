import { LoginCreate, LoginRepository, LoginUpdate} from "./interface";
import { LoginRepositoryPrisma } from "./repository";
import bcrypt from "bcrypt"

class LoginUseCase {
    private loginRepository: LoginRepository;
    
    constructor() {
      this.loginRepository = new LoginRepositoryPrisma();
    }
  
    async create(data: LoginCreate) {
      await this.loginRepository.create(data)
    }

    async get(): Promise<Array<{ name: string; email: string }>> {

      const loginList = await this.loginRepository.get();
    
      const simplifiedResults = loginList.map(login => ({ name: login.name, email: login.email }));
    
      return simplifiedResults;
    } 

    async updatePassword(email: string, newPassword: string): Promise<void> {

      const existingLogin = await this.loginRepository.findByEmail(email);
      if (!existingLogin) {
        throw new Error("Usuário não encontrado");
      }

      const hashedPassword = await bcrypt.hash(newPassword,12)

      await this.loginRepository.update(email, {
        email: existingLogin.email,
        name: existingLogin.name,
        password: hashedPassword,
      });
    }

    async findByEmail(email:string) {
      return await this.loginRepository.findByEmail(email)
    }

    async delete(email: string): Promise<void> {
      
      const existingLogin = await this.loginRepository.findByEmail(email);
    
      if (!existingLogin) {
        throw new Error("Usuário não encontrado");
      }
    
      await this.loginRepository.delete(email);
    }
    
}

export { LoginUseCase };