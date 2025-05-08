export type Thread = {
	id: string;
	title: string;
	created_at: Date;
	updated_at: Date;
	messages: Message[];
	user: unknown;
};

export type Message = {
	id: string;
	content: string;
	role: 'assistant' | 'user';
	created_at: Date;
	thread: string;
};
