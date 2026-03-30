import { useGlobal } from "@/global-context/global"
import { ChevronLeft } from "lucide-react"
import SidebarContent from "./SidebarContent";

export default function Sidebar() {
	const { isSidebarOpen, setIsSidebarOpen } = useGlobal()

	return <div className={`
			${isSidebarOpen ? "w-72" : "w-16"}
			hidden relative md:flex flex-col min-h-screen
			bg-linear-to-b from-slate-950 to-slate-900
			border-r border-white/5
			transition-all duration-300 ease-in-out
			overflow-hidden
		`}>

		<button
			onClick={() => setIsSidebarOpen(!isSidebarOpen)}
			title={isSidebarOpen ? "Collapse" : "Expand"}
			className="cursor-pointer absolute top-4 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all duration-200"
		>
			<ChevronLeft
				className={`transition-transform duration-300 ${!isSidebarOpen ? "rotate-180" : "rotate-0"}`}
				size={14}
			/>
		</button>

		<SidebarContent />
	</div>
}