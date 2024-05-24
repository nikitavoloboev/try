import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to native-module.web.ts
// and on native platforms to native-module.ts
import native-moduleModule from './src/native-moduleModule';
import native-moduleView from './src/native-moduleView';
import { ChangeEventPayload, native-moduleViewProps } from './src/native-module.types';

// Get the native constant value.
export const PI = native-moduleModule.PI;

export function hello(): string {
  return native-moduleModule.hello();
}

export async function setValueAsync(value: string) {
  return await native-moduleModule.setValueAsync(value);
}

const emitter = new EventEmitter(native-moduleModule ?? NativeModulesProxy.native-module);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { native-moduleView, native-moduleViewProps, ChangeEventPayload };
