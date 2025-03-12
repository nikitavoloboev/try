import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/(main)/teams/$teamId/")({
	component: () => {
		const { teamId } = Route.useParams();

		// Dummy team data
		const team = {
			id: teamId,
			name: `Team ${teamId}`,
			description:
				"This is a team description that provides more details about the team and its purpose.",
			members: [
				{
					id: "1",
					name: "John Doe",
					role: "Team Lead",
					email: "john@example.com",
				},
				{
					id: "2",
					name: "Jane Smith",
					role: "Developer",
					email: "jane@example.com",
				},
				{
					id: "3",
					name: "Bob Johnson",
					role: "Designer",
					email: "bob@example.com",
				},
			],
			projects: [
				{ id: "1", name: "Website Redesign", status: "In Progress" },
				{ id: "2", name: "Mobile App", status: "Planning" },
				{ id: "3", name: "API Integration", status: "Completed" },
			],
		};

		return (
			<div className="bg-white shadow overflow-hidden sm:rounded-lg">
				<div className="px-4 py-5 sm:px-6">
					<h3 className="text-lg leading-6 font-medium text-gray-900">
						{team.name}
					</h3>
					<p className="mt-1 max-w-2xl text-sm text-gray-500">
						{team.description}
					</p>
				</div>

				<div className="border-t border-gray-200 px-4 py-5 sm:px-6">
					<h3 className="text-lg leading-6 font-medium text-gray-900">
						Team Members
					</h3>
					<div className="mt-4">
						<ul className="divide-y divide-gray-200">
							{team.members.map((member) => (
								<li key={member.id} className="py-4 flex">
									<div className="ml-3">
										<p className="text-sm font-medium text-gray-900">
											{member.name}
										</p>
										<p className="text-sm text-gray-500">{member.role}</p>
										<p className="text-sm text-gray-500">{member.email}</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="border-t border-gray-200 px-4 py-5 sm:px-6">
					<div className="flex justify-between items-center">
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Projects
						</h3>
						<Link
							to="/teams/$teamId/projects"
							params={{ teamId }}
							className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
						>
							View all projects
						</Link>
					</div>
					<div className="mt-4">
						<ul className="divide-y divide-gray-200">
							{team.projects.map((project) => (
								<li key={project.id} className="py-4">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm font-medium text-gray-900">
												{project.name}
											</p>
											<p className="text-sm text-gray-500">
												Status: {project.status}
											</p>
										</div>
										<Link
											to="/teams/$teamId/projects/$projectId"
											params={{ teamId, projectId: project.id }}
											className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
										>
											View project
										</Link>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		);
	},
});
