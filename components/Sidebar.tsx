'use client';
import { sidebarLinks } from '@/contstants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
	const pathname = usePathname();

	console.log('sidebarLinks: ', sidebarLinks);
	return (
		<section
			className='sticky left-0 top-0 h-screen flex  w-fit flex-col justify-between
    bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'
		>
			<div className='flex flex-1 flex-col gap-6'>
				{sidebarLinks.map((link) => {
					const isActive =
						pathname === link.route || pathname.startsWith(`${link.route}/`);
					console.log('link: ', link);
					return (
						<Link
							key={link.label}
							href={link.route}
							className={cn(
								'flex gap-4 items-center p-4 rounded-lg justify-start',
								{
									'bg-blue-1': isActive,
								}
							)}
						>
							<Image
								src={link.imgUrl}
								alt={link.label}
								height={24}
								width={24}
							/>
							<p className='text-lg font-semibold max-lg:hidden'>
								{link.label}
							</p>
						</Link>
					);
				})}
			</div>
			<div></div>
		</section>
	);
};

export default Sidebar;