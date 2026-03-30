import { useEffect } from "react";
import { ArrowUpIcon, Loader2 } from "lucide-react";
import { useHomePage } from "../home-page-context";

export default function ChatInput() {
	const {
		sendMessage,
		isLoading,
		isLoadingMessages,
		textareaRef,
		value,
		setValue,
		chatSession
	} = useHomePage();

	useEffect(() => {
		const el = textareaRef.current;
		if (!el) return;
		el.style.height = "auto";
		el.style.height = Math.min(el.scrollHeight, 180) + "px";
	}, [value]);

	const canSend = value.trim().length > 0 && !isLoading && !isLoadingMessages
		&& (chatSession == undefined || !chatSession.is_thinking);

	const handleSend = () => {
		if (!canSend) return

		const trimmed = value.trim();
		if (!trimmed || isLoading) return;
		sendMessage(trimmed);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<div className="max-w-2xl mx-auto w-full">
			<div className="relative flex items-end gap-2 bg-white/5 border border-white/10 hover:border-white/20 focus-within:border-violet-500/40 focus-within:bg-white/10 rounded-2xl px-4 py-3 transition-all duration-200 shadow-black/20 shadow-lg">
				<textarea
					ref={textareaRef}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Message..."
					rows={1}
					className="flex-1 bg-transparent text-white/85 placeholder:text-white/25 text-sm resize-none outline-none leading-relaxed max-h-45 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent py-0.5"
					disabled={isLoading}
				/>

				{isLoading ? (
					<button
						disabled
						className="shrink-0 w-8 h-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white/40 cursor-not-allowed"
					>
						<Loader2 size={15} className="animate-spin" />
					</button>
				) : (
					<button
						onClick={handleSend}
						disabled={!canSend}
						className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer border
              ${canSend
								? "bg-violet-600 hover:bg-violet-500 border-violet-500/50 text-white shadow-lg shadow-violet-900/30"
								: "bg-white/5 border-white/10 text-white/30 cursor-not-allowed"
							}`}
					>
						<ArrowUpIcon size={15} strokeWidth={2.5} />
					</button>
				)}
			</div>

			<p className="text-center text-white/15 text-[10px] mt-2 tracking-wide">
				Press <span className="font-medium text-white/25">Enter</span> to send &nbsp;·&nbsp;{" "}
				<span className="font-medium text-white/25">Shift+Enter</span> for new line
			</p>
		</div>
	);
}