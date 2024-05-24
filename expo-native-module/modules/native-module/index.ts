import {
	NativeModulesProxy,
	EventEmitter,
	Subscription,
} from "expo-modules-core"

// Import the native module. On web, it will be resolved to NativeModule.web.ts
// and on native platforms to NativeModule.ts
import NativeModule from "./src/NativeModule"
import NativeModuleView from "./src/NativeModuleView"
import {
	ChangeEventPayload,
	NativeModuleViewProps,
} from "./src/NativeModule.types"

// Get the native constant value.
export const PI = NativeModule.PI

export function hello(): string {
	return NativeModule.hello()
}

export async function setValueAsync(value: string) {
	return await NativeModule.setValueAsync(value)
}

const emitter = new EventEmitter(
	NativeModule ?? NativeModulesProxy.NativeModule,
)

export function addChangeListener(
	listener: (event: ChangeEventPayload) => void,
): Subscription {
	return emitter.addListener<ChangeEventPayload>("onChange", listener)
}

export { NativeModuleView, NativeModuleViewProps, ChangeEventPayload }
