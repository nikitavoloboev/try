// currently running commands inside assumes that user is already created through edgedb auth
// TODO: create it from seed.ts too

const userId = process.env.USER_ID!

async function seed() {
	checkThatNotRunningInProduction()
	const args = Bun.argv
	const command = args[2]
	try {
		switch (command) {
			case undefined:
				console.log("No command provided")
				break
			default:
				console.log("Unknown command")
				break
		}
		console.log("done")
	} catch (err) {
		console.error("Error occurred:", err)
	}
}

function checkThatNotRunningInProduction() {
	if (process.env.EDGEDB_INSTANCE === "nikitavoloboev/learn-anything") {
		throw new Error(
			"Connected to production DB, don't run these seed commands on it",
		)
	}
}

// TODO: fix
// @ts-ignore
await seed()
