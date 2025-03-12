import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_app/(main)/teams/$teamId/projects/$projectId/issues/",
)({
	component: () => {
		const { teamId, projectId } = Route.useParams();

		// Dummy issues data
		const issues = [
			{
				id: "1",
				title: "Fix login bug",
				description: "Users are unable to log in using social accounts",
				status: "Open",
				priority: "High",
				assignee: "John Doe",
			},
			{
				id: "2",
				title: "Improve loading performance",
				description: "The dashboard takes too long to load",
				status: "In Progress",
				priority: "Medium",
				assignee: "Jane Smith",
			},
			{
				id: "3",
				title: "Add dark mode",
				description: "Implement dark mode for better user experience",
				status: "Open",
				priority: "Low",
				assignee: "Unassigned",
			},
			{
				id: "4",
				title: "Update documentation",
				description: "Update API documentation with new endpoints",
				status: "Closed",
				priority: "Medium",
				assignee: "Bob Johnson",
			},
			{
				id: "5",
				title: "Fix mobile layout",
				description: "The layout is broken on mobile devices",
				status: "Open",
				priority: "High",
				assignee: "Jane Smith",
			},
		];

		return (
			<div className="bg-white shadow overflow-hidden sm:rounded-lg">
				<div className="px-4 py-5 sm:px-6 flex justify-between items-center">
					<div>
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Issues for Project {projectId}
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							Team {teamId}
						</p>
					</div>
					<div>
						<Link
							to="/teams/$teamId/projects"
							params={{ teamId }}
							className="mr-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
						>
							Back to Projects
						</Link>
						<Link
							to="/teams/$teamId/projects/$projectId/issues/new"
							params={{ teamId, projectId }}
							className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							New Issue
						</Link>
					</div>
				</div>
				<div className="border-t border-gray-200">
					<ul className="divide-y divide-gray-200">
						{issues.map((issue) => (
							<li key={issue.id}>
								<Link
									to="/teams/$teamId/projects/$projectId/issues/$issueId"
									params={{ teamId, projectId, issueId: issue.id }}
									className="block hover:bg-gray-50"
								>
									<div className="px-4 py-4 sm:px-6">
										<div className="flex items-center justify-between">
											<p className="text-sm font-medium text-indigo-600 truncate">
												{issue.title}
											</p>
											<div className="ml-2 flex-shrink-0 flex">
												<p
													className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
														issue.status === "Closed"
															? "bg-green-100 text-green-800"
															: issue.status === "In Progress"
																? "bg-yellow-100 text-yellow-800"
																: "bg-red-100 text-red-800"
													}`}
												>
													{issue.status}
												</p>
											</div>
										</div>
										<div className="mt-2 sm:flex sm:justify-between">
											<div className="sm:flex">
												<p className="flex items-center text-sm text-gray-500">
													{issue.description}
												</p>
											</div>
											<div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
												<p className="text-sm text-gray-500">
													{issue.assignee} · {issue.priority} Priority
												</p>
											</div>
										</div>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	},
});
