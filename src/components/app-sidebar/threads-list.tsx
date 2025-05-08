'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';

import Loader from '../loader';

export function ThreadsList() {
	const { threads, updateThreads, loadingThreads } = useSidebar();

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
				<SidebarMenuItem key={thread.id}>
					<SidebarMenuButton asChild>
						<Link
							className='text-white hover:text-white'
							href={`/thread/${thread.id}`}
						>
							{thread.title}
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
}
