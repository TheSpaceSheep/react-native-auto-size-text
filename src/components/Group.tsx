import * as React from 'react';
import { Text } from 'react-native';

import { AutoSizeTextProps } from '../types';

const Group = (props: AutoSizeTextProps) => {
  const [maxSize] = React.useState<number>(1000);

  const { children, style, ...rest } = props;

  const extractedChildren = React.isValidElement(children) && children.type === Text
    ? children.props.children
    : children;

  const childStyle = React.isValidElement(children) && children.type === Text
    ? children.props.style
    : undefined;

  return (
    <Text
      testID='group'
      adjustsFontSizeToFit
      numberOfLines={maxSize}
      style={[
        style,
        childStyle,
        {
          fontSize: maxSize,
        },
      ]}
      {...rest}
    >
      {extractedChildren}
    </Text>
  );
};

export default Group;
