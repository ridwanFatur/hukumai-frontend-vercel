import { type LucideIcon } from "lucide-react"
interface MenuButtonProps {
	text?: string;
	Icon?: LucideIcon;
	className?: string;
	isSidebarOpen?: boolean;
	onClick?: () => void;
	size?: number;
}

export default function MenuButton({
	text,
	Icon,
	className = "bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-violet-900/30",
	isSidebarOpen = true,
	onClick,
	size = 20,
}: MenuButtonProps) {
	return (
		<button
			title={isSidebarOpen ? undefined : text}
			onClick={onClick}
			className={`
        cursor-pointer flex items-center justify-center gap-2
        ${isSidebarOpen ? "w-full py-2 px-3.5" : "w-9 h-9"}
        rounded-xl
        text-white text-xs font-semibold
        shadow-md
        transition-all duration-200 active:scale-95
				${className} 
      `}
		>
			{Icon && <Icon size={size} />}
			{isSidebarOpen && text && (
				<span className="overflow-hidden text-ellipsis whitespace-nowrap">
					{text}
				</span>
			)}
		</button>
	);
}
