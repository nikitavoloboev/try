import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import Nav from "@/components/Nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "X"
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<ClerkProvider
				appearance={{
					variables: {
						colorPrimary: "rgb(200, 47, 30)",
						colorBackground: "#101010",
						colorText: "white"
					}
				}}
			>
				<body className={inter.className}>
					<Nav />
					{children}
				</body>
			</ClerkProvider>
		</html>
	)
}
