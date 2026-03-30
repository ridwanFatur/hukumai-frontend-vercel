import { Info, Check, X, AlertTriangle } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react"

type ToastVariant = "default" | "success" | "error" | "warning" | "info";

interface Toast {
	id: string;
	title?: string;
	message: string;
	variant: ToastVariant;
	duration: number;
	createdAt: number;
}

interface ToastOptions {
	title?: string;
	message: string;
	variant?: ToastVariant;
	duration?: number;
}
const variantConfig: Record<
	ToastVariant,
	{ icon: ReactNode; accent: string; iconBg: string; bar: string; label: string }
> = {
	default: {
		icon: <Info size={20} />,
		accent: "border-violet-500/30",
		iconBg: "bg-violet-500/20 text-violet-300",
		bar: "bg-violet-500",
		label: "Notice",
	},
	success: {
		icon: <Check size={20} />,
		accent: "border-emerald-500/30",
		iconBg: "bg-emerald-500/20 text-emerald-300",
		bar: "bg-emerald-500",
		label: "Success",
	},
	error: {
		icon: <X size={20} />,
		accent: "border-rose-500/30",
		iconBg: "bg-rose-500/20 text-rose-300",
		bar: "bg-rose-500",
		label: "Error",
	},
	warning: {
		icon: <AlertTriangle size={20} />,
		accent: "border-amber-500/30",
		iconBg: "bg-amber-500/20 text-amber-300",
		bar: "bg-amber-500",
		label: "Warning",
	},
	info: {
		icon: <Info size={20} />,
		accent: "border-sky-500/30",
		iconBg: "bg-sky-500/20 text-sky-300",
		bar: "bg-sky-500",
		label: "Info",
	},
};

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
	const [visible, setVisible] = useState(false);
	const [leaving, setLeaving] = useState(false);
	const [progress, setProgress] = useState(100);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const pausedRef = useRef(false);
	const remainingRef = useRef(toast.duration);
	const startRef = useRef<number>(Date.now());

	const cfg = variantConfig[toast.variant];

	const startProgress = useCallback(() => {
		const tick = 50;
		startRef.current = Date.now();
		intervalRef.current = setInterval(() => {
			if (pausedRef.current) return;
			remainingRef.current -= tick;
			const pct = (remainingRef.current / toast.duration) * 100;
			setProgress(Math.max(0, pct));
			if (remainingRef.current <= 0) {
				clearInterval(intervalRef.current!);
				handleDismiss();
			}
		}, tick);
	}, [toast.duration]);

	useEffect(() => {
		requestAnimationFrame(() => setVisible(true));
		startProgress();
		return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
	}, []);

	const handleDismiss = useCallback(() => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		setLeaving(true);
		setTimeout(() => onDismiss(toast.id), 320);
	}, [toast.id, onDismiss]);

	const pause = () => { pausedRef.current = true; };
	const resume = () => { pausedRef.current = false; };

	return (
		<div
			onMouseEnter={pause}
			onMouseLeave={resume}
			className={[
				"relative w-80 rounded-xl overflow-hidden cursor-default select-none",
				"border backdrop-blur-sm",
				cfg.accent,
				"transition-all duration-300 ease-out",
				visible && !leaving
					? "opacity-100 translate-x-0 scale-100"
					: leaving
						? "opacity-0 translate-x-8 scale-95"
						: "opacity-0 translate-x-8 scale-95",
			].join(" ")}
			style={{
				background: "linear-gradient(135deg, rgba(30,20,60,0.97) 0%, rgba(20,12,50,0.99) 100%)",
				boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.1) inset",
			}}
		>
			{/* Subtle top shimmer */}
			<div
				className="absolute top-0 left-0 right-0 h-px"
				style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)" }}
			/>

			<div className="flex items-start gap-3 p-4 pb-5">
				{/* Icon */}
				<div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5 ${cfg.iconBg}`}>
					{cfg.icon}
				</div>

				{/* Content */}
				<div className="flex-1 min-w-0 pt-0.5">
					{toast.title ? (
						<>
							<p className="text-sm font-semibold text-violet-100 leading-snug truncate">{toast.title}</p>
							<p className="text-xs text-violet-300/70 leading-relaxed mt-0.5">{toast.message}</p>
						</>
					) : (
						<p className="text-sm text-violet-100/90 leading-relaxed">{toast.message}</p>
					)}
				</div>

				{/* Close button */}
				<button
					onClick={handleDismiss}
					className="cursor-pointer shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-violet-400/60 hover:text-violet-200 hover:bg-violet-500/20 transition-all duration-150 mt-0.5"
				>
					<X size={15} />
				</button>
			</div>

			{/* Progress bar */}
			<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-950/60">
				<div
					className={`h-full ${cfg.bar} transition-none`}
					style={{ width: `${progress}%`, transition: "width 50ms linear" }}
				/>
			</div>
		</div>
	);
}

function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
	if (toasts.length === 0) return null;

	return (
		<div className="fixed top-6 right-6 z-50 flex flex-col-reverse gap-2 pointer-events-none">
			{toasts.map((t) => (
				<div key={t.id} className="pointer-events-auto">
					<ToastItem toast={t} onDismiss={onDismiss} />
				</div>
			))}
		</div>
	);
}

export function useToastState() {
	const [toasts, setToasts] = useState<Toast[]>([]);
	const toast = useCallback((options: ToastOptions): string => {
		const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
		const newToast: Toast = {
			id,
			title: options.title,
			message: options.message,
			variant: options.variant ?? "default",
			duration: options.duration ?? 4000,
			createdAt: Date.now(),
		};
		setToasts((prev) => [...prev.slice(-4), newToast]); // max 5 visible
		return id;
	}, []);

	const dismiss = useCallback((id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}, []);

	const dismissAll = useCallback(() => setToasts([]), []);

	return {
		toasts,
		setToasts,
		toast,
		dismiss,
		dismissAll
	}
}

type ToastStateType = ReturnType<typeof useToastState>

export const ToastContext: React.Context<ToastStateType> = createContext(
	{} as ToastStateType,
)

export function useToast() {
	const context = useContext(ToastContext)
	if (!context) throw new Error('useToast must be used inside ToastProvider')

	return context
}

export default function ToastProvider({ children }: { children: ReactNode }) {
	const state = useToastState()
	return <ToastContext.Provider value={state}>
		{children}
		<ToastContainer toasts={state.toasts} onDismiss={state.dismiss} />
	</ToastContext.Provider>
}

