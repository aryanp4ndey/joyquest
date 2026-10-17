import { Onest } from 'next/font/google';
import '../index.css';

const onest = Onest({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-onest',
  display: 'swap',
});

export const metadata = {
  title: 'JoyQuest AI — Intentional Wellbeing & Mindful Pauses',
  description:
    'JoyQuest AI is an interactive wellbeing application that transforms small positive actions into personalized, rewarding experiences. Designed with Apple, Arc, and Teenage Engineering precision.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${onest.variable} dark`}>
      <body className="antialiased bg-[var(--mood-canvas-bg,#0a0b10)] text-[#f4f4f5] font-sans selection:bg-[#ff70b8]/30">
        {children}
      </body>
    </html>
  );
}
