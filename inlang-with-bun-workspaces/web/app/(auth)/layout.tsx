export default function AuthLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<header className="absolute inset-x-0 top-0 z-50">
				<nav className="flex h-16 items-center justify-between px-6 lg:px-8" aria-label="Global">
					<div className="flex lg:flex-1"></div>
				</nav>
			</header>

			<main className="h-full">{children}</main>
		</>
	)
}
