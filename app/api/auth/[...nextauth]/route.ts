import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Just return the baseUrl ("/") so the client can handle the redirect
      if (url.startsWith(baseUrl)) {
        return baseUrl;
      }
      return url;
    },
  },
  pages: {
    signIn: '/',
  },
});

export { handler as GET, handler as POST };

