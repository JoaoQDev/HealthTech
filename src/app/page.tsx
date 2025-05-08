import AppSidebar from '@/components/app-sidebar';
import Chat from '@/components/chat';
import { SidebarProvider } from '@/components/ui/sidebar';

export default async function HomePage() {
	return (
		<>
			<SidebarProvider>
				<AppSidebar />
				<div className='w-full p-2 sm:p-8'>
					<Chat />
				</div>
			</SidebarProvider>
		</>
	);
}
