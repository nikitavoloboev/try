import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/(main)/teams/$teamId/projects/")({
	component: () => {
		const { teamId } = Route.useParams();

		// Dummy projects data
		const projects = [
			{
				id: "1",
				name: "Website Redesign",
				description: "Redesign the company website with a modern look and feel",
				status: "In Progress",
				issueCount: 8,
			},
			{
				id: "2",
				name: "Mobile App",
				description: "Develop a mobile app for iOS and Android",
				status: "Planning",
				issueCount: 5,
			},
			{
				id: "3",
				name: "API Integration",
				description: "Integrate with third-party APIs for payment processing",
				status: "Completed",
				issueCount: 12,
			},
			{
				id: "4",
				name: "Database Migration",
				description: "Migrate from MySQL to PostgreSQL",
				status: "Not Started",
				issueCount: 3,
			},
			{
				id: "5",
				name: "Security Audit",
				description: "Perform a security audit of the application",
				status: "In Progress",
				issueCount: 7,
			},
		];

		return (
			<div className="bg-white shadow overflow-hidden sm:rounded-lg">
				<div className="px-4 py-5 sm:px-6 flex justify-between items-center">
					<div>
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Projects for Team {teamId}
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							A list of all projects for this team
						</p>
					</div>
					<div>
						<Link
							to="/teams/$teamId"
							params={{ teamId }}
							className="mr-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
						>
							Back to Team
						</Link>
						<button
							type="button"
							className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Add Project
						</button>
					</div>
				</div>
				<div className="border-t border-gray-200">
					<ul className="divide-y divide-gray-200">
						{projects.map((project) => (
							<li key={project.id}>
								<div className="px-4 py-4 sm:px-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm font-medium text-indigo-600">
												{project.name}
											</p>
											<p className="mt-1 text-sm text-gray-500">
												{project.description}
											</p>
										</div>
										<div className="ml-2 flex-shrink-0 flex">
											<p
												className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
													project.status === "Completed"
														? "bg-green-100 text-green-800"
														: project.status === "In Progress"
															? "bg-yellow-100 text-yellow-800"
															: project.status === "Planning"
																? "bg-blue-100 text-blue-800"
																: "bg-gray-100 text-gray-800"
												}`}
											>
												{project.status}
											</p>
										</div>
									</div>
									<div className="mt-2 sm:flex sm:justify-between">
										<div className="sm:flex">
											<p className="flex items-center text-sm text-gray-500">
												{project.issueCount} issues
											</p>
										</div>
										<div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
											<Link
												to="/teams/$teamId/projects/$projectId/issues"
												params={{ teamId, projectId: project.id }}
												className="text-indigo-600 hover:text-indigo-500"
											>
												View issues
											</Link>
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	},
});
