import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_app/(main)/teams/$teamId/projects/$projectId/",
)({
	component: ProjectOverview,
});

function ProjectOverview() {
	const { projectId } = Route.useParams();

	// Dummy project data - in a real app, this would come from an API call
	const project = {
		id: projectId,
		name: `Project ${projectId}`,
		description:
			"This is a comprehensive project management system that allows teams to collaborate effectively.",
		status: "In Progress",
		startDate: "2023-01-15",
		dueDate: "2023-06-30",
		completionPercentage: 65,
		priority: "High",
		budget: "$50,000",
		teamMembers: [
			{ id: "1", name: "John Doe", role: "Project Manager", avatar: "JD" },
			{ id: "2", name: "Jane Smith", role: "Developer", avatar: "JS" },
			{ id: "3", name: "Bob Johnson", role: "Designer", avatar: "BJ" },
			{ id: "4", name: "Alice Williams", role: "QA Engineer", avatar: "AW" },
		],
		recentActivities: [
			{
				id: "1",
				user: "John Doe",
				action: "updated the project description",
				time: "2 hours ago",
			},
			{
				id: "2",
				user: "Jane Smith",
				action: "completed task #45",
				time: "1 day ago",
			},
			{
				id: "3",
				user: "Bob Johnson",
				action: "uploaded new design files",
				time: "2 days ago",
			},
		],
		issuesSummary: {
			total: 24,
			open: 10,
			inProgress: 8,
			completed: 6,
		},
		milestones: [
			{
				id: "1",
				name: "Planning Phase",
				dueDate: "2023-02-15",
				status: "Completed",
			},
			{
				id: "2",
				name: "Development Phase",
				dueDate: "2023-05-01",
				status: "In Progress",
			},
			{
				id: "3",
				name: "Testing Phase",
				dueDate: "2023-06-15",
				status: "Not Started",
			},
		],
	};

	return (
		<div className="bg-white shadow sm:rounded-lg">
			{/* Project Header */}
			<div className="px-4 py-5 sm:px-6 border-b border-gray-200">
				<div className="flex justify-between items-center">
					<div>
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							{project.name}
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							{project.description}
						</p>
					</div>
					<div className="flex space-x-3">
						<Link
							to="/"
							className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Back to Team
						</Link>
						<button
							type="button"
							className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Edit Project
						</button>
					</div>
				</div>
			</div>

			{/* Project Overview Grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
				{/* Left Column - Project Details */}
				<div className="col-span-2 space-y-6">
					{/* Project Stats */}
					<div className="bg-gray-50 p-4 rounded-lg shadow-sm">
						<h4 className="text-base font-medium text-gray-900 mb-4">
							Project Statistics
						</h4>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<div className="bg-white p-3 rounded-md shadow-sm">
								<p className="text-sm text-gray-500">Status</p>
								<p className="text-lg font-medium text-gray-900">
									{project.status}
								</p>
							</div>
							<div className="bg-white p-3 rounded-md shadow-sm">
								<p className="text-sm text-gray-500">Priority</p>
								<p className="text-lg font-medium text-gray-900">
									{project.priority}
								</p>
							</div>
							<div className="bg-white p-3 rounded-md shadow-sm">
								<p className="text-sm text-gray-500">Completion</p>
								<p className="text-lg font-medium text-gray-900">
									{project.completionPercentage}%
								</p>
							</div>
							<div className="bg-white p-3 rounded-md shadow-sm">
								<p className="text-sm text-gray-500">Budget</p>
								<p className="text-lg font-medium text-gray-900">
									{project.budget}
								</p>
							</div>
						</div>
					</div>

					{/* Timeline */}
					<div className="bg-gray-50 p-4 rounded-lg shadow-sm">
						<div className="flex justify-between items-center mb-4">
							<h4 className="text-base font-medium text-gray-900">Timeline</h4>
							<span className="text-sm text-gray-500">
								{project.startDate} to {project.dueDate}
							</span>
						</div>
						<div className="space-y-4">
							{project.milestones.map((milestone) => (
								<div key={milestone.id} className="flex items-center">
									<div
										className={`h-4 w-4 rounded-full mr-2 ${
											milestone.status === "Completed"
												? "bg-green-500"
												: milestone.status === "In Progress"
													? "bg-yellow-500"
													: "bg-gray-300"
										}`}
									/>
									<div className="flex-1">
										<div className="flex justify-between">
											<p className="text-sm font-medium text-gray-900">
												{milestone.name}
											</p>
											<p className="text-sm text-gray-500">
												{milestone.dueDate}
											</p>
										</div>
										<p className="text-xs text-gray-500">{milestone.status}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Recent Activity */}
					<div className="bg-gray-50 p-4 rounded-lg shadow-sm">
						<h4 className="text-base font-medium text-gray-900 mb-4">
							Recent Activity
						</h4>
						<div className="space-y-3">
							{project.recentActivities.map((activity) => (
								<div key={activity.id} className="flex items-start">
									<div className="min-w-0 flex-1">
										<p className="text-sm text-gray-900">
											<span className="font-medium">{activity.user}</span>{" "}
											{activity.action}
										</p>
										<p className="text-xs text-gray-500">{activity.time}</p>
									</div>
								</div>
							))}
						</div>
						<div className="mt-4 text-center">
							<button
								type="button"
								className="text-sm text-indigo-600 hover:text-indigo-500"
							>
								View all activity
							</button>
						</div>
					</div>
				</div>

				{/* Right Column - Team & Issues */}
				<div className="space-y-6">
					{/* Team Members */}
					<div className="bg-gray-50 p-4 rounded-lg shadow-sm">
						<div className="flex justify-between items-center mb-4">
							<h4 className="text-base font-medium text-gray-900">
								Team Members
							</h4>
							<button
								type="button"
								className="text-sm text-indigo-600 hover:text-indigo-500"
							>
								Add Member
							</button>
						</div>
						<ul className="space-y-3">
							{project.teamMembers.map((member) => (
								<li key={member.id} className="flex items-center">
									<div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
										{member.avatar}
									</div>
									<div className="ml-3">
										<p className="text-sm font-medium text-gray-900">
											{member.name}
										</p>
										<p className="text-xs text-gray-500">{member.role}</p>
									</div>
								</li>
							))}
						</ul>
					</div>

					{/* Issues Summary */}
					<div className="bg-gray-50 p-4 rounded-lg shadow-sm">
						<div className="flex justify-between items-center mb-4">
							<h4 className="text-base font-medium text-gray-900">Issues</h4>
							<Link
								to="."
								className="text-sm text-indigo-600 hover:text-indigo-500"
							>
								View all
							</Link>
						</div>
						<div className="space-y-3">
							<div className="flex justify-between items-center">
								<span className="text-sm text-gray-500">Total Issues</span>
								<span className="text-sm font-medium text-gray-900">
									{project.issuesSummary.total}
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm text-gray-500">Open</span>
								<span className="text-sm font-medium text-gray-900">
									{project.issuesSummary.open}
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm text-gray-500">In Progress</span>
								<span className="text-sm font-medium text-gray-900">
									{project.issuesSummary.inProgress}
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm text-gray-500">Completed</span>
								<span className="text-sm font-medium text-gray-900">
									{project.issuesSummary.completed}
								</span>
							</div>
						</div>
						<div className="mt-4">
							<button
								type="button"
								className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Create New Issue
							</button>
						</div>
					</div>

					{/* Quick Links */}
					<div className="bg-gray-50 p-4 rounded-lg shadow-sm">
						<h4 className="text-base font-medium text-gray-900 mb-4">
							Quick Links
						</h4>
						<nav className="space-y-2">
							<Link
								to="."
								className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md"
							>
								Issues
							</Link>
							<Link
								to="."
								className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md"
							>
								Documents
							</Link>
							<Link
								to="."
								className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md"
							>
								Settings
							</Link>
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
}
