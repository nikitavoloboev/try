import { useState } from "react"
import { Issue } from "./schema"
import { IssueComponent } from "./components/Issue.tsx"
import { useAccount, useCoState } from "./main.tsx"
import { ID, Group } from "jazz-tools"

export default function App() {
	const { me } = useAccount()
	const [issueID, setIssueID] = useState<ID<Issue> | undefined>(
		(window.location.search?.replace("?issue=", "") || undefined) as
			| ID<Issue>
			| undefined
	)

	const issue = useCoState(Issue, issueID)

	const createIssue = () => {
		const group = Group.create({ owner: me })
		group.addMember("everyone", "writer")

		const newIssue = Issue.create(
			{
				title: "Buy terrarium",
				description: "Make sure it's big enough for 10 snails.",
				estimate: 5,
				status: "backlog",
			},
			{ owner: group }
		)
		setIssueID(newIssue.id)
		window.history.pushState({}, "", `?issue=${newIssue.id}`)
	}

	if (issue) {
		return (
			<>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<IssueComponent issue={issue} />
					<button
						onClick={createIssue}
						style={{
							marginTop: "20px",
							padding: "10px 20px",
							fontSize: "16px",
						}}
					>
						Create Issue
					</button>
				</div>
			</>
		)
	} else {
		return <button onClick={createIssue}>Create Issue</button>
	}
}
