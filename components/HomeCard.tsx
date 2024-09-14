import { cn } from '@/lib/utils';
import Image from 'next/image';

interface iProps {
	img: string;
	title: string;
	descripton: string;
	handleClick: () => void;
	className: string;
}
const HomeCard = ({
	img,
	title,
	descripton,
	handleClick,
	className,
}: iProps) => {
	return (
		<div
			className={cn(
				`px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer`,
				className
			)}
			onClick={handleClick}
		>
			<div className='flex-center size-12 glassmorphism rounded-[10px]'>
				<Image src={img} alt='add-meeting' height={27} width={27} />
			</div>
			<div className='flex flex-col gap-2'>
				<h1 className='text-2xl font-bold'>{title}</h1>
				<p className='text-lg font-normal'>{descripton}</p>
			</div>
		</div>
	);
};

export default HomeCard;
