'use server';

import { currentUser } from '@clerk/nextjs/server';
import { StreamClient } from '@stream-io/node-sdk';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const secretKey = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
	const user = await currentUser();

	if (!user) throw new Error('User not logged in');
	if (!apiKey) throw new Error('No Stram Api Key');
	if (!secretKey) throw new Error('No Stram Secret Key');

	const client = new StreamClient(apiKey, secretKey);

	const validity = 60 * 60;

	const token = client.generateUserToken({
		user_id: user.id,
		validity_in_seconds: validity,
	});

	return token;
};
