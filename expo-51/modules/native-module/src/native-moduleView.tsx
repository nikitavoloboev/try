import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { native-moduleViewProps } from './native-module.types';

const NativeView: React.ComponentType<native-moduleViewProps> =
  requireNativeViewManager('native-module');

export default function native-moduleView(props: native-moduleViewProps) {
  return <NativeView {...props} />;
}
