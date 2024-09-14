'use client';

import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useState } from 'react';

const page = ({ params: { id } }: { params: { id: string } }) => {
	const [isSetupComplete, setIsSetupcomplete] = useState(false);

	const { user, isLoaded } = useUser();

	const { call, isCallLoading } = useGetCallById(id);

	const joinMeeting = () => {
		call?.join();
		setIsSetupcomplete(true);
	};

	console.log('isLoaded || isCallLoading: ', isLoaded, isCallLoading);
	if (!isLoaded || isCallLoading) return <Loader />;
	return (
		<main className='h-screen w-full'>
			<StreamCall call={call}>
				<StreamTheme>
					{!isSetupComplete ? (
						<MeetingSetup joinMeeting={joinMeeting} />
					) : (
						<MeetingRoom />
					)}
				</StreamTheme>
			</StreamCall>
		</main>
	);
};

export default page;
