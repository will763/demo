import { LoginRepository } from "../login/interface";
import { LoginRepositoryPrisma } from "../login/repository";
import { LoginUseCase } from "../login/usecase";
import { signin, signup } from "./interface";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class AuthUseCase {
  private readonly loginUseCase: LoginUseCase;
  private readonly loginRepository: LoginRepository;
    
  constructor() {
    this.loginUseCase = new LoginUseCase();
    this.loginRepository = new LoginRepositoryPrisma();
  }
  
  async signin({ email, password }: signin) {
    const login = await this.loginRepository.findByEmail(email)
   
    if (!login) {
      throw new Error("Credenciais inválidas!")
    }

    if(!await bcrypt.compare(password,login.password)){
      throw new Error("Credenciais inválidas!")
    }

    const token = jwt.sign({id:login.id},process.env.JWT_SECRET as string,{
      expiresIn: '8h',
      algorithm:"HS256",
    });

    return 'Bearer ' + token;

  }

  async signup({ email, password, name }: signup) {
    const login = await this.loginRepository.findByEmail(email)
   
    if (login) {
      throw new Error("Email ou nome inválido")
    }

    const hashedPassword = await bcrypt.hash(password,12)

    this.loginUseCase.create({
      email,
      name,
      password:hashedPassword
    })

  }

}
  
  export { AuthUseCase };