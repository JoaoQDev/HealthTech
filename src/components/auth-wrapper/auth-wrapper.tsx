import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

type AuthWrapperProps = {
	title: 'Cadastro' | 'Login';
	onSubmit: (formData: FormData) => void;
	pending?: boolean;
};

export function AuthWrapper({ onSubmit, title, pending }: AuthWrapperProps) {
	return (
		<div className='w-full h-dvh flex justify-center items-center'>
			<form
				action={onSubmit}
				className='px-10 py-6 bg-secondary rounded-xl sm:w-[500px] w-[90%]'
			>
				<div className='w-full flex items-center justify-center'>
					<Image
						src={'/logo.png'}
						alt='Logo'
						width={70}
						height={70}
					/>
				</div>
				<h1 className='text-sm text-center my-4'>{title}</h1>
				{title === 'Cadastro' && (
					<Input
						id='name'
						name='name'
						type='text'
						placeholder='Nome'
						className='my-4'
					/>
				)}
				<Input
					id='email'
					name='email'
					type='text'
					placeholder='Email'
					className='my-4'
				/>
				<Input
					id='password'
					name='password'
					type='password'
					placeholder='Senha'
					className='my-4'
				/>
				<div className='w-full flex justify-center items-center my-4'>
					<Button
						className='cursor-pointer'
						type='submit'
						disabled={pending}
					>
						{title === 'Login' ? 'Entrar' : 'Cadastrar'}
					</Button>
				</div>
				{title === 'Login' ? (
					<p className='my- text-center text-sm'>
						Ainda não tem conta?{' '}
						<Link
							className='text-blue-400 hover:text-blue-300 hover:underline transition'
							href='/auth/register'
						>
							Cadastre-se.
						</Link>
					</p>
				) : (
					<p className='my-4 text-center text-sm'>
						Já tem conta?{' '}
						<Link
							href='/auth/login'
							className='text-blue-400 hover:text-blue-300 hover:underline transition'
						>
							Faça login.
						</Link>
					</p>
				)}
				<div className='mx-auto flex items-center flex-col gap-y-2 px-2 mt-4'>
					<Button
						size={'sm'}
						className='w-[80%] py-6'
						variant={'outline'}
						onClick={async () => {
							await signIn('google', {
								callbackUrl: DEFAULT_LOGIN_REDIRECT,
							});
						}}
						type='button'
					>
						<FcGoogle className='w-7 h-7 mr-4' />
						Continuar com Google
					</Button>
				</div>
			</form>
		</div>
	);
}
