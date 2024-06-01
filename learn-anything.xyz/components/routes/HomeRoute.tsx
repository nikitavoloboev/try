"use client"
import { observer, useObservable } from "@legendapp/state/react"
import { useState } from "react"
import Icon from "../Icons"
import Page from "../Page"
import Sidebar from "../Sidebar"

interface Props {}
export type Links = {
	title: string
	description: string
	note: string
	status: String
	topic: String
	date: string
	date_added: String
}
export type Page = {
	title: string
	prettyName: string
	pageUrl: string
	content?: string
}
export default observer(function HomeRoute(props: Props) {
	const local = useObservable({
		pages: [
			{
				title: "physics",
				prettyName: "Physics",
				pageUrl: "hi",
				content: "I hate Physics!",
			},
			{
				title: "karabiner",
				prettyName: "Karabiner",
				pageUrl: "hi",
				content: "???",
			},
		],
		showView: "All" as "All" | "Links" | "Todos" | "Topics",
		personalLinks: [
			{
				// use `title` as id for now
				title: "Modern JavaScript Tutorial",
				url: "https://javascript.info",
				description: "Teaches you JS in modern way",
				note: "loved it",
				status: "Learning",
				topic: "JavaScript",
				date: "2023",
				dateAdded: "March 20, 2024",
			},
			{
				title: "Modern Rust Tutorial",
				url: "https://doc.rust-lang.org/rust-by-example/",
				description: "Teaches you Rust in modern way",
				note: "was ok",
				status: "Learned",
				topic: "Rust",
				date: "2024",
				dateAdded: "April 20, 2024",
			},
		],
		// by title
		likedPersonalLinks: ["Modern JavaScript Tutorial"],
	})
	const [showPlusbar, setShowPlusBar] = useState(false)
	return (
		<div className="flex h-screen max-w-screen w-screen overflow-hidden text-white">
			<Sidebar personalPages={local.pages.get()} />
			<div className="p-2 w-full">
				<Page showView={local.showView} links={local.personalLinks} />
			</div>
			<div
				onClick={() => {
					setShowPlusBar(!showPlusbar)
				}}
				className="absolute bottom-5 w-[50px] h-[50px] flex-center z-60 rounded-full transition-all bg-blue-500 right-5"
			>
				<Icon name="Plus" />

				{showPlusbar ? (
					<div className="absolute bottom-1 right-1 bg-blue-600 z-50 w-[200px] h-[400px] rounded-[11px]"></div>
				) : null}
			</div>
		</div>
	)
})
