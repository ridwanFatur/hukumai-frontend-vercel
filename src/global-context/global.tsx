import { getUserApi } from "@/api/user-api";
import type { User } from "@/models/User";
import { getCookie, removeCookie } from "@/utils/cookie-helper";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export function useGlobalState() {
	const [isAppLoaded, setIsAppLoaded] = useState(false);
	const [user, setUser] = useState<User>()
	const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)
	const [isLogoutOpen, setIsLogoutOpen] = useState(false);


	async function checkAuth() {
		const token = getCookie("token");
		if (!token) {
			setIsAppLoaded(true)
			return;
		}

		try {
			const result = await getUserApi()
			setUser(result.user)
			setIsAppLoaded(true)
			return
		} catch (e) {
			setUser(undefined)
			setIsAppLoaded(true)
			removeCookie("token")
		}
	}

	useEffect(() => {
		checkAuth();
	}, [])

	function openLogoutDialog() {
		setIsLogoutOpen(true)
	}

	function handleLogout() {
		setUser(undefined)
		removeCookie("token")
	}

	return {
		isAppLoaded,
		setIsAppLoaded,
		user,
		setUser,
		isMobileSidebarOpen,
		setIsMobileSidebarOpen,
		openLogoutDialog,
		isLogoutOpen,
		setIsLogoutOpen,
		handleLogout,
		isSidebarOpen,
		setIsSidebarOpen,

	}
}

type GlobalStateType = ReturnType<typeof useGlobalState>

export const GlobalContext: React.Context<GlobalStateType> = createContext(
	{} as GlobalStateType,
)

export function useGlobal() {
	const context = useContext(GlobalContext)
	if (!context) throw new Error('useGlobal must be used inside GlobalProvider')

	return context
}

export default function GlobalProvider({ children }: { children: ReactNode }) {
	return <GlobalContext.Provider value={useGlobalState()}>{children}</GlobalContext.Provider>
}

