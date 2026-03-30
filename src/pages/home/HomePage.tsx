import HomePageProvider from "./home-page-context"
import EmptyState from "./components/EmptyState";
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import { useMainLayout } from "@/layouts/main/main-layout-context";
import MobileMenuButton from "@/components/MobileMenuButton";

export default function HomePage() {
	return (
		<HomePageProvider>
			<_HomePage />
		</HomePageProvider>
	)
}
function _HomePage() {
	const { chatbot } = useMainLayout()

	return (
		<div className="w-full h-full relative flex flex-col bg-linear-to-b from-slate-950 to-slate-900 border-l border-white/5 overflow-hidden">
			<MobileMenuButton />

			<div className="flex-1 flex flex-col min-h-0">
				{!chatbot.activeHistoryId ? (
					<EmptyState />
				) : (
					<ChatMessages />
				)}
			</div>

			<div className="shrink-0 px-4 pb-4 pt-2 border-t border-white/10">
				<ChatInput />
			</div>
		</div>
	);
}
