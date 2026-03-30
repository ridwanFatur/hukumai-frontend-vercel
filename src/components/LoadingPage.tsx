import { APP_NAME } from "@/utils/string-constants";

export default function LoadingPage() {
	return (
		<div className="h-dvh flex items-center justify-center bg-[#080b14] relative overflow-hidden">

			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-1/5 left-1/2 -translate-x-1/2 w-150 h-100 bg-indigo-500/10 rounded-full blur-[120px]" />
				<div className="absolute bottom-1/4 left-1/5 w-64 h-64 bg-violet-500/8 rounded-full blur-[100px]" />
				<div className="absolute top-2/3 right-1/4 w-48 h-48 bg-blue-500/6 rounded-full blur-[90px]" />
			</div>

			<div
				className="absolute inset-0 pointer-events-none opacity-100"
				style={{
					backgroundImage: `
            linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)
          `,
					backgroundSize: "48px 48px",
					maskImage:
						"radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, transparent 75%)",
				}}
			/>

			<div
				className="absolute inset-0 pointer-events-none opacity-[0.025]"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
					backgroundSize: "200px 200px",
				}}
			/>

			<div className="relative flex flex-col items-center gap-7">
				<div className="relative w-20 h-20">
					<div className="absolute inset-0 rounded-full border border-indigo-500/15 animate-pulse" />
					<div className="absolute -inset-1.5 rounded-full border border-indigo-500/7 animate-pulse [animation-direction:reverse]" />
					<div
						className="absolute inset-0 rounded-full animate-spin"
						style={{
							border: "2px solid transparent",
							borderTopColor: "#818cf8",
							borderRightColor: "rgba(129,140,248,0.3)",
							animationDuration: "1.1s",
							animationTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
							boxShadow:
								"0 0 18px rgba(99,102,241,0.35), inset 0 0 8px rgba(99,102,241,0.05)",
						}}
					/>
					<div
						className="absolute inset-2.5 rounded-full animate-spin"
						style={{
							border: "1.5px solid transparent",
							borderBottomColor: "rgba(167,139,250,0.6)",
							animationDuration: "0.8s",
							animationDirection: "reverse",
							animationTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
						}}
					/>
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse [box-shadow:0_0_10px_rgba(129,140,248,0.8)]" />
				</div>

				<div className="flex flex-col items-center gap-2">
					<p
						className="text-[0.8rem] font-bold tracking-[0.2em] uppercase text-indigo-200/80"
					>
						{APP_NAME}
					</p>
					<div className="w-16 h-px bg-linear-to-r from-transparent via-indigo-500/30 to-transparent" />
				</div>
			</div>
		</div>
	);
}