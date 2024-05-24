import * as React from "react"

import { NativeModuleViewProps } from "./NativeModule.types"

export default function NativeModuleView(props: NativeModuleViewProps) {
	return (
		<div>
			<span>{props.name}</span>
		</div>
	)
}
