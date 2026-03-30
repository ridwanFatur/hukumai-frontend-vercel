import { useGlobal } from "@/global-context/global";
import { Bot, Search, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface TabsMenuProps {
	alwaysOpen?: boolean;
}

interface TabItem {
	name: string;
	path: string;
	Icon: any;
	title?: string;
	span?: number; // optional: untuk full width
}

const TABS: TabItem[] = [
	{ name: "Chat", path: "/", Icon: Bot, title: "Chatbot" },
	{ name: "Search", path: "/search", Icon: Search, title: "Search" },
	{ name: "Profile", path: "/profile", Icon: User, span: 2 },
];

export default function TabsMenu({ alwaysOpen = false }: TabsMenuProps) {
	const { isSidebarOpen } = useGlobal();
	const location = useLocation();
	const navigate = useNavigate();

	const open = alwaysOpen || isSidebarOpen;
	const COLS = 2;

	return (
		<>
			{open ? (
				<div
					className="grid bg-white/5 rounded-xl p-1 gap-1"
					style={{
						gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
					}}
				>
					{TABS.map((tab) => {
						const isActive = location.pathname === tab.path;
						const Icon = tab.Icon;

						return (
							<button
								key={tab.name}
								onClick={() => navigate(tab.path)}
								className={`
									cursor-pointer flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200
									${tab.span ? `col-span-${tab.span}` : ""}
									${isActive
										? "bg-violet-600/30 text-violet-300 ring-1 ring-violet-500/30"
										: "text-slate-500 hover:text-slate-300"
									}
								`}
							>
								<Icon className="w-4 h-4" />
								{tab.name}
							</button>
						);
					})}
				</div>
			) : (
				<div className="flex flex-col items-center gap-1 w-full px-2">
					{TABS.map((tab) => {
						const isActive = location.pathname === tab.path;
						const Icon = tab.Icon;

						return (
							<button
								key={tab.name}
								title={tab.title ?? tab.name}
								onClick={() => navigate(tab.path)}
								className={`
									cursor-pointer w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200
									${isActive
										? "bg-violet-600/25 text-violet-400"
										: "text-slate-500 hover:text-slate-300 hover:bg-white/5"
									}
								`}
							>
								<Icon size={20} />
							</button>
						);
					})}
				</div>
			)}
		</>
	);
}