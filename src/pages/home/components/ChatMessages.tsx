import type { ChatMessage } from "@/models/ChatMessage";
import { useHomePage } from "../home-page-context";
import { useEffect } from "react";

export default function ChatMessages() {
	const { isLoadingMessages, chatSession, thinkingText, bottomRef } = useHomePage();

	if (isLoadingMessages) {
		return (
			<div className="flex-1 flex items-center justify-center text-white/60">
				Loading messages...
			</div>
		);
	}

	useEffect(() => {
		if (chatSession && bottomRef.current) {
			bottomRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [chatSession?.messages]);

	return (
		<div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent px-4 pt-16 md:pt-6 pb-2">
			<div className="max-w-2xl mx-auto flex flex-col gap-6">
				{chatSession?.messages.map((msg) => (
					<ChatBubble key={msg.id} message={msg} />
				))}
				{chatSession?.is_thinking && <TypingIndicator text={thinkingText} />}
				<div ref={bottomRef} />
			</div>
		</div>
	);
}

function ChatBubble({ message }: { message: ChatMessage }) {
	const isUser = message.role === "user";

	if (isUser) {
		return (
			<div className="flex justify-end">
				<div className="max-w-[75%] px-4 py-3 rounded-2xl rounded-br-sm bg-violet-600/80 border border-violet-500/30 text-white/90 text-sm leading-relaxed shadow-lg shadow-violet-900/20 wrap-break-word">
					{message.content}
				</div>
			</div>
		);
	}

	return (
		<div className="flex gap-3 items-start">
			<div className="shrink-0 mt-0.5">
				<div className="w-7 h-7 rounded-lg bg-linear-to-br from-violet-500/40 to-indigo-600/40 border border-violet-500/20 flex items-center justify-center">
					<svg width="14" height="14" viewBox="0 0 28 28" fill="none">
						<path
							d="M14 4C14 4 6 9 6 15C6 19.4183 9.58172 23 14 23C18.4183 23 22 19.4183 22 15C22 9 14 4 14 4Z"
							fill="url(#grad2)"
						/>
						<defs>
							<linearGradient id="grad2" x1="6" y1="4" x2="22" y2="23" gradientUnits="userSpaceOnUse">
								<stop stopColor="#a78bfa" />
								<stop offset="1" stopColor="#6366f1" />
							</linearGradient>
						</defs>
					</svg>
				</div>
			</div>

			<div className="flex-1 min-w-0">
				<p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap wrap-break-word bg-white/5 border border-white/10 rounded-xl px-3 py-2 shadow-sm shadow-black/20">
					{message.content}
				</p>
			</div>
		</div>
	);
}

function TypingIndicator({ text }: { text?: string }) {
	return (
		<div className="flex gap-3 items-start">
			<div className="shrink-0 mt-0.5">
				<div className="w-7 h-7 rounded-lg bg-linear-to-br from-violet-500/40 to-indigo-600/40 border border-violet-500/20 flex items-center justify-center">
					<svg width="14" height="14" viewBox="0 0 28 28" fill="none">
						<path
							d="M14 4C14 4 6 9 6 15C6 19.4183 9.58172 23 14 23C18.4183 23 22 19.4183 22 15C22 9 14 4 14 4Z"
							fill="url(#grad3)"
						/>
						<defs>
							<linearGradient id="grad3" x1="6" y1="4" x2="22" y2="23" gradientUnits="userSpaceOnUse">
								<stop stopColor="#a78bfa" />
								<stop offset="1" stopColor="#6366f1" />
							</linearGradient>
						</defs>
					</svg>
				</div>
			</div>

			<div className="flex flex-col gap-1">
				<div className="flex items-center gap-1.5 h-7">
					{[0, 1, 2].map((i) => (
						<span
							key={i}
							className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce"
							style={{
								animationDelay: `${i * 0.15}s`,
								animationDuration: "0.9s",
							}}
						/>
					))}
				</div>

				{text && (
					<span className="text-xs text-white/40">
						{text}
					</span>
				)}
			</div>
		</div>
	);
}