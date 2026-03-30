import { useGlobal } from "@/global-context/global";
import { X } from "lucide-react";
import SidebarContent from "./SidebarContent";

export default function MobileSidebar() {
	const { isMobileSidebarOpen, setIsMobileSidebarOpen } = useGlobal();

	return (
		<div
			className={`fixed inset-0 z-50 flex md:hidden transition-opacity duration-300 ${isMobileSidebarOpen
				? "opacity-100 pointer-events-auto"
				: "opacity-0 pointer-events-none"
				}`}
		>
			<div
				className={`w-72 h-full bg-linear-to-b from-slate-950 to-slate-900
			border-r border-white/5 flex flex-col shadow-xl transform transition-transform duration-300 ease-in-out 
					${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
					}`}
			>
				<button
					onClick={() => setIsMobileSidebarOpen(false)}
					className="cursor-pointer absolute top-4 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all duration-200"
				>
					<X size={20} />
				</button>

				<SidebarContent alwaysOpen={true} />
			</div>

			<div
				className="flex-1 transition-opacity duration-300 bg-black/30"
				onClick={() => setIsMobileSidebarOpen(false)}
			/>
		</div>
	);
}