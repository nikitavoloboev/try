"use client"
import { observer, useObservable } from "@legendapp/state/react"

interface Props {}
export default observer(function EditProfileRoute(props: Props) {
	const local = useObservable({
		prettyName: "",
		username: "",
		profileLink: "https://nikiv.dev",
	})
	return (
		<>
			<div className="text-white">edit profile</div>
		</>
	)
})
