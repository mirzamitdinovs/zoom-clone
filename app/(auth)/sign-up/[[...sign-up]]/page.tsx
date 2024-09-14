import { SignUp } from '@clerk/nextjs';

const page = () => {
	return (
		<main className='h-screen flex-center'>
			<SignUp />
		</main>
	);
};

export default page;
