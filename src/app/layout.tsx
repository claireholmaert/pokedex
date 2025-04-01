import type { Metadata } from "next";
import "@/styles/globals.css";


export const metadata: Metadata = {
  title: "Pokedex",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <link rel="shortcut icon" href="/svg/pokeball.svg" type="image/x-icon" />
      <body
      >
        {children}
      </body>
    </html>
  );
}
