'use client';
import { useGetCalls } from '@/hooks/useGetCalls';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useState } from 'react';
import MeetingCard from './MeetingCard';
import { useRouter } from 'next/navigation';
import Loader from './Loader';

interface iProps {
	type: 'upcoming' | 'recordings' | 'ended';
}

const CallList = ({ type }: iProps) => {
	const [recordings, setRecordings] = useState<CallRecording[]>([]);
	const { isLoading, upcomingCalls, endedCalls, callRecordings } =
		useGetCalls();

	const getCalls = () => {
		switch (type) {
			case 'upcoming':
				return upcomingCalls;
			case 'ended':
				return endedCalls;
			case 'recordings':
				return recordings;
			default:
				return [];
		}
	};
	const getNoCallsMessage = () => {
		switch (type) {
			case 'upcoming':
				return 'No Upcoming Calls';
			case 'ended':
				return 'No Previous Calls';
			case 'recordings':
				return 'No Recordings ';
			default:
				return '';
		}
	};

	const imageUrl =
		type === 'ended'
			? '/icons/previous.svg'
			: type === 'recordings'
			? '/icons/recordings.svg'
			: '/icons/upcoming.svg';
	const calls = getCalls();
	const noCallsMessage = getNoCallsMessage();

	const router = useRouter();
	function isCall(meeting: Call | CallRecording): meeting is Call {
		return (meeting as Call).state !== undefined;
	}

	const getMeetingDetails = (meeting: Call) => {
		return {
			title: meeting.state.custom.description || 'No Description',
			date: meeting.state.startsAt?.toLocaleString(),
			// : `${meeting.state.startedAt} - ${meeting.state.endedAt}`,
			isPreviousMeeting: type === 'ended',
			buttonText: 'Start',
			buttonIcon1: '',
			handleClick: () => router.push(`/meeting/${meeting.id}`),
			link: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`,
		};
	};

	const getRecordingDetails = (meeting: CallRecording) => {
		return {
			title: 'No Description',
			date: meeting.start_time,
			isPreviousMeeting: type === 'ended',
			buttonIcon1: '/icons/play.svg',
			handleClick: () => router.push(meeting.url),
			link: meeting.url,
			buttonText: 'Play',
		};
	};

	if (isLoading) return <Loader />;

	return (
		<div className='grid grid-cols-1 xl:grid-cols-2 gap-5'>
			{calls && calls.length > 0 ? (
				calls.map((meeting, index) => (
					<MeetingCard
						key={index}
						icon={imageUrl}
						{...(isCall(meeting)
							? getMeetingDetails(meeting)
							: getRecordingDetails(meeting))}
					/>
				))
			) : (
				<h1>{noCallsMessage}</h1>
			)}
		</div>
	);
};

export default CallList;
