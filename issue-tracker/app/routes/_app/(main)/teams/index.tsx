import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/(main)/teams/")({
	component: () => {
		// Dummy team data
		const teams = [
			{ id: "1", name: "Engineering", memberCount: 12 },
			{ id: "2", name: "Design", memberCount: 8 },
			{ id: "3", name: "Marketing", memberCount: 5 },
			{ id: "4", name: "Product", memberCount: 7 },
		];

		return (
			<div className="bg-white shadow overflow-hidden sm:rounded-lg">
				<div className="px-4 py-5 sm:px-6 flex justify-between items-center">
					<div>
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Teams
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							A list of all the teams in your organization
						</p>
					</div>
					<button
						type="button"
						className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Add Team
					</button>
				</div>
				<div className="border-t border-gray-200">
					<ul className="divide-y divide-gray-200">
						{teams.map((team) => (
							<li key={team.id}>
								<Link
									to="/teams/$teamId"
									params={{ teamId: team.id }}
									className="block hover:bg-gray-50"
								>
									<div className="px-4 py-4 sm:px-6">
										<div className="flex items-center justify-between">
											<p className="text-sm font-medium text-indigo-600 truncate">
												{team.name}
											</p>
											<div className="ml-2 flex-shrink-0 flex">
												<p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
													{team.memberCount} members
												</p>
											</div>
										</div>
										<div className="mt-2 sm:flex sm:justify-between">
											<div className="sm:flex">
												<p className="flex items-center text-sm text-gray-500">
													View team details
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
