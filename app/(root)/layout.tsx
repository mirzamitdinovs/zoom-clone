import StreamVideoProvider from '@/providers/StreamClientProvider';
import React, { ReactNode } from 'react';

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<main>
			<StreamVideoProvider>{children}</StreamVideoProvider>
		</main>
	);
}
