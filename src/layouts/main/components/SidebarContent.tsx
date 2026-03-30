import { useGlobal } from "@/global-context/global"
import { LogOut } from "lucide-react"
import MenuButton from "./MenuButton";
import TabsMenu from "./TabsMenu";
import ChatbotContent from "./ChatbotContent";
import { useLocation } from "react-router-dom";
import DocumentSearchContent from "./DocumentSearchContent";

interface SidebarContentProps {
	alwaysOpen?: boolean;
}

export default function SidebarContent({ alwaysOpen = false }: SidebarContentProps) {
	const { isSidebarOpen, setIsLogoutOpen } = useGlobal()
	const open = alwaysOpen ? true : isSidebarOpen;
	const location = useLocation();

	let defaultContent = <div className="flex-1"></div>

	if (location.pathname == "/") {
		defaultContent = <ChatbotContent alwaysOpen={alwaysOpen} />
	} else {
		defaultContent = <DocumentSearchContent alwaysOpen={alwaysOpen} />
	}

	return <>
		<div className={`flex flex-col gap-3 mt-10 mb-2 ${open ? "px-3.5 pt-4" : "px-0 pt-4 items-center"}`}>
			<TabsMenu alwaysOpen={alwaysOpen} />
		</div>

		{defaultContent}

		<div className={`flex flex-col mb-2 pt-2 ${open ? "px-3.5" : "px-0 items-center"}`}>
			<MenuButton
				text="Logout"
				Icon={LogOut}
				isSidebarOpen={open}
				onClick={() => setIsLogoutOpen(true)}
				className="bg-red-500/90 hover:bg-red-500 shadow-red-900/30"
			/>
		</div>
	</>
}