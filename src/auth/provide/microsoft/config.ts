import { PublicClientApplication,LogLevel } from '@azure/msal-node';

const config = {
    auth: {
        clientId: `${process.env.CLIENT_ID}`,
        authority: `${process.env.AUTHORITY}`
    }
};

export const pca = new PublicClientApplication(config);