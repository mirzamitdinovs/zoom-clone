'use client';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { CopyIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Table = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => (
	<div className='flex flex-col gap-2 items-start xl:flex-row'>
		<h1 className='text-base font-medium text-sky-1 lg:text-xl xl:min-w-32'>
			{title}:
		</h1>
		<h2 className='truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl'>
			{description}
		</h2>
	</div>
);
const page = () => {
	const { user, isLoaded } = useUser();
	const client = useStreamVideoClient();
	const meetingId = user?.id;
	const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;
	const router = useRouter();
	const { call } = useGetCallById(meetingId!);
	const startRoom = async () => {
		if (!user || !client) return;

		if (!call) {
			const newCall = client.call('default', meetingId!);

			await newCall.getOrCreate({
				data: {
					starts_at: new Date().toISOString(),
				},
			});

			router.push(`/meeting/${meetingId}?personal=true`);
		}
	};
	return (
		<section className='flex size-full flex-col gap-10 text-white'>
			<h1 className='text-3xl font-bold'>Personal Room</h1>

			<div className='flex flex-col gap-9 w-full xl:max-w-[900px]'>
				<Table title='Topic' description={`${user?.username}'s meeting room`} />
				<Table title='Meeting ID' description={meetingId!} />
				<Table title='Invite Link' description={meetingLink} />
			</div>

			<div className='flex gap-5'>
				<Button className='bg-blue-1' onClick={startRoom}>
					Start Meeting
				</Button>
				<Button
					className='bg-dark-1'
					onClick={() => {
						navigator.clipboard.writeText(meetingLink);
						toast({
							title: 'Link Copied',
						});
					}}
				>
					Copy Invitation
				</Button>
			</div>
		</section>
	);
};

export default page;
