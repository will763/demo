import { LoginRepository } from "../login/interface";
import { LoginRepositoryPrisma } from "../login/repository";
import { LoginUseCase } from "../login/usecase";
import { signin, signup } from "./interface";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { validEmail } from "../utils/validation";

class AuthUseCase {
  private readonly loginUseCase: LoginUseCase;
  private readonly loginRepository: LoginRepository;
    
  constructor() {
    this.loginUseCase = new LoginUseCase();
    this.loginRepository = new LoginRepositoryPrisma();
  }
  
  async signin({ email, password }: signin) {
    
    validEmail(email);

    const user = await this.loginRepository.findByEmail(email)
   
    if (!user) {
      throw new Error("Credenciais inválidas!")
    }

    if(!await bcrypt.compare(password,user.password)){
      throw new Error("Credenciais inválidas!")
    }

    const token = jwt.sign({id:user.id,email:user.email},`${process.env.JWT_SECRET}`,{
      expiresIn: '8h',
      algorithm:"HS256",
    });

    return 'Bearer ' + token;

  }

  async signup({ email, password, name }: signup) {
    validEmail(email);

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