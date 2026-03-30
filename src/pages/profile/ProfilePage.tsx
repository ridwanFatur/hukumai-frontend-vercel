import MobileMenuButton from "@/components/MobileMenuButton";
import ProfilePageProvider, { useProfilePage } from "./profile-page-context";

export default function ProfilePage() {
	return (
		<ProfilePageProvider>
			<_ProfilePage />
		</ProfilePageProvider>
	)
}

function _ProfilePage() {
	const { loading, tokenInfo, user } = useProfilePage();

	return (
		<div className="w-full h-full relative flex flex-col bg-linear-to-b from-slate-950 to-slate-900 border-l border-white/5 overflow-hidden">
			<MobileMenuButton />

			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute -top-20 left-1/2 -translate-x-1/2 w-100 h-75 bg-indigo-600/10 rounded-full blur-[100px]" />
				<div className="absolute -bottom-15 -right-10 w-70 h-50 bg-cyan-500/8 rounded-full blur-[80px]" />
			</div>

			{loading ? (
				<div className="flex flex-col items-center justify-center h-full gap-4">
					<div className="relative w-14 h-14">
						<div className="absolute inset-0 rounded-full border-2 border-white/10" />
						<div className="absolute inset-0 rounded-full border-2 border-t-indigo-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
						<div className="absolute inset-1.5 rounded-full border-2 border-t-transparent border-r-cyan-400/60 border-b-transparent border-l-transparent animate-spin [animation-direction:reverse] [animation-duration:0.8s]" />
					</div>
					<p className="text-white/40 text-sm tracking-widest uppercase font-light">
						Loading profile
					</p>
				</div>
			) : (
				<div className="relative z-10 flex flex-col h-full p-6 gap-6">
					<div className="flex items-center gap-3 pb-6 border-b border-white/5">
						<div className="relative shrink-0">
							<div className="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
								<span className="text-white font-semibold text-lg leading-none">
									{user?.email?.[0]?.toUpperCase() ?? "?"}
								</span>
							</div>
							<div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950 shadow-sm shadow-emerald-400/50" />
						</div>
						<div className="min-w-0">
							<p className="text-white/90 font-medium text-sm truncate">
								{user?.email ?? "—"}
							</p>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-3">
						<div className="group relative rounded-2xl bg-white/3 border border-white/[0.07] p-4 overflow-hidden transition-all duration-300 hover:bg-white/6 hover:border-white/10">
							<div className="absolute inset-0 bg-linear-to-r from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

							<div className="relative flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
										<svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
											<path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
										</svg>
									</div>
									<div>
										<p className="text-white/35 text-xs tracking-wider uppercase mb-0.5">Total Tokens</p>
										<p className="text-white font-semibold text-xl tabular-nums leading-tight">
											{(tokenInfo?.total_tokens ?? 0).toLocaleString()}
										</p>
									</div>
								</div>
								<div className="shrink-0 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
									<span className="text-indigo-300 text-xs font-medium">tokens</span>
								</div>
							</div>
						</div>

						<div className="group relative rounded-2xl bg-white/3 border border-white/[0.07] p-4 overflow-hidden transition-all duration-300 hover:bg-white/6 hover:border-white/10">
							<div className="absolute inset-0 bg-linear-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

							<div className="relative flex items-center gap-3">
								<div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
									<svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
										<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<div className="min-w-0">
									<p className="text-white/35 text-xs tracking-wider uppercase mb-0.5">Last Updated</p>
									<p className="text-white/80 font-medium text-sm truncate">
										{tokenInfo?.updated_at
											? new Date(tokenInfo.updated_at).toLocaleString("id-ID", {
												day: "2-digit",
												month: "short",
												year: "numeric",
												hour: "2-digit",
												minute: "2-digit",
											})
											: "—"}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
