import { validEmail } from "../../../utils/validation";
import jwt from "jsonwebtoken"
import { pca } from "./config";
import { prisma } from "../../../database/prisma-client";

class MicrosoftAuthUseCase {
   async signin(username: string, password:string){

    validEmail(username);
     
    const authParameters = {
      scopes: ["user.read"],
      password,
      username,
     };
    
    const response = await pca.acquireTokenByUsernamePassword(authParameters);

    const user = await prisma.microsoft_Login.findUnique({
      where:{ email: username}
    })

    const microsoftCredentials = user || await prisma.microsoft_Login.create({
      data: {
        name: response?.account?.name,
        email: username
      }
    });
  
   const token = this.generateToken(microsoftCredentials.id, microsoftCredentials.email);
   return 'Bearer ' + token;
 
   }

   generateToken(id:number, email:string){
     return jwt.sign({id, email},`${process.env.JWT_SECRET}`,{
        expiresIn: '8h',
        algorithm:"HS256",
     });
   }

   
}

export { MicrosoftAuthUseCase }