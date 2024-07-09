import { SignIn } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function SingIn() {
	const { userId } = auth()

	if (userId) {
		redirect("/")
	}

	return (
		<div className="flex h-screen w-screen flex-center flex-1">
			<div className="relative flex flex-1 flex-col justify-center">
				<div className="mx-auto w-full lg:min-w-[400px] [&>div]:mx-auto">
					<SignIn />
				</div>
			</div>
		</div>
	)
}
