"use client"
import { useState } from "react"
import Icons from "./Icons"
import { AnimatePresence, motion } from "framer-motion"
import Icon from "./Icons"
import { ObservablePrimitive } from "@legendapp/state"

export default function Topbar(props: {
	showView: ObservablePrimitive<"All" | "Links" | "Todos" | "Topics">
}) {
	return (
		<div className="flex-between px-5 pt-5 mb-5">
			<div className="flex [&>*]:h-full bg-hoverDark rounded-[7px] text-white/60 [&>*]:flex-center h-[34px] items-center">
				<button
					className={`px-[11px] ${props.showView.get() === "All" ? "button" : ""}`}
					onClick={() => {
						props.showView.set("All")
					}}
				>
					All
				</button>
				<button
					className={`px-[11px] ${props.showView.get() === "Links" ? "button bg-red-500" : ""}`}
					onClick={() => {
						props.showView.set("Links")
						//shits not working why tf
					}}
				>
					Links
				</button>
				<button
					className={`px-[11px] ${props.showView.get() === "Todos" ? "button" : ""}`}
					onClick={() => {
						props.showView.set("Todos")
					}}
				>
					Todos
				</button>
				<button
					className={`px-[11px] ${props.showView.get() === "Topics" ? "button" : ""}`}
					onClick={() => {
						props.showView.set("Topics")
					}}
				>
					Topics
				</button>
			</div>
			<div className="flex gap-2">
				<Filter />
				<LinkOrder />
			</div>
		</div>
	)
}

function Filter(props: { filter?: string[] }) {
	const [filters, setFilters] = useState(["Liked", "Topic"])
	const [appliedFilters, setAppliedFilters] = useState<string[]>([])
	const [expanded, setExpanded] = useState(false)
	const [expandTimer, setExpandTimer] = useState(false)

	return (
		<div
			className="flex gap-2 w-fit"
			onMouseLeave={() => {
				//this is trash gotta be a better way to do this
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
			<div className="relative">
				<div
					style={{
						border: "1px dashed rgba(255, 255, 255, 0.10)",
						background: "rgba(255, 255, 255, 0.02)",
					}}
					className="h-[34px] px-[11px] pl-[9px] rounded-[7px] shrink-0 flex-center dark:text-white/50"
					onClick={() => {
						setExpanded(!expanded)
					}}
				>
					<Icons name="Plus" />
					Filter
				</div>

				<AnimatePresence>
					{expanded ? (
						<motion.div
							exit={{ opacity: 0, scale: 0.8 }}
							animate={{ scale: [0.8, 1.04, 1], opacity: [0, 1] }}
							transition={{ duration: 0.22, easing: "ease-out" }}
							className="absolute top-10 w-full min-w-fit left-0 bg-hoverDark p-1 rounded-[7px]"
							style={{
								border: "1px solid #1E1E1E",
								background: "rgba(55, 55, 55, 0.40)",
								backdropFilter: "blur(8.5px)",
							}}
						>
							{filters.map((filter: string, index: number) => {
								return (
									<div
										key={index}
										onClick={() => {
											if (!appliedFilters.includes(filter)) {
												setAppliedFilters([filter, ...appliedFilters])
											}
											setExpanded(false)
										}}
										className="rounded-[7px] h-[34px] px-[11px] flex-center hover:bg-softDarkText/10 text-white/60"
									>
										{filter}
									</div>
								)
							})}
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>

			{appliedFilters.map((filter, index) => {
				return (
					<div
						key={index}
						className="bg-hoverDark rounded-[7px]  px-[11px] flex-center text-white/60"
					>
						{filter}
					</div>
				)
			})}
		</div>
	)
}

export function LinkOrder(props: { filterOrder?: "Custom" | "RecentlyAdded" }) {
	const [expanded, setExpanded] = useState(false)
	const [filterOrder, setFilterOrder] = useState("Recently Added")
	const [expandTimer, setExpandTimer] = useState(false)
	return (
		<div
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
			<div
				onClick={() => {
					setExpanded(!expanded)
				}}
				className="button px-[11px] pr-[4px] text-white/60 h-[34px] flex-center gap-1"
			>
				{filterOrder}
				<Icon name="ArrowDown" />
			</div>
			<AnimatePresence>
				{expanded ? (
					<motion.div
						exit={{ opacity: 0, scale: 0.8 }}
						animate={{ scale: [0.8, 1.04, 1], opacity: [0, 1] }}
						transition={{ duration: 0.22, easing: "ease-out" }}
						className="absolute top-10 inline-flex right-0 bg-hoverDark p-1 flex-col gap-[2px] min-w-fit rounded-[7px]"
						style={{
							border: "1px solid #1E1E1E",
							background: "rgba(55, 55, 55, 0.40)",
							backdropFilter: "blur(8.5px)",
						}}
					>
						<div
							onClick={() => {
								setFilterOrder("Custom")
								setExpanded(false)
							}}
							className="rounded-[7px] h-[34px] cursor-pointer px-[11px] flex items-center hover:bg-softDarkText/10 text-white/60"
						>
							Custom
						</div>
						<div
							onClick={() => {
								setFilterOrder("Recently Added")
								setExpanded(false)
							}}
							className="rounded-[7px] h-[34px] cursor-pointer whitespace-nowrap px-[11px] flex items-center hover:bg-softDarkText/10 text-white/60"
						>
							Recently Added
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	)
}
