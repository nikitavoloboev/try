import { useAccount, useCoState } from "../main"
import { PersonalLink, TodoItem } from "../schema";

export default function InboxPage() {
	const { me } = useAccount({ root: {inbox: [{}]}});

	// const topic = useCoState(Topic, topicID)

	return <><h1>Inbox</h1>{
		me?.root?.inbox?.map((item) => {
			item instanceof TodoItem ? (
				<TodoItemComponent item={item} />
			) : (
				<PersonalLinkComponent item={item} />
			)
		})
	}</>
}


export function TodoItemComponent({ item }: { item: TodoItem }) {
	return ""
}

export function PersonalLinkComponent({ item }: { item: PersonalLink }) {
	return ""
}