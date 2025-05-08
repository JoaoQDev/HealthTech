import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes } from '@/routes';

export default async function middleware(req: NextRequest) {
	const { nextUrl } = req;

	const token = (await cookies()).get('next-auth.session-token');

	const isLoggedIn = !!token;

	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

	if (isApiAuthRoute) return;

	if (isAuthRoute) {
		if (isLoggedIn) return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
		return;
	}

	if (!isLoggedIn) {
		return Response.redirect(new URL(`/auth/login`, nextUrl));
	}

	return;
}

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
