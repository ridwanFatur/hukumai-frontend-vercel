export default function DocumentSearchContent({ alwaysOpen = false }: { alwaysOpen: boolean }) {

	return <>
		<div className="flex-1 overflow-y-auto">
			{alwaysOpen && <div></div>}
		</div>
	</>
}