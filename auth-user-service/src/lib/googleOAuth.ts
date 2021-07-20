import { OAuth2Client } from "google-auth-library";

const { GOOGLE_OAUTH_CLIENT_ID } = process.env;

if (!GOOGLE_OAUTH_CLIENT_ID) {
  throw Error("Error: GOOGLE_OAUTH_CLIENT_ID does not exist");
}

const client = new OAuth2Client(GOOGLE_OAUTH_CLIENT_ID);

export async function verifyGoogleUser(idToken: string): Promise<string | null> {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_OAUTH_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (payload) {
      const userId = payload["sub"];
      return userId;
    }
    return null;
  } catch (err) {
    throw err;
  }
}
