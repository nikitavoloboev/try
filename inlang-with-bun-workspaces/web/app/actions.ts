"use server"

import { currentUser } from "@clerk/nextjs/server"
import { get } from "ronin"
import { createServerActionProcedure } from "zsa"

const authedProcedure = createServerActionProcedure().handler(async () => {
	try {
		const clerkUser = await currentUser()
		const roninUser = await get.user.with({ email: clerkUser?.primaryEmailAddress?.emailAddress })
		return { clerkUser, roninUser }
	} catch {
		throw new Error("User not authenticated")
	}
})
