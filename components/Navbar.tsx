import Image from 'next/image';
import Link from 'next/link';
import MobileNav from './MobileNav';

const Navbar = () => {
	return (
		<nav className='fixed z-50  flex-between bg-dark-1 w-full px-6 py-4 lg:px-10'>
			<Link href={'/'} className='flex items-center gap-1'>
				<Image
					src={'/icons/logo.svg'}
					width={32}
					height={32}
					alt='logo'
					className='max-sm:size-10'
				/>
				<p className='text-white text-[26px] font-extrabold max-sm:hidden'>
					Yoom
				</p>
			</Link>
			<div className='flex-between'>
				<MobileNav />
			</div>
		</nav>
	);
};

export default Navbar;
