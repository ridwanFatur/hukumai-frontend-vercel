import { LogOut } from "lucide-react";

type LogoutDialogProps = {
	isOpen: boolean;
	onCancel: () => void;
	onLogout: () => void;
};

export default function LogoutDialog({
	isOpen,
	onCancel,
	onLogout,
}: LogoutDialogProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div
				className="absolute inset-0 bg-black/70 backdrop-blur-md"
				onClick={onCancel}
			/>

			<div className="relative w-[90%] max-w-md rounded-2xl p-6 border border-white/10 bg-zinc-900/90 shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
				<div className="absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-white/20 to-transparent rounded-full" />

				<div className="mb-4 flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-white">
					<LogOut size={20} />
				</div>

				<h2 className="text-lg font-semibold mb-1 text-zinc-100 tracking-tight">
					Logout
				</h2>

				<p className="mb-6 text-sm text-zinc-400 leading-relaxed">
					Are you sure you want to logout from this account?
				</p>

				<div className="h-px w-full mb-5 bg-white/6" />

				<div className="flex justify-end gap-2">
					<button
						onClick={onCancel}
						className="cursor-pointer px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 bg-white/5 border border-white/[0.07] hover:bg-white/10 hover:text-zinc-200 transition-all duration-150"
					>
						Cancel
					</button>

					<button
						onClick={onLogout}
						className="cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold bg-red-500/90 hover:bg-red-500 text-white shadow-[0_0_16px_rgba(239,68,68,0.25)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-150"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
}