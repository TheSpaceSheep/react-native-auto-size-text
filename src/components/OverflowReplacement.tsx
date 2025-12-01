import * as React from 'react';
import { NativeSyntheticEvent, Text, TextLayoutEventData } from 'react-native';

import { AutoSizeTextProps } from '../types';

const OverflowReplacement = (props: AutoSizeTextProps) => {
  const {
    fontSize,
    children,
    style,
    numberOfLines,
    overflowReplacement,
    ...rest
  } = props;
  const [currentText, setCurrentText] = React.useState<string>('');

  const handleResizing = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    const { lines } = e.nativeEvent;
    if (lines.length > (numberOfLines as number)) {
      setCurrentText(overflowReplacement as string);
      return;
    }

    setCurrentText(currentText);
  };

  const extractedChildren = React.isValidElement(children) && children.type === Text
    ? children.props.children
    : children;

  const childStyle = React.isValidElement(children) && children.type === Text
    ? children.props.style
    : undefined;

  return (
    <Text
      testID='overflow-replacement'
      style={[
        style,
        childStyle,
        {
          fontSize: fontSize,
        },
      ]}
      {...rest}
      onTextLayout={handleResizing}
    >
      {currentText ? currentText : extractedChildren}
    </Text>
  );
};

export default OverflowReplacement;
