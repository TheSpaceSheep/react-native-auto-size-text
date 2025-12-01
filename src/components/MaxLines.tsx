import * as React from 'react';
import { NativeSyntheticEvent, Text, TextLayoutEventData } from 'react-native';

import { AutoSizeTextProps } from '../types';

const MaxLines = (props: AutoSizeTextProps) => {
  const { fontSize, children, style, numberOfLines, ...rest } = props;

  const [currentFont, setCurrentFont] = React.useState<number>(
    fontSize as number
  );
  const handleResizing = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    const { lines } = e.nativeEvent;
    if (lines.length > (numberOfLines as number)) {
      setCurrentFont(currentFont - 1);
    }
  };

  const extractedChildren = React.isValidElement(children) && children.type === Text
    ? children.props.children
    : children;

  const childStyle = React.isValidElement(children) && children.type === Text
    ? children.props.style
    : undefined;

  return (
    <Text
      testID='max-lines'
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit
      style={[
        style,
        childStyle,
        {
          fontSize: currentFont,
        },
      ]}
      {...rest}
      onTextLayout={handleResizing}
    >
      {extractedChildren}
    </Text>
  );
};

export default MaxLines;
