import { validEmail } from "../../../utils/validation.js";
import { prisma } from "../../../database/prisma-client.js";

class MicrosoftAuthUseCase {
  async registerUser(email: string, name: string) {

    validEmail(email);

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      await prisma.user.create({
        data: {
          name,
          email
        }
      });
    }

  }

}

export { MicrosoftAuthUseCase }