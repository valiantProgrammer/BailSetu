const NextAuth = require("next-auth").default;
const Google = require("next-auth/providers/google").default;
const GitHub = require("next-auth/providers/github").default;
const Credentials = require("next-auth/providers/credentials").default;
import connectDB from "../../login/mongoose.js";
import Login from "../../../model/schema.js";

const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      httpOptions: {
        timeout: 40000,
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      httpOptions: {
        timeout: 40000,
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          await connectDB();
          const user = await Login.findOne({ emailAddress: credentials.email });

          if (!user) {
            throw new Error("User not found");
          }

          if (user.password !== credentials.password) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            name: user.username,
            email: user.emailAddress,
            image: null,
            provider: "credentials",
            userId: user.userId,
            address: user.address,
            pinNumber: user.pinNumber,
            phoneNumber: user.phoneNumber,
          };
        } catch (error) {
          console.error("Credentials authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, profile }) {
      // Handle OAuth providers (Google, GitHub)
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          await connectDB();
          
          // Check if user exists in database
          let dbUser = await Login.findOne({ emailAddress: user.email });

          if (!dbUser) {
            // Create new user for OAuth
            const username = (user.name || user.email)
              .toLowerCase()
              .trim()
              .replace(/\s+/g, "_");
            
            dbUser = await Login.create({
              emailAddress: user.email,
              username: username,
              anonymousUser: user.name,
              password: `${account.provider}_oauth`,
            });
          }

          // Attach OAuth tokens and user data to JWT
          token.id_token = account.id_token;
          token.provider = account.provider;
          token.userId = dbUser.userId || dbUser._id.toString();
          token.username = dbUser.username;
          token.address = dbUser.address;
          token.pinNumber = dbUser.pinNumber;
          token.phoneNumber = dbUser.phoneNumber;
        } catch (error) {
          console.error("JWT callback error:", error);
        }
      }

      // Handle Credentials provider
      if (user && account?.provider === "credentials") {
        token.provider = "credentials";
        token.userId = user.userId;
        token.username = user.name;
        token.address = user.address;
        token.pinNumber = user.pinNumber;
        token.phoneNumber = user.phoneNumber;
      }

      return token;
    },

    async session({ session, token }) {
      // Attach token data to session
      if (session.user) {
        session.user.id = token.sub;
        session.user.id_token = token.id_token;
        session.user.provider = token.provider;
        session.user.userId = token.userId;
        session.user.username = token.username;
        session.user.address = token.address;
        session.user.pinNumber = token.pinNumber;
        session.user.phoneNumber = token.phoneNumber;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
