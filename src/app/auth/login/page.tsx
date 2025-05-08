'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

import AuthWrapper from '@/components/auth-wrapper';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { useEffect } from 'react';

const LoginPage = () => {
	const searchParams = useSearchParams();

	async function onSubmit(formData: FormData) {
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		await signIn('credentials', { email, password, callbackUrl: DEFAULT_LOGIN_REDIRECT });
	}

	useEffect(() => {
		const error = searchParams.get('error');

		if (error) {
			toast.error('Erro', { description: 'Login inválido' });
		}
	}, [searchParams]);

	return (
		<AuthWrapper
			title='Login'
			onSubmit={onSubmit}
		/>
	);
};

export default LoginPage;
