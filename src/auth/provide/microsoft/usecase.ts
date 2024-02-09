import { validEmail } from "../../../utils/validation";
import jwt from "jsonwebtoken"
import { pca } from "./config";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../database/prisma-client";

class MicrosoftAuthUseCase {
   async getCode(){
     
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: "http://localhost:3001/api/v1/auth/microsoft/redirect",
     };
    
     const response = await pca.getAuthCodeUrl(authCodeUrlParameters);
     return response;
   }

   async register(code:string){
     const tokenRequest = {
       code,
       scopes: ["user.read"],
       redirectUri: "http://localhost:3001/api/v1/auth/microsoft/redirect",
       tokenBodyParameters: {
        client_secret: `${process.env.CLIENT_SECRET}`
       }
     };

     const response = await pca.acquireTokenByCode(tokenRequest);
     validEmail(response!.account!.username);

     const user = await prisma.microsoft_Login.findUnique({
        where:{ email : response!.account!.username}
     })

     if(!user){
        const microsoftCredentials = await prisma.microsoft_Login.create({
            data:{
                name:response!.account!.name,
                email:response!.account!.username
            }
        })

        const token = this.generateToken(microsoftCredentials.id,microsoftCredentials.email)
        return 'Bearer ' + token;
     }

     const token = this.generateToken(user.id,user.email)
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