'use client';

import { useToast } from '@/hooks/use-toast';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import HomeCard from './HomeCard';
import MeetingModal from './MeetingModal';
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';
import { Input } from './ui/input';
const MeetingTypeList = () => {
	const modalRef = useRef(null);
	const router = useRouter();
	const [meetingState, setMeetingState] = useState<
		'isScheduleMeeting' | 'isJoiningMeeting' | 'isIstantMeeting' | undefined
	>();
	const [values, setValues] = useState({
		dateTime: new Date(),
		description: '',
		link: '',
	});

	const [callDetails, setCallDetails] = useState<Call>();

	const { toast } = useToast();
	const user = useUser();
	const client = useStreamVideoClient();

	const createMeeting = async () => {
		if (!user || !client) return;

		try {
			if (!values.dateTime) {
				toast({
					title: 'Please select date and time ',
				});
				return;
			}

			const id = crypto.randomUUID();
			const call = client.call('default', id);

			if (!call) throw new Error('Failed to start a call');

			const startsAt =
				values.dateTime.toISOString() || new Date(Date.now()).toISOString();
			const description = values.description || 'Instant Meeting';

			await call.getOrCreate({
				data: {
					starts_at: startsAt,
					custom: {
						description: description,
					},
				},
			});

			setCallDetails(call);

			if (!values.description) {
				router.push(`/meeting/${call.id}`);
			}
			toast({
				title: 'Meeting created',
			});
		} catch (error) {
			toast({
				title: 'Failed to create call',
			});
			console.log(error);
		}
	};

	const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
	return (
		<section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
			<HomeCard
				img='icons/add-meeting.svg'
				title='New Meeting'
				descripton='Start an instant meeting'
				handleClick={() => setMeetingState('isIstantMeeting')}
				className='bg-orange-1'
			/>
			<HomeCard
				img='icons/schedule.svg'
				title='Schedule Meeting'
				descripton='Plan meeting'
				handleClick={() => setMeetingState('isScheduleMeeting')}
				className='bg-blue-1'
			/>
			<HomeCard
				img='icons/recordings.svg'
				title='View Recordings'
				descripton='Check out your recordings'
				handleClick={() => router.push('/recordings')}
				className='bg-purple-1'
			/>
			<HomeCard
				img='icons/join-meeting.svg'
				title='Join Meeting'
				descripton='via invitation link'
				handleClick={() => setMeetingState('isJoiningMeeting')}
				className='bg-yellow-1'
			/>

			{!callDetails ? (
				<MeetingModal
					isOpen={meetingState === 'isScheduleMeeting'}
					onClose={() => setMeetingState(undefined)}
					title='Create meeting'
					handleClick={createMeeting}
				>
					<div className='flex flex-col gap-2.5'>
						<label className='text-base leading-[22px] text-normal'>
							Add a description
						</label>

						<Textarea
							className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
							onChange={(e) => {
								setValues({
									...values,
									description: e.target.value,
								});
							}}
						/>
					</div>
					<div className='flex flex-col gap-2.5'>
						<label className='text-base leading-[22px] text-normal'>
							Add a description
						</label>
						<ReactDatePicker
							className='w-full p-2 rounded-lg border-none bg-dark-3 focus:outline-none'
							selected={values.dateTime}
							onChange={(date) => {
								setValues({ ...values, dateTime: date! });
							}}
							showTimeSelect
							timeFormat='HH:mm'
							timeIntervals={15}
							timeCaption='time'
							dateFormat={'MMMM d, yyyy hh:mm aa'}
						/>
					</div>
				</MeetingModal>
			) : (
				<MeetingModal
					isOpen={meetingState === 'isScheduleMeeting'}
					onClose={() => setMeetingState(undefined)}
					title='Meeting created'
					className='text-center'
					handleClick={() => {
						navigator.clipboard.writeText(meetingLink);
						toast({
							title: 'Link copied',
						});
					}}
					image='/icons/checked.svg'
					buttonIcon='/icons/copy.svg'
					buttonText='Copy Meeting Link'
				/>
			)}
			<MeetingModal
				isOpen={meetingState === 'isIstantMeeting'}
				onClose={() => setMeetingState(undefined)}
				title='Start an instant meeting'
				className='text-center'
				buttonText='Start Meeting'
				handleClick={createMeeting}
			/>
			<MeetingModal
				isOpen={meetingState === 'isJoiningMeeting'}
				onClose={() => setMeetingState(undefined)}
				title='Type the link here'
				className='text-center'
				buttonText='Join Meeting'
				handleClick={() => router.push(values.link)}
			>
				<Input
					placeholder='Meeting Link'
					className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
					onChange={(e) => setValues({ ...values, link: e.target.value })}
				/>
			</MeetingModal>
		</section>
	);
};

export default MeetingTypeList;
