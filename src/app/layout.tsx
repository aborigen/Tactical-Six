
import type {Metadata} from 'next';
import Script from 'next/script';
import './globals.css';
import { CURRENT_PLATFORM, PLATFORM_DETAILS } from '@/lib/platform-config';

export const metadata: Metadata = {
  title: 'Tactical Six | 6x6 Advanced Chess',
  description: 'A sophisticated 6x6 strategic chess arena with AI-powered tactical suggestions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const platformScript = PLATFORM_DETAILS[CURRENT_PLATFORM].script;

  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('tactical_six_theme') || 'dark';
                  document.documentElement.classList.remove('light', 'brown');
                  if (theme !== 'dark') {
                    document.documentElement.classList.add(theme);
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body className="antialiased bg-background text-foreground min-h-screen font-sans">
        {platformScript && (
          <Script 
            src={platformScript} 
            strategy="beforeInteractive"
          />
        )}
        {children}
      </body>
    </html>
  );
}
