import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { GlobalProviders } from '~/providers/global';
import { Oxanium, JetBrains_Mono } from 'next/font/google';
import { cn } from '~/lib/utils';
import { ThemeProvider } from '~/features/providers/components/theme-provider';
import { QueryProvider } from '~/features/providers/components/query-provider';

const jetbrainsMonoHeading = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-heading',
});

const oxanium = Oxanium({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'ShipFlow',
  description: 'Media Forwarding',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'dark',
        'font-sans',
        oxanium.variable,
        jetbrainsMonoHeading.variable
      )}
      suppressHydrationWarning
    >
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <GlobalProviders>{children}</GlobalProviders>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
