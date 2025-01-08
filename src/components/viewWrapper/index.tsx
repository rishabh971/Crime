import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';

/**
 * 
 * @param props 
 * @returns 
 */
export const ViewWrapper = (props: Props) => {
  const {
    self,
    row,
    wrap,
    center,
    around,
    evenly,
    between,
    hitSlop,
    children,
    rowReverse,
    customStyle,
    isDisabled = true,
    onPress = () => {},
    activeOpacity = 0.7,
    ...rest
  } = props;

  const common: StyleProp<ViewStyle> = [
    wrap && {flexWrap: 'wrap'},
    self && {alignSelf: 'center'},
    row && {flexDirection: 'row'},
    center && {alignItems: 'center'},
    around && {justifyContent: 'space-around'},
    evenly && {justifyContent: 'space-evenly'},
    between && {justifyContent: 'space-between'},
    rowReverse && {flexDirection: 'row-reverse'},
    props.alignStart && {alignItems: 'flex-start'},
    props.white && {backgroundColor: '#ffff'},
    props.black && {backgroundColor: 'black'},
    props.justifyCenter && {justifyContent: 'center'},
    customStyle,
  ];

  return (
    <TouchableOpacity
      hitSlop={hitSlop}
      {...rest}
      style={common}
      onPress={onPress}
      activeOpacity={activeOpacity}
      disabled={isDisabled}>
      {children}
    </TouchableOpacity>
  );
};
