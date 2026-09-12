import "./globals.css";

export const metadata = {
  title: "CineAI — AI Video Generator",
  description: "Create AI videos from text."
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}