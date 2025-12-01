import * as React from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  Text,
  TextLayoutEventData,
} from 'react-native';

import { AutoSizeTextProps } from '../types';

const StepGranularity = (props: AutoSizeTextProps) => {
  const {
    fontSize,
    children,
    style,
    numberOfLines,
    granularity,
    ...rest
  } = props;
  const [currentFont, setCurrentFont] = React.useState(fontSize);
  const handleResizing = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    const { lines } = e.nativeEvent;
    if (lines.length > (numberOfLines as number)) {
      setCurrentFont((currentFont as number) - (granularity as number));
    }
  };

  const handleNumberOfLines = () => {
    if (Platform.OS === 'android') {
      return numberOfLines;
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
      testID='step-granularity'
      numberOfLines={handleNumberOfLines()}
      style={[
        style,
        childStyle,
        {
          fontSize: currentFont,
        },
      ]}
      onTextLayout={handleResizing}
      {...rest}
    >
      {extractedChildren}
    </Text>
  );
};

export default StepGranularity;
