import { UserRepository, UserUpdate } from "./interface.js";
import { UserRepositoryPrisma } from "./repository.js";

class UserUseCase {
  private UserRepository: UserRepository;

  constructor() {
    this.UserRepository = new UserRepositoryPrisma();
  }

  async get(): Promise<Array<{ name: string; email: string }>> {
    const userList = await this.UserRepository.getAll();
    return userList.map(user => ({ name: user.name, email: user.email }));
  }

  async update(id: number, data: UserUpdate): Promise<void> {
    await this.verifyExistingUserByEmail(data.email);
    await this.UserRepository.update(id, {
      email: data.email,
      name: data.name,
      password: data.password
    });
  }

  async findByEmail(email: string) {
    return await this.UserRepository.findByEmail(email)
  }

  async delete(id: number): Promise<void> {
    await this.verifyExistingUserById(id);
    await this.UserRepository.delete(id);
  }

  async verifyExistingUserById(id: number) {
    const existingUser = await this.UserRepository.findById(id);

    if (!existingUser) {
      throw new Error("Não foi possível deletar usuário");
    }
  }

  async verifyExistingUserByEmail(email: string) {
    const existingUser = await this.UserRepository.findByEmail(email);

    if (!existingUser) {
      throw new Error("Não foi possível concluir a operação");
    }
  }

}

export { UserUseCase };