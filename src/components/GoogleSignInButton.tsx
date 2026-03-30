import { getGoogleConfigApi } from "@/api/auth-api";
import GoogleIcon from "@/icons/GoogleIcon";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export default function GoogleSignInButton() {
	const navigate = useNavigate();

	async function redirectToGoogleAuth() {
		try {
			const result = await getGoogleConfigApi();
			const clientId = result.client_id;
			const redirectUri = `${window.location.origin}/auth/google/callback`;
			const scope = "openid email profile";

			const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
			url.searchParams.set("client_id", clientId);
			url.searchParams.set("redirect_uri", redirectUri);
			url.searchParams.set("response_type", "code");
			url.searchParams.set("scope", scope);
			url.searchParams.set("access_type", "offline");
			url.searchParams.set("prompt", "consent");
			window.location.href = url.toString();
		} catch (e) {
			navigate("/");
		}
	}

	return (
		<button
			onClick={redirectToGoogleAuth}
			className={clsx(
				"w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl text-sm font-medium",
				"bg-[#1c1c24] text-gray-100",
				"border border-white/10",
				"shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_2px_8px_rgba(0,0,0,0.5)]",
				"hover:bg-[#22222e] hover:border-white/15 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_16px_rgba(0,0,0,0.6)]",
				"active:scale-[0.98] active:bg-[#18181f]",
				"transition-all duration-150 ease-in-out cursor-pointer"
			)}
		>
			<GoogleIcon />
			Continue with Google
		</button>
	);
}