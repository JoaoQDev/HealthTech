'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarTrigger,
	useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

import { ThreadsList } from './threads-list';
import { signOut, useSession } from 'next-auth/react';
import { LogOut, MessageSquare } from 'lucide-react';

const SIDEBAR_BG_COLOR = '#212327';

export function AppSidebar() {
	const { open, setOpen } = useSidebar();
	const isMobile = useIsMobile();
	const router = useRouter();
	const pathname = usePathname();
	const session = useSession();

	return (
		<>
			{isMobile && <SidebarTrigger className='cursor-pointer' />}
			<Sidebar
				collapsible='icon'
				className="text-[#ABB2BD]"
			>
				<SidebarHeader className="bg-[#212327] p-4 group-data-[collapsible=icon]:hidden">
					<div className='flex justify-between items-center pb-4'>
						<Image
							src={'/logo.png'}
							alt='Logo'
							width={50}
							height={50}
						/>
						<SidebarTrigger className='cursor-pointer' />
					</div>
					<div className='w-full flex items-center'>
						<Button
							onClick={() => {
								if (pathname === '/') {
									location.reload();
								} else {
									router.push('/');
								}
							}}
							className='cursor-pointer w-full'
						>
							<MessageSquare />
							Nova conversa
						</Button>
					</div>
				</SidebarHeader>
				<SidebarContent className={`bg-[${SIDEBAR_BG_COLOR}]`}>
					{!open && (
						<>
							<div className='pt-6 w-full flex justify-center items-center'>
								<Image
									src={'/logo.png'}
									alt='Logo'
									width={40}
									height={40}
									onClick={() => setOpen(true)}
									className='cursor-pointer'
								/>
							</div>
							<SidebarTrigger className='mx-auto my-6 cursor-pointer' />
							<div className='mx-auto'>
								<Button
									className='cursor-pointer'
									onClick={() => {
										if (pathname === '/') {
											location.reload();
										} else {
											router.push('/');
										}
									}}
									size={'icon'}
									variant={'ghost'}
								>
									<MessageSquare />
								</Button>
							</div>
						</>
					)}
					<SidebarGroup className='group-data-[collapsible=icon]:hidden'>
						<SidebarGroupContent>
							<ThreadsList />
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter className='py-8'>
					{session.data?.user.email && open && (
						<p className='text-center text-sm pb-4 font-bold'>{session.data.user.email}</p>
					)}
					<Button
						className='cursor-pointer'
						onClick={() => signOut()}
						size={open ? 'default' : 'icon'}
					>
						{open ? 'Sair' : <LogOut />}
					</Button>
				</SidebarFooter>
			</Sidebar>
		</>
	);
}
