import type { ChatMessage } from "./ChatMessage";

export interface ChatSession {
	id: number;
	user_id: number;
	title: string | null;
	created_at: string;
	updated_at: string;
}

export interface ChatSessionDetail {
	id: number;
	user_id: number;
	title: string | null;
	is_thinking: boolean;
	created_at: string;
	updated_at: string;
	messages: ChatMessage[];
}