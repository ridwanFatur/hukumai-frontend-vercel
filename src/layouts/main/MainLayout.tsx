import { Outlet } from "react-router-dom";
import { useGlobal } from "@/global-context/global";
import LogoutDialog from "@/components/LogoutDialog";
import Sidebar from "./components/Sidebar";
import MobileSidebar from "./components/MobileSidebar";
import MainLayoutProvider from "./main-layout-context";

export default function MainLayout() {
	return (
		<MainLayoutProvider>
			<_MainLayout />
		</MainLayoutProvider>
	)
}

function _MainLayout() {
	const { isLogoutOpen, setIsLogoutOpen, handleLogout } = useGlobal();

	return (
		<>
			<div className="h-dvh w-full flex flex-col">
				<div className="flex-1 w-full flex min-h-0">
					<Sidebar />
					<MobileSidebar />
					<div className="flex-1">
						<Outlet />
					</div>
				</div>
			</div>
			<LogoutDialog
				isOpen={isLogoutOpen}
				onCancel={() => setIsLogoutOpen(false)}
				onLogout={handleLogout}
			/>
		</>
	)
}

