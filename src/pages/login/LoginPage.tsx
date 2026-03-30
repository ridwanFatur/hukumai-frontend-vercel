import { APP_NAME } from "@/utils/string-constants";
import GoogleSignInButton from "@/components/GoogleSignInButton";

export default function LoginPage() {
	return (
		<div
			className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-6 relative overflow-hidden"
			style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
		>
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-85 bg-indigo-600/15 rounded-full blur-[120px]" />
				<div className="absolute bottom-0 left-0 w-95 h-65 bg-violet-700/10 rounded-full blur-[100px]" />
				<div className="absolute bottom-1/4 right-0 w-65 h-50 bg-blue-500/8 rounded-full blur-[90px]" />

				<div
					className="absolute inset-0 opacity-[0.035]"
					style={{
						backgroundImage:
							"radial-gradient(circle, #a5b4fc 1px, transparent 1px)",
						backgroundSize: "32px 32px",
					}}
				/>
			</div>

			<div className="relative w-full max-w-md flex flex-col items-center gap-6">

				<div className="flex items-center gap-2">
					<span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold tracking-widest uppercase">
						{APP_NAME}
					</span>
				</div>

				<div className="w-full rounded-2xl border border-white/[0.07] bg-white/3 backdrop-blur-2xl p-8 shadow-2xl shadow-black/60 flex flex-col gap-6">

					<div className="text-center">
						<h1 className="text-white text-2xl font-semibold tracking-tight">
							Welcome to Hukum AI
						</h1>
						<p className="text-gray-400 text-sm mt-2 leading-relaxed">
							Ask questions about Indonesian law with AI assistance
						</p>
					</div>

					<div className="grid grid-cols-2 gap-2">
						{[
							{ icon: "⚖️", label: "AI Legal Chatbot" },
							{ icon: "📚", label: "Trusted Databases" },
							{ icon: "⚡", label: "Fast Answers" },
							{ icon: "🔒", label: "Secure & Private" },
						].map(({ icon, label }) => (
							<div
								key={label}
								className="flex items-center gap-2 rounded-xl bg-white/4 border border-white/6 px-3 py-2.5 text-xs text-gray-300"
							>
								<span className="text-base leading-none">{icon}</span>
								<span>{label}</span>
							</div>
						))}
					</div>

					<div className="relative flex items-center gap-3">
						<div className="flex-1 h-px bg-white/10" />
						<span className="text-gray-600 text-xs">Sign In to Continue</span>
						<div className="flex-1 h-px bg-white/10" />
					</div>

					<GoogleSignInButton />
				</div>

				<p className="text-gray-600 text-xs text-center">
					© {new Date().getFullYear()} {APP_NAME}. All rights reserved.
				</p>
			</div>
		</div>
	);
}