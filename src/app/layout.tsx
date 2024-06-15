import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { Inter } from "next/font/google";
import Header from "~/components/header/header";
import RegisterModal from "~/components/modals/register-modal";
import ClientOnly from "~/components/client-only";
import LoginModal from "~/components/modals/login-modal";
import { SessionProvider } from "next-auth/react";
import { auth } from "auth";
import RecipeModal from "~/components/modals/recipe-modal";
import IngredientsModal from "~/components/modals/ingredients-modal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "CookItUp",
  description: "CookItUp is a recipe sharing platform.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`font-sans ${inter.variable}`}>
          <ClientOnly>
            <Header />
            <RegisterModal />
            <LoginModal />
            <IngredientsModal />
            <RecipeModal />
            {children}
          </ClientOnly>
        </body>
      </html>
    </SessionProvider>
  );
}
