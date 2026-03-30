export interface ChatMessage {
	id: number;
	session_id: number;
	role: string;
	content: string;
	created_at: string;
}