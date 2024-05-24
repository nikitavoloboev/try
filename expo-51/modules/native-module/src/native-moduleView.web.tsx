import * as React from 'react';

import { native-moduleViewProps } from './native-module.types';

export default function native-moduleView(props: native-moduleViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
