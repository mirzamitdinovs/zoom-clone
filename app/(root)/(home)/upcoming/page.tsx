import CallList from '@/components/CallList';

const page = () => {
	return (
		<div className='flex size-full flex-col gap-10 text-white'>
			<h1 className='text-3xl font-bold'>Upcoming</h1>

			<CallList type='upcoming' />
		</div>
	);
};

export default page;
