import 'server-only';

import { db } from '@/lib/db';

export const getUserByEmail = async (email: string) => {
	try {
		const user = await db.user.findUnique({ where: { email } });
		return user;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getUserById = async (id: string) => {
	try {
		const user = await db.user.findUnique({ where: { id } });
		return user;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getAccountByUserId = async (userId: string) => {
	try {
		const account = await db.account.findFirst({ where: { userId } });

		return account;
	} catch (error) {
		console.error(error);
		return null;
	}
};
