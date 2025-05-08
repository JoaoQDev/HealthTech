'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import Image from 'next/image';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'sonner';
import { SendHorizonal } from 'lucide-react';

import { Message, Thread } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import Loader from '@/components/loader';
import { createThread, sendMessage } from '@/actions/threads';
import { cn } from '@/lib/utils';
import MarkdownRenderer from '@/components/markdown-renderer/markdown-renderer';
import { useSidebar } from '@/components/ui/sidebar';

type ChatProps = {
	thread?: Thread;
};

function UserMessage({ content }: { content: string }) {
	return (
		<div className='mb-4 w-full flex justify-end'>
			<div className='bg-[#414158] px-4 py-2 rounded-lg max-w-3/4'>{content}</div>
		</div>
	);
}

function AssistantMessage({ content }: { content: string }) {
	return (
		<div className='mb-4 w-full'>
			<div className='px-4 py-2'>
				<MarkdownRenderer content={content} />
			</div>
		</div>
	);
}

export function Chat({ thread: threadFromProps }: ChatProps) {
	const [message, setMessage] = useState('');
	const [title, setTitle] = useState<string | null>(threadFromProps?.title || null);
	const [id, setId] = useState<string | null>(threadFromProps?.id || null);
	const [messages, setMessages] = useState<Pick<Message, 'role' | 'content'>[]>(
		threadFromProps?.messages.map((m) => ({ role: m.role, content: m.content })) || []
	);

	const [pending, startTransition] = useTransition();

	const { updateThreads } = useSidebar();

	const messagesEndRef = useRef<HTMLDivElement>(null);

	const onSubmit = () => {
		if (!message || message.trim() === '') return;

		setMessages((prev) => [...prev, { role: 'user', content: message }]);

		const m = message;
		setMessage(''.trim());

		startTransition(async () => {
			if (!id) {
				const data = await createThread(m);

				if (data.error) {
					toast.error('Erro', { description: data.error });
				}

				if (data.thread) {
					setTitle(data.thread.title);
					setId(data.thread.id);
					setMessages(data.thread.messages);
					updateThreads();
				}
			} else {
				const data = await sendMessage({ threadId: id, message: m });

				if (data.error) {
					toast.error('Erro', { description: data.error });
				}

				if (data.newMessage) {
					setMessages((prev) => [...prev, { role: 'assistant', content: data.newMessage }]);
				}
			}
		});
	};

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div className={cn('w-full md:w-3/4 mx-auto', !id && 'flex flex-col items-center justify-center h-full')}>
			{!id && !pending ? (
				<div className='w-2/3 p-6'>
					<div className='w-full flex justify-center items-center mb-6 gap-2'>
						<Image
							src={'/logo.png'}
							alt='Logo'
							width={60}
							height={60}
						/>
						<h1 className='w-fit text-xl font-bold'>Olá, seja bem-vindo.</h1>
					</div>
					<p className='text-center text-sm'>Como podemos te ajudar hoje?</p>
				</div>
			) : (
				<>
					<h1 className='mx-auto w-fit text-xl font-bold'>{title}</h1>
					<ScrollArea className='w-full h-[calc(100vh-32px-28px-60px)] sm:h-[calc(100vh-64px-28px-60px)] p-4 sm:p-8'>
						{messages.map((m, i) =>
							m.role === 'user' ? (
								<UserMessage
									key={i}
									content={m.content}
								/>
							) : (
								<AssistantMessage
									key={i}
									content={m.content}
								/>
							)
						)}
						<div ref={messagesEndRef} />
						{pending && <Loader />}
					</ScrollArea>
				</>
			)}
			<div
				className={cn(
					'relative border border-gray-500 rounded-xl bg-[#404045] p-2 shadow-sm transition',
					!!id ? 'w-full' : 'w-2/3'
				)}
			>
				<TextareaAutosize
					minRows={1}
					maxRows={8}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder='Enviar mensagem'
					className='w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none px-3 py-2'
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							onSubmit();
						}
					}}
					disabled={pending}
				/>
				<Button
					onClick={onSubmit}
					disabled={message.trim() === '' || pending}
					className='cursor-pointer absolute bottom-2.5 right-3 text-sm text-[#404045] hover:text-[#404045] transition rounded-full'
				>
					<SendHorizonal />
				</Button>
			</div>
		</div>
	);
}
