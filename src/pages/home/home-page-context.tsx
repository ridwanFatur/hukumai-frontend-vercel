import { createChatSessionApi, getChatSessionDetailApi, sendMessageApi } from "@/api/chat-session-api";
import { useGlobal } from "@/global-context/global";
import { useMainLayout } from "@/layouts/main/main-layout-context";
import type { ChatSessionDetail } from "@/models/ChatSession";
import {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from "react"
import { ENDPOINT, WS_URL } from "@/utils/api-constants"
import { getCookie } from "@/utils/cookie-helper"
import { useToast } from "@/global-context/toast";

export function useHomePageState() {
	const [isLoading, setIsLoading] = useState(false);
	const { chatbot } = useMainLayout()
	const [value, setValue] = useState("");
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [isLoadingMessages, setIsLoadingMessages] = useState(false);
	const [chatSession, setChatSession] = useState<ChatSessionDetail>()
	const [thinkingText, setThinkingText] = useState<string | undefined>()
	const { user } = useGlobal()
	const bottomRef = useRef<HTMLDivElement>(null);
	const { toast } = useToast();

	async function loadChatDetail() {
		if (!chatbot.activeHistoryId) return
		setIsLoadingMessages(true);
		try {
			const result = await getChatSessionDetailApi(chatbot.activeHistoryId);
			if (chatbot.activeHistoryId) {
				setChatSession(result)
			}
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoadingMessages(false);
		}
	}

	useEffect(() => {
		setThinkingText(undefined)
		if (chatbot.activeHistoryId) {
			loadChatDetail();
		} else {
			setChatSession(undefined)
		}
	}, [chatbot.activeHistoryId]);

	async function createChatSession(content: string) {
		setIsLoading(true)
		try {
			const result = await createChatSessionApi(content)
			chatbot.addChatSession(result)
			chatbot.setActiveHistoryId(result.id)
			cleanTextInput()

		} catch (e: any) {
			let errorCode = "default"
			try {
				errorCode = e.response.data.detail.error_code
			} catch {

			}

			if (errorCode == 'insufficient_tokens') {
				toast({
					title: "Insufficient Tokens",
					message: "You need more tokens to perform this action.",
					variant: "error",
					duration: 6000
				})
			}
		} finally {
			setIsLoading(false)
		}
	}

	async function sendChatSession(session_id: number, content: string) {
		setIsLoading(true)
		try {
			const result = await sendMessageApi(session_id, content)
			setChatSession((prev) => {
				if (!prev) return prev;

				return {
					...prev,
					is_thinking: true,
					messages: [...prev.messages, result.data],
				};
			});
			cleanTextInput()
		} catch (e: any) {
			let errorCode = "default"
			try {
				errorCode = e.response.data.detail.error_code
			} catch {

			}

			if (errorCode == 'insufficient_tokens') {
				toast({
					title: "Insufficient Tokens",
					message: "You need more tokens to perform this action.",
					variant: "error",
					duration: 6000
				})
			}
		} finally {
			setIsLoading(false)
		}
	}

	async function sendMessage(content: string) {
		if (content) {
			if (!chatbot.activeHistoryId) {
				createChatSession(content)
			} else {
				sendChatSession(chatbot.activeHistoryId, content)
			}
		}
	}

	function cleanTextInput() {
		setValue("");
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
		}
	}

	/** Websocket */
	const socketRef = useRef<WebSocket | null>(null)
	const retryCountRef = useRef(0)
	const maxRetries = 3

	useEffect(() => {
		if (!user?.id) return

		const token = getCookie("token")
		let isMounted = true

		const connect = () => {
			const wsUrl = `${WS_URL}${ENDPOINT.ws_chat}/${user.id}?token=${encodeURIComponent(token!)}`
			const ws = new WebSocket(wsUrl)

			socketRef.current = ws

			ws.onopen = () => {
				// console.log("WebSocket connected ✅")
				retryCountRef.current = 0
			}

			ws.onclose = () => {
				// console.log("WebSocket disconnected 🔌")

				if (!isMounted) return

				if (retryCountRef.current < maxRetries) {
					retryCountRef.current += 1
					// console.log(`Retrying... (${retryCountRef.current})`)

					setTimeout(() => {
						connect()
					}, 2000)
				} else {
					// console.log("Max retry reached ❌")
				}
			}

			ws.onerror = (error) => {
				console.error("WebSocket error", error)
				ws.close()
			}

			ws.onmessage = (event) => {
				handleWebsocketMessage(event)
			}
		}

		connect()

		return () => {
			isMounted = false

			if (socketRef.current) {
				// console.log("Cleaning up WebSocket 🧹")
				socketRef.current.close()
			}
		}
	}, [user?.id])

	function handleWebsocketMessage(event: MessageEvent) {
		try {
			const payload = JSON.parse(event.data)

			if (payload?.action === "reload_history") {
				// console.log("Trigger reload history 🚀")
				chatbot.loadChatSessions()
			} else if (payload?.action == "update_history") {
				chatbot.setChatSessions((prev) =>
					prev.map((session) =>
						session.id === payload.session_id
							? { ...session, title: payload.title }
							: session
					)
				)
			} else if (payload?.action == "update_message") {
				// console.log(payload)

				setChatSession((prev) => {
					if (!prev) return prev

					if (prev.id !== payload.session_id) return prev

					return {
						...prev,
						is_thinking: false,
						messages: [
							...prev.messages,
							{
								content: payload.message,
								role: "assistant",
								id: payload.message_id,
								session_id: prev.id,
								created_at: "",
							},
						],
					}
				})
			} else if (payload?.action == "update_thinking") {
				// console.log(payload)
				// console.log(chatbot.activeHistoryIdRef.current)

				if (chatbot.activeHistoryIdRef.current == payload?.session_id) {
					setThinkingText(payload?.text)
				}
			}
		} catch (error) {
			console.error("Invalid JSON payload:", event.data)
		}

	}

	return {
		isLoading,
		sendMessage,
		setIsLoading,
		textareaRef,
		value,
		setValue,
		isLoadingMessages,
		setIsLoadingMessages,
		chatSession,
		thinkingText,
		setThinkingText,
		bottomRef
	};
}

type HomePageStateType = ReturnType<typeof useHomePageState>

export const HomePageContext =
	createContext({} as HomePageStateType)

export function useHomePage() {
	const context = useContext(HomePageContext)
	if (!context)
		throw new Error(
			"useHomePage must be used inside HomePageProvider",
		)

	return context
}

export default function HomePageProvider({
	children,
}: {
	children: ReactNode
}) {
	return (
		<HomePageContext.Provider value={useHomePageState()}>
			{children}
		</HomePageContext.Provider>
	)
}