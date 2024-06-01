"use client"
import { useObservable } from "@legendapp/state/react"
import ProfileRoute from "@/components/routes/ProfileRoute"
import Topbar from "@/components/Topbar"
import Sidebar from "@/components/Sidebar"

export default function Profile() {
	const showView = useObservable<"All" | "Links" | "Todos" | "Topics">("All")

	return (
		<div className="flex flex-col h-screen py-3">
			<div className="flex flex-1">
				<div className="w-1/5 mr-2">
					<Sidebar personalPages={[]} />
				</div>
				<div className="flex-1 flex flex-col border border-neutral-800 rounded-3xl">
					<Topbar showView={showView} />
					<ProfileRoute />
				</div>
			</div>
		</div>
	)
}
