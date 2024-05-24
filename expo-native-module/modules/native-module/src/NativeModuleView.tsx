import { requireNativeViewManager } from "expo-modules-core"
import * as React from "react"

import { NativeModuleViewProps } from "./NativeModule.types"

const NativeView: React.ComponentType<NativeModuleViewProps> =
	requireNativeViewManager("NativeModule")

export default function NativeModuleView(props: NativeModuleViewProps) {
	return <NativeView {...props} />
}
