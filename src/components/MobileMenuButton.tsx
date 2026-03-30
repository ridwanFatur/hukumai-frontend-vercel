import { useGlobal } from "@/global-context/global";
import { MenuIcon } from "lucide-react";

export default function MobileMenuButton() {
	const { setIsMobileSidebarOpen } = useGlobal();
	return <button
		className="md:hidden text-slate-400 hover:text-white cursor-pointer transition-all duration-200 p-3 border mt-3 ml-3 w-fit border-white/10 hover:border-white/20 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm"
		onClick={() => setIsMobileSidebarOpen(true)}
	>
		<MenuIcon size={18} />
	</button>
}