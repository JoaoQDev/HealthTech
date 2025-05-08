import 'server-only';

import { sign } from 'jsonwebtoken';
import { getServerSession } from 'next-auth';
import authConfig from '@/auth/auth.config';

export default async function getJWT() {
	const session = await getServerSession(authConfig);

	if (!session?.user) return '';

	const token = sign({ sub: session.user.id }, process.env.NEXTAUTH_SECRET || '', {
		audience: process.env.JWT_AUDIENCE || '',
		issuer: process.env.JWT_ISSUER || '',
	});

	return token;
}
