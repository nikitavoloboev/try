"use client"
import { observer, useObservable } from "@legendapp/state/react"
import {
	EditorProvider,
	FloatingMenu,
	BubbleMenu,
	useEditor,
	EditorContent,
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { useEffect } from "react"
import { LinkOrder } from "../Topbar"
import Sidebar from "../Sidebar"

interface Props {}
export default observer(function EditorRoute(props: Props) {
	const local = useObservable({
		pageContent: {
			title: "cursor",
			prettyName: "Cursor",
			pageUrl: "hi",
			content: "Cursor is Great!",
		},
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
				content: "I dont know how to use karabiner",
			},
			{
				title: "cursor",
				prettyName: "Cursor",
				pageUrl: "hi",
				content: "Cursor is Great!",
			},
		],
	})

	const editor = useEditor({
		extensions: [StarterKit, Placeholder],
		editorProps: {
			attributes: {
				class:
					"prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none",
			},
		},
		content: local.pageContent.content.get(),
		onUpdate({ editor }) {
			local.pageContent.content.set(editor.getText())
		},
	})
	useEffect(() => {
		if (editor) {
			editor.commands.setContent(local.pageContent.content.get())
		}
	}, [local.pageContent.content.get()])

	return (
		<>
			<div className="text-white flex w-screen">
				<Sidebar
					personalPages={local.pages.get()}
					topicTitle={local.pageContent}
				/>
				<div className="px-4 w-full">
					<div className="flex-between py-4">
						<div className="text-[26px] font-bold">
							{local.pageContent.prettyName.get()}
						</div>
						<div className="flex gap-1">
							<LinkOrder />
						</div>
					</div>
					<EditorContent editor={editor} />
				</div>
			</div>
		</>
	)
})

const extensions = [StarterKit]
