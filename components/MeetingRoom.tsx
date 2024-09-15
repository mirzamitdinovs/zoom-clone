'use client';

import { cn } from '@/lib/utils';
import {
	CallControls,
	CallingState,
	CallParticipantsList,
	CallState,
	CallStatsButton,
	PaginatedGridLayout,
	SpeakerLayout,
	useCallStateHooks,
} from '@stream-io/video-react-sdk';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LayoutList, Users } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
	const [layout, setLayout] = useState<CallLayoutType>('grid');
	const [showParticipants, setShowParticipants] = useState(false);
	const searchParams = useSearchParams();
	const isPersonalRoom = !!searchParams.get('personal ');
	const { useCallCallingState } = useCallStateHooks();
	const callingState = useCallCallingState();
	const CallLayout = () => {
		switch (layout) {
			case 'grid':
				return <PaginatedGridLayout />;
			case 'speaker-right':
				return <SpeakerLayout participantsBarPosition={'left'} />;
			default:
				return <SpeakerLayout participantsBarPosition={'right'} />;
		}
	};

	if (callingState !== CallingState.JOINED) return <Loader />;
	return (
		<section className='relative h-screen w-full text-white overflow-hidden pt-4'>
			<div className='relative flex items-center justify-center  size-full'>
				<div className='flex size-full max-w-[1000px] items-center'>
					<CallLayout />
				</div>
				<div
					className={cn('h-[calc(100vh-86px)] ml-2 hidden', {
						'show-block': showParticipants,
					})}
				>
					<CallParticipantsList onClose={() => setShowParticipants(false)} />
				</div>
			</div>
			<div className='fixed bottom-0 flex w-full flex-wrap pb-10  items-center justify-center gap-5'>
				<CallControls />
				<DropdownMenu>
					<div className='flex items-center'>
						<DropdownMenuTrigger
							className='cursor-pointer rounded-2xl
            bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]
            '
						>
							<LayoutList size={20} className='text-white' />
						</DropdownMenuTrigger>
					</div>
					<DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
						{['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
							<div key={index}>
								<DropdownMenuItem
									className='cursor-pointer'
									onClick={() =>
										setLayout(item.toLowerCase() as CallLayoutType)
									}
								>
									{item}
								</DropdownMenuItem>
								<DropdownMenuSeparator className='border-dark-1 ' />
							</div>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
				<CallStatsButton />
				<button onClick={() => setShowParticipants((prev) => !prev)}>
					<div
						className='cursor-pointer rounded-2xl
            bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]
            '
					>
						<Users size={20} className='text-white' />
					</div>
				</button>
				{!isPersonalRoom && <EndCallButton />}
			</div>
		</section>
	);
};

export default MeetingRoom;