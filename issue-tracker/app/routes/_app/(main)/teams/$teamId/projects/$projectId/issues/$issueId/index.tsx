import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_app/(main)/teams/$teamId/projects/$projectId/issues/$issueId/",
)({
	component: () => {
		const { teamId, projectId, issueId } = Route.useParams();

		// Dummy issue data
		const issue = {
			id: issueId,
			title: "Fix login bug",
			description:
				"Users are unable to log in using social accounts. This is causing a significant drop in user engagement. We need to fix this as soon as possible.",
			status: "Open",
			priority: "High",
			assignee: "John Doe",
			createdAt: "2023-06-15",
			updatedAt: "2023-06-18",
			comments: [
				{
					id: "1",
					author: "Jane Smith",
					content: "I think this is related to the recent API changes.",
					createdAt: "2023-06-16",
				},
				{
					id: "2",
					author: "John Doe",
					content: "I'll look into it today.",
					createdAt: "2023-06-17",
				},
				{
					id: "3",
					author: "Bob Johnson",
					content: "Let me know if you need any help with this.",
					createdAt: "2023-06-18",
				},
			],
		};

		return (
			<div className="bg-white shadow overflow-hidden sm:rounded-lg">
				<div className="px-4 py-5 sm:px-6 flex justify-between items-center">
					<div>
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Issue #{issueId}: {issue.title}
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							Project {projectId} · Team {teamId}
						</p>
					</div>
					<div>
						<Link
							to="/teams/$teamId/projects/$projectId/issues"
							params={{ teamId, projectId }}
							className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
						>
							Back to Issues
						</Link>
					</div>
				</div>

				<div className="border-t border-gray-200">
					<dl>
						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Status</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								<span
									className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
										issue.status === "Closed"
											? "bg-green-100 text-green-800"
											: issue.status === "In Progress"
												? "bg-yellow-100 text-yellow-800"
												: "bg-red-100 text-red-800"
									}`}
								>
									{issue.status}
								</span>
							</dd>
						</div>
						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Priority</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{issue.priority}
							</dd>
						</div>
						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Assignee</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{issue.assignee}
							</dd>
						</div>
						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Created</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{issue.createdAt}
							</dd>
						</div>
						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">
								Last Updated
							</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{issue.updatedAt}
							</dd>
						</div>
						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Description</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{issue.description}
							</dd>
						</div>
					</dl>
				</div>

				<div className="border-t border-gray-200 px-4 py-5 sm:px-6">
					<h3 className="text-lg leading-6 font-medium text-gray-900">
						Comments
					</h3>
					<div className="mt-6 flow-root">
						<ul className="-mb-8">
							{issue.comments.map((comment, commentIdx) => (
								<li key={comment.id}>
									<div className="relative pb-8">
										{commentIdx !== issue.comments.length - 1 ? (
											<span
												className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
												aria-hidden="true"
											/>
										) : null}
										<div className="relative flex items-start space-x-3">
											<div className="min-w-0 flex-1">
												<div>
													<div className="text-sm">
														<span className="font-medium text-gray-900">
															{comment.author}
														</span>
													</div>
													<p className="mt-0.5 text-sm text-gray-500">
														{comment.createdAt}
													</p>
												</div>
												<div className="mt-2 text-sm text-gray-700">
													<p>{comment.content}</p>
												</div>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
					<div className="mt-6">
						<div className="flex space-x-3">
							<div className="min-w-0 flex-1">
								<form action="#">
									<div>
										<label htmlFor="comment" className="sr-only">
											Comment
										</label>
										<textarea
											id="comment"
											name="comment"
											rows={3}
											className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
											placeholder="Add a comment"
											defaultValue={""}
										/>
									</div>
									<div className="mt-3 flex items-center justify-end">
										<button
											type="submit"
											className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										>
											Comment
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
});
