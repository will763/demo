import { Configuration, ConfidentialClientApplication } from "@azure/msal-node";
import dotenv from 'dotenv'
dotenv.config()

const config: Configuration = {
  auth: {
    clientId: `${process.env.AZURE_CLIENT_ID}`,
    authority: `${process.env.CLOUD_INSTANCE}${process.env.AZURE_TENANT_ID}/.well-known/openid-configuration`,
    clientSecret: `${process.env.AZURE_CLIENT_SECRET}`
  },
};

export const pca = new ConfidentialClientApplication(config)