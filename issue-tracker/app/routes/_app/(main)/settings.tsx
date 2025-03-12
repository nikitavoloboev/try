import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/(main)/settings")({
	component: () => {
		return (
			<div className="bg-white shadow overflow-hidden sm:rounded-lg">
				<div className="px-4 py-5 sm:px-6">
					<h3 className="text-lg leading-6 font-medium text-gray-900">
						Settings
					</h3>
					<p className="mt-1 max-w-2xl text-sm text-gray-500">
						Manage your account settings
					</p>
				</div>
				<div className="border-t border-gray-200">
					<div className="px-4 py-5 sm:p-6">
						<div className="space-y-6">
							<div>
								<h3 className="text-lg leading-6 font-medium text-gray-900">
									Profile
								</h3>
								<p className="mt-1 text-sm text-gray-500">
									Update your personal information and how others see you on the
									platform.
								</p>
							</div>
							<div className="mt-6">
								<div className="flex items-start">
									<div className="flex-shrink-0">
										<input
											id="notifications"
											name="notifications"
											type="checkbox"
											className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
										/>
									</div>
									<div className="ml-3">
										<label
											htmlFor="notifications"
											className="text-sm font-medium text-gray-700"
										>
											Email notifications
										</label>
										<p className="text-sm text-gray-500">
											Receive email notifications for important updates.
										</p>
									</div>
								</div>
							</div>
							<div className="mt-6">
								<div className="flex items-start">
									<div className="flex-shrink-0">
										<input
											id="marketing"
											name="marketing"
											type="checkbox"
											className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
										/>
									</div>
									<div className="ml-3">
										<label
											htmlFor="marketing"
											className="text-sm font-medium text-gray-700"
										>
											Marketing emails
										</label>
										<p className="text-sm text-gray-500">
											Receive marketing and promotional emails.
										</p>
									</div>
								</div>
							</div>
							<div className="mt-6">
								<button
									type="button"
									className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Save changes
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
});
