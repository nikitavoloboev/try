import { Issue } from "../schema"

export function IssueComponent({ issue }: { issue: Issue }) {
	return (
		<div className="grid grid-cols-6 text-sm border-r border-b [&>*]:p-2 [&>*]:border-l [&>*]:border-t">
			<input
				type="text"
				value={issue.title}
				onChange={(event) => {
					issue.title = event.target.value
				}}
			/>
			<textarea
				className="col-span-3"
				value={issue.description}
				onChange={(event) => {
					issue.description = event.target.value
				}}
			/>
			<label className="flex">
				Estimate:
				<input
					type="number"
					className="text-right min-w-0"
					value={issue.estimate}
					onChange={(event) => {
						issue.estimate = Number(event.target.value)
					}}
				/>
			</label>
			<select
				value={issue.status}
				onChange={(event) => {
					issue.status = event.target.value as
						| "backlog"
						| "in progress"
						| "done"
				}}
			>
				<option value="backlog">Backlog</option>
				<option value="in progress">In Progress</option>
				<option value="done">Done</option>
			</select>
		</div>
	)
}
