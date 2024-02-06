import { UserRepository } from "../user/interface";
import { UserRepositoryPrisma } from "../user/repository";
import { UserUseCase } from "../user/usecase";
import { signin, signup } from "./interface";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class AuthUseCase {
  private readonly userUseCase: UserUseCase;
  private readonly userRepository: UserRepository;
    
  constructor() {
    this.userUseCase = new UserUseCase();
    this.userRepository = new UserRepositoryPrisma();
  }
  

  async signin({ email, password }: signin) {
    const user = await this.userRepository.findByEmail(email)
   
    if (!user) {
      throw new Error("Credenciais inválidas!")
    }

    if(!await bcrypt.compare(password,user.password)){
      throw new Error("Credenciais inválidas!")
    }

    return jwt.sign({id:user.id},process.env.JWT_SECRET as string,{
     // expiresIn: '8h',
      algorithm:"HS256",
    });

  }

  async signup({ email, password, name }: signup) {
    const user = await this.userRepository.findByEmail(email)
   
    if (user) {
      throw new Error("Email ou nome inválido")
    }

    const hashedPassword = await bcrypt.hash(password,12)

    this.userUseCase.create({
      email,
      name,
      password:hashedPassword
    })

  }

}
  
  export { AuthUseCase };