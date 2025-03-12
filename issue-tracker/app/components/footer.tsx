import { Link } from "@tanstack/react-router";

export function Footer() {
	return (
		<footer className="border-t py-2 text-center text-sm text-muted-foreground w-full">
			<div className="flex items-center justify-between px-4 md:px-6">
				<p>Issue Tracker v1.0.0</p>
				<div className="flex gap-4">
					<Link to="/" className="hover:underline">
						Support
					</Link>
					<Link to="/" className="hover:underline">
						Documentation
					</Link>
					<Link to="/" className="hover:underline">
						Privacy
					</Link>
				</div>
			</div>
		</footer>
	);
}
