import * as React from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  Text,
  TextLayoutEventData,
} from 'react-native';

import { AutoSizeTextProps } from '../types';

const PresetFontSizes = (props: AutoSizeTextProps) => {
  const { fontSizePresets, children, style, numberOfLines, ...rest } = props;
  const [currentFont, setCurrentFont] = React.useState<number>(
    fontSizePresets![0] as number
  );
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleResizing = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    const { lines } = e.nativeEvent;
    if (lines.length > (numberOfLines as number)) {
      if (currentIndex < fontSizePresets!.length - 1) {
        const updatedIndex = currentIndex + 1;
        setCurrentIndex(updatedIndex);
        setCurrentFont(fontSizePresets![updatedIndex]);
      }
    }
  };

  const handleNumberOfLines = () => {
    if (
      (Platform.OS === 'ios' && currentIndex === fontSizePresets!.length - 1) ||
      Platform.OS === 'android'
    ) {
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
      testID='preset-font-sizes'
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

export default PresetFontSizes;
