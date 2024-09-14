'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ReactNode } from 'react';
import { Button } from './ui/button';

interface iProps {
	isOpen: boolean;
	onClose: () => void;
	image?: string;
	title: string;
	className?: string;
	children?: ReactNode;
	buttonText?: string;
	buttonIcon?: string;
	handleClick: () => void;
}
const MeetingModal = ({
	isOpen,
	onClose,
	image,
	title,
	className = '',
	children,
	buttonText = 'Schedule Meeting',
	handleClick,
	buttonIcon,
}: iProps) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent
				className='flex w-full max-w-[520px] flex-col gap-6
        border-1 bg-dark-1 px-6 py-9 text-white
      '
			>
				<div className='flex flex-col gap-6'>
					{image && (
						<div className='flex justify-center'>
							<Image src={image} alt='image' width={72} height={72} />
						</div>
					)}
					<h1 className={cn('text-3xl font-bold leading-[42px]', className)}>
						{title}
					</h1>
					{children}

					<Button
						onClick={handleClick}
						className='bg-blue-1 space-x-2 focus-visible:ring-0 focus-visible:ring-offset-0'
					>
						{buttonIcon && (
							<Image src={buttonIcon} alt='image' width={13} height={13} />
						)}
						{buttonText}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default MeetingModal;
