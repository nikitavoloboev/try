import * as React from "react"
import { Link, Outlet, createLazyRoute } from "@tanstack/react-router"

export const Route = createLazyRoute("/posts")({
	component: PostsComponent
})

function PostsComponent() {
	const posts = Route.useLoaderData()

	return (
		<div className="flex gap-2 p-2">
			<ul className="list-disc pl-4">
				{[...posts, { id: "i-do-not-exist", title: "Non-existent Post" }].map(post => {
					return (
						<li key={post.id} className="whitespace-nowrap">
							<Link
								to="/posts/$postId"
								params={{
									postId: post.id
								}}
								className="block px-2 py-1 text-blue-600 hover:opacity-75"
								activeProps={{ className: "font-bold underline" }}
							>
								<div>{post.title.substring(0, 20)}</div>
							</Link>
						</li>
					)
				})}
			</ul>
			<Outlet />
		</div>
	)
}
