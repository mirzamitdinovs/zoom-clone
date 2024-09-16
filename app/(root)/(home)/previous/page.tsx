import CallList from '@/components/CallList';

const page = () => {
	return (
		<div className='flex size-full flex-col gap-10 text-white'>
			<h1 className='text-3xl font-bold'>Previous</h1>

			<CallList type='ended' />
		</div>
	);
};

export default page;
