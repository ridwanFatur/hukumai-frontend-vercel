import {
	createContext,
	useContext,
	type ReactNode,
} from "react"
import { useChatbotState } from "./contexts/chat-bot"
import { useDocumentSearchState } from "./contexts/document-search"

export function useMainLayoutState() {
	const chatbot = useChatbotState()
	const documentSearch = useDocumentSearchState()

	return {
		chatbot,
		documentSearch,
	}
}

type MainLayoutStateType = ReturnType<typeof useMainLayoutState>

export const MainLayoutContext =
	createContext({} as MainLayoutStateType)

export function useMainLayout() {
	const context = useContext(MainLayoutContext)
	if (!context)
		throw new Error(
			"useMainLayout must be used inside MainLayoutProvider",
		)

	return context
}

export default function MainLayoutProvider({
	children,
}: {
	children: ReactNode
}) {
	return (
		<MainLayoutContext.Provider value={useMainLayoutState()}>
			{children}
		</MainLayoutContext.Provider>
	)
}