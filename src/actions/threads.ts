'use server';

import { Thread } from '@/types';
import getJWT from '@/lib/getJWT';

export async function getThreads() {
	try {
		const token = await getJWT();

		const res = await fetch(`${process.env.API_URL}/ai/thread`, {
			method: 'GET',
			cache: 'no-store',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		if (!res.ok) return { error: 'Algo deu errado' };

		const data: Thread[] = await res.json();

		return { threads: data };
	} catch (error) {
		console.error(error);
		return { error: 'Algo deu errado' };
	}
}

export async function getThread(threadId: string) {
	try {
		const token = await getJWT();

		const res = await fetch(`${process.env.API_URL}/ai/thread/${threadId}`, {
			method: 'GET',
			cache: 'no-store',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		if (!res.ok) return { error: 'Algo deu errado' };

		const data: Thread = await res.json();

		return { thread: data };
	} catch (error) {
		console.error(error);
		return { error: 'Algo deu errado' };
	}
}

export async function createThread(message: string) {
	try {
		const token = await getJWT();

		const res = await fetch(`${process.env.API_URL}/ai/thread/createThread`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ message }),
		});

		if (!res.ok) return { error: 'Algo deu errado' };

		const data: Thread = await res.json();

		return { thread: data };
	} catch (error) {
		console.error(error);
		return { error: 'Algo deu errado' };
	}
}

export async function sendMessage({ message, threadId }: { message: string; threadId: string }) {
	try {
		const token = await getJWT();

		const res = await fetch(`${process.env.API_URL}/ai/message/${threadId}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ message }),
		});

		if (!res.ok) return { error: 'Algo deu errado' };

		const newMessage = await res.text();

		return { newMessage };
	} catch (error) {
		console.error(error);
		return { error: 'Algo deu errado' };
	}
}
