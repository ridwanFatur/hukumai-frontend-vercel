import DocumentSearchPageProvider from "./document-search-page-context";
import MobileMenuButton from "@/components/MobileMenuButton";

export default function DocumentSearchPage() {
	return (
		<DocumentSearchPageProvider>
			<_DocumentSearchPage />
		</DocumentSearchPageProvider>
	)
}

function _DocumentSearchPage() {
	return <div className="w-full h-full relative bg-linear-to-b from-slate-950 to-slate-900 border-l border-white/5 overflow-hidden flex items-center justify-center">
		<MobileMenuButton />

		<div className="text-white/70 text-lg md:text-2xl font-semibold">
			Coming Soon 🚧
		</div>
	</div>
}
