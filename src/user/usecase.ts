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

  async update(email: string, data: UserUpdate): Promise<void> {
    await this.verifyExistingUser(email);
    await this.UserRepository.update(email, {
      email: data.email,
      name: data.name,
    });
  }

  async findByEmail(email: string) {
    return await this.UserRepository.findByEmail(email)
  }

  async delete(email: string): Promise<void> {
    await this.verifyExistingUser(email);
    await this.UserRepository.delete(email);
  }

  async verifyExistingUser(email: string) {
    const existingUser = await this.UserRepository.findByEmail(email);

    if (!existingUser) {
      throw new Error("Usuário não encontrado");
    }
  }

}

export { UserUseCase };