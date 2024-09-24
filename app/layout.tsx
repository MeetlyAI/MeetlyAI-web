import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { ConvexClientProvider } from "./ConvexClientProvider";
import "./globals.css";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Meetly | AI-Powered Meeting Transcriber and Organizer',
  description: 'Meetly is an AI-driven meeting assistant that transcribes, summarizes, and organizes your meetings. Get key points without rewatching, manage appointments, and use Kanban workspaces for efficient team collaboration.',
  keywords: ['AI meeting assistant', 'transcription', 'meeting summary', 'appointment management', 'Kanban', 'team collaboration'],
  authors: [{ name: 'Meetly Team' }],
  creator: 'Meetly',
  publisher: 'Meetly',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <ClerkProvider>

    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
                <ConvexClientProvider>{children}</ConvexClientProvider>
                    


      </body>
    </html>
    </ClerkProvider>
  );
}
