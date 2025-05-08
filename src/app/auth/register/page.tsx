'use client';

import { useTransition } from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

import { register } from '@/actions/auth';
import AuthWrapper from '@/components/auth-wrapper';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

const RegisterPage = () => {
	const [pending, startTransition] = useTransition();

	function onSubmit(formData: FormData) {
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!password || password.length < 6) {
			toast.error('Erro', { description: 'Senha deve ter pelo menos 6 dígitos' });
			return;
		}

		startTransition(async () => {
			try {
				const data = await register({ name, email, password });

				if (data.error) {
					toast.error('Erro', { description: data.error });
				}

				if (data.success) {
					await signIn('credentials', { email, password, callbackUrl: DEFAULT_LOGIN_REDIRECT });
				}
			} catch (error) {
				console.log(error);
				toast.error('Erro', { description: 'Algo deu errado!' });
			}
		});
	}

	return (
		<AuthWrapper
			title='Cadastro'
			onSubmit={onSubmit}
			pending={pending}
		/>
	);
};

export default RegisterPage;
