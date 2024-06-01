import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Button from "./Button"
import Topbar from "./Topbar"
import { Observable, ObservablePrimitive } from "@legendapp/state"
import { Links } from "./routes/HomeRoute"
import Icon from "./Icons"

export default function Page(props: {
	showView: ObservablePrimitive<"All" | "Links" | "Todos" | "Topics">
	links: Observable<Links[]>
}) {
	const [expandedLink, setExpandedLink] = useState<string | null>(null)

	return (
		<div className="w-full h-full border  border-white/10 rounded-[20px]">
			<Topbar showView={props.showView} />
			<div className=" px-5 w-full  col-gap-[4px]">
				{props.links.get().map((link, index) => {
					return (
						<div key={index}>
							<ProfileLink
								link={link}
								expandedLink={expandedLink}
								setExpandedLink={setExpandedLink}
							/>
						</div>
					)
				})}
			</div>
		</div>
	)
}

function ProfileLink(props: {
	link: Links
	expandedLink: string | null
	setExpandedLink: (title: string | null) => void
}) {
	const [hovered, setHovered] = useState(false)
	const handleAttachmentClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation()
	}

	const isExpanded = props.expandedLink === props.link.title

	return (
		<motion.div
			id="ProfileLink"
			onClick={() => {
				props.setExpandedLink(isExpanded ? null : props.link.title)
			}}
			className={`rounded-lg hover:bg-hoverDark bg-softDark p-2 pl-3 h-full transition-all ${
				isExpanded ? "h-full transition-all !bg-[#171A21]" : ""
			}`}
		>
			<div className="flex-between">
				<div className="flex gap-2 items-center">
					<div className="bg-softDark rounded-md flex-center w-[20px] h-[20px] text-softDark">
						.
					</div>
					<div>{props.link.title}</div>
				</div>
				<div className="flex gap-2">
					{hovered || isExpanded ? (
						<div className="flex-center gap-2">
							<motion.div
								animate={{
									transform: ["translateX(5px)", "translateX(0)"],
									opacity: [0, 0.6],
								}}
								transition={{ duration: 0.3 }}
								className="opacity-60 flex-center"
							>
								<button className="cursor:pointer">
									<Icon name="Heart" height="24" width="24" border="white" />
								</button>
							</motion.div>
							<Status />
						</div>
					) : null}

					<div className="px-[11px] h-[34px] flex-center rounded-[7px] bg-white bg-opacity-[0.04]">
						{props.link.title}
					</div>
				</div>
			</div>

			{isExpanded ? (
				<motion.div
					onClick={handleAttachmentClick}
					className="w-full h-[300px] flex flex-col justify-between"
				>
					<div className="pl-7 flex-col flex justify-between gap-2 p-2 text-[14px]">
						<div className="text-white/50 w-[700px]">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
							officia. Delectus in dolor quam praesentium laborum velit iusto
							aut saepe quibusdam, quia, nihil omnis odit dignissimos tenetur
							incidunt placeat fuga.
						</div>
						<div className="text-white/10">2024</div>
					</div>
					<div className="w-full flex-between border-t border-[#1f222b] pt-2">
						<div className="flex-row items-center">
							<button className="cursor:pointer">
								<Icon name="Note" height="24" width="24" border="white" />
							</button>
							<input
								type="text"
								placeholder="Take a note..."
								className="text-[14px] text-white/40 pl-2 border-none bg-inherit outline-none focus:outline-none focus:ring-0"
							/>
						</div>

						<div
							className="w-fit"
							onClick={() => {
								props.setExpandedLink(null)
							}}
						>
							<Button label="Done" onChange={() => {}} />
						</div>
					</div>
				</motion.div>
			) : null}
		</motion.div>
	)
}

function Status() {
	const [expanded, setExpanded] = useState(false)
	const [status, setStatus] = useState("Learning")
	const [expandTimer, setExpandTimer] = useState(false)
	return (
		<motion.div
			animate={{
				transform: ["translateX(5px)", "translateX(0)"],
				opacity: [0, 1],
			}}
			transition={{ duration: 0.5 }}
			className="relative"
			onMouseLeave={() => {
				setExpandTimer(true)
				setTimeout(() => {
					if (expandTimer) {
						setExpanded(false)
					}
				}, 500)
			}}
			onMouseEnter={() => {
				setExpandTimer(false)
			}}
		>
			<button
				onClick={() => {
					setExpanded(!expanded)
				}}
				className={`cursor-pointer text-[#D29752] h-[34px] pr-[4px] px-[11px] rounded-[7px] flex-center ${status === "To Learn" && "text-[#d26352]"} ${status === "Learned" && "text-[#52d274]"}`}
				style={{
					background:
						"linear-gradient(0deg, rgba(255, 167, 64, 0.02) 0%, rgba(255, 167, 64, 0.02) 100%), rgba(255, 255, 255, 0.02)",
				}}
			>
				{status}
				<Icon name="ArrowDown" />
			</button>
			<AnimatePresence>
				{expanded ? (
					<motion.div
						exit={{ opacity: 0, scale: 0.8 }}
						animate={{ scale: [0.8, 1.1, 1], opacity: [0, 1] }}
						transition={{ duration: 0.2, easing: "ease-in" }}
						className="absolute top-10 w-full min-w-fit left-0 bg-hoverDark p-1 rounded-[7px]"
						style={{
							border: "1px solid #1E1E1E",
							background: "rgba(55, 55, 55, 0.40)",
							backdropFilter: "blur(8.5px)",
						}}
					>
						<div
							onClick={() => {
								setStatus("Learning")
								setExpanded(false)
							}}
							className="rounded-[7px] h-[34px] px-[11px] flex-center hover:bg-softDarkText/10 text-white/60"
						>
							Learning
						</div>
						<div
							onClick={() => {
								setStatus("To Learn")
								setExpanded(false)
							}}
							className="rounded-[7px] h-[34px] px-[11px] flex-center hover:bg-softDarkText/10 text-white/60"
						>
							To Learn
						</div>
						<div
							onClick={() => {
								setStatus("Learned")
								setExpanded(false)
							}}
							className="rounded-[7px] h-[34px] px-[11px] flex-center hover:bg-softDarkText/10 text-white/60"
						>
							Learned
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</motion.div>
	)
}

{
	/* <div className="">
			<div className="flex-between h-[74px] p-[20px] pr-[25px]">
				{page ? (
					<motion.div
						initial={{ opacity: 0, x: 10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 1 }}
						className="text-[25px] font-bold"
					>
						{title}
					</motion.div>
				) : (
					<input
						type="text"
						placeholder="Title"
						className="placeholder-white/20 font-bold text-[25px] bg-transparent outline-none"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				)}
				<div className="flex gap-[20px] flex-center">
					<div>vis</div>
					<div>...</div>
				</div>
			</div>
		</div> */
}
