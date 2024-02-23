import { IOIDCStrategyOptionWithRequest, IProfile, VerifyCallback } from "passport-azure-ad";
import dotenv from 'dotenv'
import { MicrosoftAuthUseCase } from "./usecase.js";
dotenv.config()

const idmetadata = `${process.env.CLOUD_INSTANCE}${process.env.AZURE_TENANT_ID}/.well-known/openid-configuration`;
const clientId = `${process.env.AZURE_CLIENT_ID}`;
const clientSecret = `${process.env.AZURE_CLIENT_SECRET}`;

export const azureADConfig: IOIDCStrategyOptionWithRequest = {
    identityMetadata: idmetadata,
    clientID: clientId,
    clientSecret: clientSecret,
    responseType: 'code id_token',
    responseMode: 'form_post',
    redirectUrl: `${process.env.REDIRECT_URI}`,
    allowHttpForRedirectUrl: true,
    isB2C: false,
    validateIssuer: false,
    passReqToCallback: true,
    useCookieInsteadOfSession: false,
    scope: '',
    loggingLevel: 'info',
};

export const callbackFunction = async (req: any, iss: String, sub: String, profile: IProfile, accessToken: any, refreshToken: string, done: VerifyCallback) => {
    const microsoftAuthUseCase = new MicrosoftAuthUseCase();
    const user = { name: '', email: '' };

    if (!profile.oid) {
        return done(new Error("No oid found"), null);
    }

    if (!profile.displayName) {
        return done(new Error("No displayName found"), null);
    }

    if (!profile.upn) {
        return done(new Error("No upn found"), null);
    }

    try {
        await microsoftAuthUseCase.registerUser(profile.upn, profile.displayName)
        user.name = profile.displayName;
        user.email = profile.upn;

        return done(null, user);
    } catch (error) {
        await req.logOut();
        req.session.delete();
        return done('Não fui possível registrar o usuário');
    }
};