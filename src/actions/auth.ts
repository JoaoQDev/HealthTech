'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { RegisterSchema } from '@/schemas';
import { getUserByEmail } from '@/auth/utils';
import { db } from '@/lib/db';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFiels = RegisterSchema.safeParse(values);

	if (!validatedFiels.success) return { error: 'Campos inválidos!' };

	const { email, password, name } = validatedFiels.data;
	const hashedPassword = await bcrypt.hash(password, 10);

	const existingUser = await getUserByEmail(email);

	if (existingUser) return { error: 'Já existe uma conta com esse email!' };

	await db.user.create({ data: { name, email, password: hashedPassword, emailVerified: new Date() } });

	return { success: 'Usuário criado com sucesso!' };
};
