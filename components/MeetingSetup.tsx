'use client';
import {
	DeviceSettings,
	useCall,
	VideoPreview,
} from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface iProps {
	joinMeeting: () => void;
}
const MeetingSetup = ({ joinMeeting }: iProps) => {
	const [isMicToggleOn, setIsMicToggleOn] = useState(false);

	const call = useCall();

	if (!call) {
		throw new Error('Use call must be called within Stream call component');
	}
	useEffect(() => {
		if (isMicToggleOn) {
			call?.camera.disable();
			call?.microphone.disable();
		} else {
			call?.camera.enable();
			call?.microphone.enable();
		}
	}, [isMicToggleOn, call?.camera, call?.microphone]);
	return (
		<div className='h-screen w-full flex-col flex-center text-white gap-3'>
			<h1 className='text-2xl font-bold'>Setup</h1>
			<VideoPreview />
			<div className='h-16 flex-center gap-3'>
				<label className='flex-center gap-2 font-medium'>
					<input
						type='checkbox'
						defaultChecked={isMicToggleOn}
						onChange={(e) => setIsMicToggleOn(e.target.checked)}
					/>
					Join with mic and camera off
				</label>
				<DeviceSettings />
			</div>
			<Button
				onClick={joinMeeting}
				className='rouned-md bg-green-500 px-4 py-2.5'
			>
				Join meeting
			</Button>
		</div>
	);
};

export default MeetingSetup;
