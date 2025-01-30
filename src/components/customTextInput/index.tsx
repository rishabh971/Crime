import React from 'react';
import {TextInput, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {ViewWrapper} from '../viewWrapper';
import colors from '../../utils/colors';

const CustomTextInput = ({
  iconName,
  iconSize = 24,
  iconColor = '#000',
  placeholder,
  containerStyle,
  tstyle,
  iconNameStyle,
  iconContainerStyle,
  rightIconName,
  rightIconContainerStyle,
  onRightIconPress,
  ...props
}) => {
  return (
    <ViewWrapper style={[styles.container, containerStyle]}>
      {iconName && (
        <ViewWrapper
          center
          justifyCenter
          customStyle={[styles.icon, iconContainerStyle]}>
          <Image source={iconName} style={[iconNameStyle]} />
        </ViewWrapper>
      )}
      <TextInput
        style={[styles.textInput, tstyle]}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        {...props}
      />
       {rightIconName && (
        <TouchableOpacity
          onPress={onRightIconPress}
          style={[styles.rightIcon, rightIconContainerStyle]}>
          <Image source={rightIconName} style={[iconNameStyle]} />
        </TouchableOpacity>
      )}
    </ViewWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  icon: {
    position: 'absolute',
    top: 15,
    left: 10,
    zIndex: 1,
    borderRadius: 10,
    height: 46,
    width: 46,
  },
  rightIcon:{
    position: 'absolute',
    top: 28,
    right: 10,
    height: 30,
    width: 30,
  },
  textInput: {
    backgroundColor: '#fff',
    paddingVertical: 25,
    paddingLeft: 20,
    borderRadius: 10,
    borderColor: colors.green,
    borderWidth: 1,
    fontSize: 17,
    fontWeight: '400',
  },
});

export default CustomTextInput;
