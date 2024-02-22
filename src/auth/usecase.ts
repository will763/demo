import { UserUseCase } from "../user/usecase.js";
import { signin, signup } from "./interface.js";
import bcrypt from "bcrypt"
import { validEmail } from "../utils/validation.js";
import { FastifyRequest } from "fastify";
import { fastifyPassport } from "../server.js";
import { LoginRepositoryPrisma } from "../login/repository.js";
import { LoginRepository } from "../login/interface.js";

class AuthUseCase {
  private readonly userUseCase: UserUseCase;
  private readonly loginRepository: LoginRepository;
    
  constructor() {
    this.userUseCase = new UserUseCase();
    this.loginRepository = new LoginRepositoryPrisma();
  }
  
  async signin({ email, password }: signin, req:FastifyRequest) {
    validEmail(email);

    const user = await this.loginRepository.findByEmail(email)
   
    if (!user) {
      throw new Error("Credenciais inválidas!")
    }

    if(!await bcrypt.compare(password,user.password)){
      throw new Error("Credenciais inválidas!")
    }

    await fastifyPassport.sessionManager.logIn(req,user);
  }

  async signup({ email, password, name }: signup) {
    validEmail(email);

    const user = await this.userUseCase.findByEmail(email);
    const hashedPassword = await bcrypt.hash(password, 12)

    if (user) {
      await this.loginRepository.createLoginWithUserId({
        email,
        name,
        password: hashedPassword,
        userId: user.id
      })
    } else {
      await this.loginRepository.createLoginWithUser({
        email,
        name,
        password: hashedPassword,
        user: {
          email,
          name
        }
      })
    }

  }

}
  
  export { AuthUseCase };