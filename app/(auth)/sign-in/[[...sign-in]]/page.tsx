import { SignIn } from '@clerk/nextjs';

const page = () => {
	return (
		<main className='h-screen flex-center'>
			<SignIn />
		</main>
	);
};

export default page;
