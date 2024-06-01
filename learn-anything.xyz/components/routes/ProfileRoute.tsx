"use client"
import { observer, useObservable } from "@legendapp/state/react"
import { PiPictureInPictureThin } from "react-icons/pi"
import { icons } from "../Icons"

interface Props {}
export default observer(function ProfileRoute(props: Props) {
	const local = useObservable({
		prettyName: "Nikita",
		username: "nikita",
		profileLink: "https://nikiv.dev",
		topicsLearning: 64,
		topicsToLearn: 124,
		topicsLearned: 12,
		pages: [
			{ title: "physics", prettyName: "Physics", pageUrl: "hi" },
			{ title: "karabiner", prettyName: "Karabiner", pageUrl: "hi" },
		],
		publicPages: [
			{
				title: "Figma",
			},
			{
				title: "Ableton 12",
			},
		],
		personalLinks: Array(20).fill({
			title: "Modern JavaScript Tutorial",
			url: "https://javascript.info",
			topic: "JavaScript",
		}),
	})

	return (
		<div className="px-6 text-white bg-[#0f0f0f]">
			<div className="space-y-1 overflow-y-auto max-h-[calc(100vh)] scroll-hide">
				{local.personalLinks.map((link, index) => (
					<div
						key={index}
						className="flex items-center justify-between p-4 rounded-xl hover:cursor-pointer bg-[#121212]"
					>
						<div className="flex space-x-5 items-center">
							<PiPictureInPictureThin />
							<a className="text-white">{link.title.toString()}</a>
						</div>
						<div
							className="mr-1 text-zinc-600 hover:cursor-pointer"
							onClick={() => window.open(link.url.get(), "_blank")}
						>
							<icons.Link />
						</div>
					</div>
				))}
			</div>
		</div>
	)
})
