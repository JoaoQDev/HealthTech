'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';

import Loader from '../loader';
import { usePathname } from 'next/navigation';

export function ThreadsList() {
	const { threads, updateThreads, loadingThreads } = useSidebar();

	const pathname = usePathname(); // ex: "/chat/threads/abc123"
	const selectedThreadId = pathname.startsWith('/thread/')
	  ? pathname.split('/').pop() // extrai o threadId
	  : null;

	useEffect(() => {
		updateThreads();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!threads || loadingThreads)
		return (
			<div className='w-full flex justify-center items-center'>
				<Loader />
			</div>
		);
	
	return (
		<SidebarMenu>
			{threads.map((thread) => (
				<SidebarMenuItem
					className='py-1'
					key={thread.id}
				>
					<SidebarMenuButton asChild>
						{thread.id === selectedThreadId ? (
						<Link
							className='bg-gray-800 text-white hover:bg-gray-600 rounded-md px-3 py-2'
							href={`/thread/${thread.id}`}
						>
							{thread.title.length > 28 ? thread.title.substring(0, 28).trim() + '...' : thread.title}
						</Link>
						) :
						(
						<Link
							className='text-white hover:text-white py-1'
							href={`/thread/${thread.id}`}
						>
							{thread.title.length > 28 ? thread.title.substring(0, 28).trim() + '...' : thread.title}
						</Link>
						)}
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
}
