import {
	createContext,
	useContext,
	type ReactNode,
} from "react"

export function useDocumentSearchPageState() {
	return {}
}

type DocumentSearchPageStateType = ReturnType<typeof useDocumentSearchPageState>

export const DocumentSearchPageContext =
	createContext({} as DocumentSearchPageStateType)

export function useDocumentSearchPage() {
	const context = useContext(DocumentSearchPageContext)
	if (!context)
		throw new Error(
			"useDocumentSearchPage must be used inside DocumentSearchPageProvider",
		)

	return context
}

export default function DocumentSearchPageProvider({
	children,
}: {
	children: ReactNode
}) {
	return (
		<DocumentSearchPageContext.Provider value={useDocumentSearchPageState()}>
			{children}
		</DocumentSearchPageContext.Provider>
	)
}