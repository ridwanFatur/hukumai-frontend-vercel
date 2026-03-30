import axiosClient from "@/utils/axios"
import { ENDPOINT } from "@/utils/api-constants"
import type { ChatSession, ChatSessionDetail } from "@/models/ChatSession";
import type { ChatMessage } from "@/models/ChatMessage";

export const createChatSessionApi = async (prompt: string): Promise<ChatSession> => {
	const response = await axiosClient.post(
		`${ENDPOINT.chat_session}/`,
		{ prompt }
	).then((res) => res.data)

	return response
}

export const getChatSessionsApi = async (title?: string): Promise<ChatSession[]> => {
	const response = await axiosClient.get(`${ENDPOINT.chat_session}/`, {
		params: { title }
	}).then((res) => res.data);

	return response;
}

export const getChatSessionDetailApi = async (
	sessionId: number
): Promise<ChatSessionDetail> => {
	const response = await axiosClient
		.get(`${ENDPOINT.chat_session}/${sessionId}`)
		.then((res) => res.data);

	return response;
};

export const sendMessageApi = async (
	session_id: number,
	content: string
): Promise<{ data: ChatMessage }> => {
	const response = await axiosClient.post(
		`${ENDPOINT.chat_session}/send-message`,
		{
			session_id,
			content
		}
	).then((res) => res.data)

	return response
}