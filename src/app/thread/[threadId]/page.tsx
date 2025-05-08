import { redirect } from 'next/navigation';

import { getThread } from '@/actions/threads';
import AppSidebar from '@/components/app-sidebar';
import Chat from '@/components/chat';
import { SidebarProvider } from '@/components/ui/sidebar';

interface ThreadPageProps {
	params: Promise<{
		threadId: string;
	}>;
}

export default async function ThreadPage({ params }: ThreadPageProps) {
	const data = await getThread((await params).threadId);

	if (!data.thread) redirect('/');

	return (
		<>
			<SidebarProvider>
				<AppSidebar />
				<div className='w-full p-2 sm:p-8'>
					<Chat thread={data.thread} />
				</div>
			</SidebarProvider>
		</>
	);
}
