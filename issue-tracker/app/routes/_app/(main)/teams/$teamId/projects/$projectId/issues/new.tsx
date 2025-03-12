import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_app/(main)/teams/$teamId/projects/$projectId/issues/new",
)({
	component: () => {
		const { teamId, projectId } = Route.useParams();

		return (
			<div className="bg-white shadow overflow-hidden sm:rounded-lg">
				<div className="px-4 py-5 sm:px-6 flex justify-between items-center">
					<div>
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Create New Issue
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
				<div className="border-t border-gray-200 px-4 py-5 sm:p-6">
					<form className="space-y-6">
						<div>
							<label
								htmlFor="title"
								className="block text-sm font-medium text-gray-700"
							>
								Title
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="title"
									id="title"
									className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
									placeholder="Issue title"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="description"
								className="block text-sm font-medium text-gray-700"
							>
								Description
							</label>
							<div className="mt-1">
								<textarea
									id="description"
									name="description"
									rows={3}
									className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
									placeholder="Describe the issue in detail"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
							<div className="sm:col-span-3">
								<label
									htmlFor="priority"
									className="block text-sm font-medium text-gray-700"
								>
									Priority
								</label>
								<div className="mt-1">
									<select
										id="priority"
										name="priority"
										className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
									>
										<option>Low</option>
										<option>Medium</option>
										<option>High</option>
										<option>Critical</option>
									</select>
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="assignee"
									className="block text-sm font-medium text-gray-700"
								>
									Assignee
								</label>
								<div className="mt-1">
									<select
										id="assignee"
										name="assignee"
										className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
									>
										<option>Unassigned</option>
										<option>John Doe</option>
										<option>Jane Smith</option>
										<option>Bob Johnson</option>
									</select>
								</div>
							</div>
						</div>

						<div className="flex justify-end">
							<button
								type="button"
								className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Create Issue
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	},
});
