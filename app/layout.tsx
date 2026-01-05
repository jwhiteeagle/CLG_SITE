import type { Metadata } from 'next';
import { Geist, Geist_Mono, Orbitron } from 'next/font/google';
import { ThemeProvider } from '@/components/app/theme-provider';
import './styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  weight: ['700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Chief Live Gaming',
  description: 'Commission miniature painting & hobby services',
  metadataBase: new URL('https://www.chieflivegaming.com'),
  openGraph: {
    title: 'Chief Live Gaming',
    description: 'Commission miniature painting & hobby services',
    url: 'https://www.chieflivegaming.com',
    siteName: 'Chief Live Gaming',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
