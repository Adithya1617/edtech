import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
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
      // Redirect to selection page after successful login
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/selection`;
      }
      return url;
    },
  },
  pages: {
    signIn: '/',
  },
});

export { handler as GET, handler as POST };

