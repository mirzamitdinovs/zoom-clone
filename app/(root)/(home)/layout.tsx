import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Yoom',
	description: 'Video calling app ',
	icons: {
		icon: '/icons/logo.svg',
	},
};
export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className='relative'>
			<Navbar />
			<div className='flex'>
				<Sidebar />
				<section className='min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'>
					<div className='w-full'>{children}</div>
				</section>
			</div>
		</main>
	);
}
