import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      scope: 'user-read-recently-played user-top-read user-read-playback-position user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-modify-public playlist-modify-private user-library-read user-library-modify'
    }),
  ],
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      // Add access_token to the token right after signin
      console.log("This is Token: ", token)
      if (account?.accessToken) {
        token.accessToken = account.accessToken
      }
      return token
    },
    async session(session, token) {
      // Add property to session, like an access_token from a provider.
      console.log("session: ", session)
      console.log("token: ", token)
      session.accessToken = token.accessToken;
      return session
    }
  }
});