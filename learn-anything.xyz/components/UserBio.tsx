export default function UserBio(props: {
	bio: string
	updateBio: (bio: string) => void
}) {
	return (
		<>
			<h1>User bio: {props.bio}</h1>
			<input
				style={{ color: "black" }}
				type="text"
				placeholder="Change bio"
				onKeyDown={async (e) => {
					if (e.key === "Enter") {
						const updatedBio = (e.target as HTMLInputElement).value
						props.updateBio(updatedBio)
					}
				}}
			/>
		</>
	)
}
