import { OAuth2Client } from 'google-auth-library';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { env } from './env.js';
const googleAuthSettingsPath = path.resolve('google-oauth.json');
const googleAuthSettings = JSON.parse(await readFile(googleAuthSettingsPath));
const clientId = env('GOOGLE_AUTH_CLIENT_ID');
const clientSecret = env('GOOGLE_AUTH_CLIENT_SECRET');
// console.log(googleAuthSettings);

const googleOauthClient = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri: googleAuthSettings.web.redirect_uris[0],
});

export const generateAuthUrl = () => {
  googleOauthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
};
