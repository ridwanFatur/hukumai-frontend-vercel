import { getUserTokenApi } from "@/api/user-api";
import { useGlobal } from "@/global-context/global";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react"

export function useProfilePageState() {
	const { user } = useGlobal()
	const [tokenInfo, setTokenInfo] = useState<{ total_tokens: number, updated_at?: string } | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		getUserTokenApi()
			.then(data => setTokenInfo(data))
			.finally(() => setLoading(false));
	}, []);

	return {
		loading,
		tokenInfo,
		user
	};
}

type ProfilePageStateType = ReturnType<typeof useProfilePageState>

export const ProfilePageContext =
	createContext({} as ProfilePageStateType)

export function useProfilePage() {
	const context = useContext(ProfilePageContext)
	if (!context)
		throw new Error(
			"useProfilePage must be used inside ProfilePageProvider",
		)

	return context
}

export default function ProfilePageProvider({
	children,
}: {
	children: ReactNode
}) {
	return (
		<ProfilePageContext.Provider value={useProfilePageState()}>
			{children}
		</ProfilePageContext.Provider>
	)
}