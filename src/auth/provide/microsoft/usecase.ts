import { validEmail } from "../../../utils/validation.js";
import { prisma } from "../../../database/prisma-client.js";
import { pca } from "./config.js";
import crypto, { createHash } from "crypto";

class MicrosoftAuthUseCase {
  private _codeVerifier: string | undefined;
  private _redirect_url: string | undefined;
  
  async generateAuthUrl(redirect_url:string) {
    this._redirect_url = redirect_url;
    this._codeVerifier = crypto.randomBytes(32).toString("base64url");
    const codeChallenge = createHash('sha256').update(this._codeVerifier).digest('base64url');

    const authRequest = {
      scopes: ["user.read"],
      redirectUri: `${process.env.REDIRECT_URI}`,
      codeChallenge,
      codeChallengeMethod: "S256",
    };

    const loginUrl = await pca.getAuthCodeUrl(authRequest);

    return loginUrl;
  }

  async getUserdetails(code: string) {

    const tokenResponse = await pca.acquireTokenByCode({
      code,
      scopes: ["user.read"],
      redirectUri: `${process.env.REDIRECT_URI}`,
      codeVerifier: this._codeVerifier
    });

    if(tokenResponse.account?.username && tokenResponse.account.name && this._redirect_url ){
      return {
        redirect_url: this._redirect_url,
        user: JSON.stringify({
          name: tokenResponse.account.name,
          email: tokenResponse.account?.username
        })
      }
    }

    throw new Error('Informações sobre o usuário não foram encontradas');
  }

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