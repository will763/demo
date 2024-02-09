export const validEmail = (email:string) => {
   const validDomain = ['sysmap.com.br']
   const domain = email.split('@')[1];

   if(!validDomain.includes(domain)){
    throw new Error("Domínio não permitido");
   }

}