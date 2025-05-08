// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from 'next-auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from 'next-auth/jwt';

export type ExtendedUser = DefaultSession['user'] & { id?: string };

declare module 'next-auth' {
	interface Session {
		user: ExtendedUser;
	}
}

declare module '@auth/core/jwt' {
	interface JWT {
		id?: string;
	}
}
