import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Geist, Geist_Mono } from 'next/font/google';

import authConfig from '@/auth/auth.config';
import SessionWrapper from '@/components/session-wrapper';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'HealthTech',
	description: 'HealthTech Chatbot',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession(authConfig);

	return (
		<SessionWrapper session={session}>
			<html lang='en'>
				<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
					<main>{children}</main>
					<Toaster toastOptions={{ style: { border: 'none', backgroundColor: 'var(--secondary)' } }} />
				</body>
			</html>
		</SessionWrapper>
	);
}
