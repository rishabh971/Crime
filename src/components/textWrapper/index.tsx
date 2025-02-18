import React from 'react';
import { Text, TextProps } from 'react-native';
import { normalize } from '../../utils/dimensions';

type TextComponentProps = TextProps & Props;

/**
 *
 * @param props
 * @returns
 */
export const TextWrapper: React.FC<TextComponentProps> = (props: Props) => {
  const {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    h7,
    h8,
    h9,
    h24,
    h36,
    h22,
    bold,
    italic,
    title,
    style,
    black,
    align,
    ...rest
  } = props;

  const handler = [
    h1 && { fontSize: normalize(40) },
    h36 && { fontSize: normalize(36) },
    h22 && { fontSize: normalize(22) },
    h2 && { fontSize: normalize(30) },
    h3 && { fontSize: normalize(20) },
    h24 && { fontSize: normalize(24) },
    h4 && { fontSize: normalize(18) },
    h5 && { fontSize: normalize(16) },
    h6 && { fontSize: normalize(14) },
    h7 && { fontSize: normalize(12) },
    h8 && { fontSize: normalize(10) },
    h9 && { fontSize: normalize(9) },
    // bold && { fontFamily: FONTS.BOLD },
    italic && { fontStyle: 'italic' },
    black && { color: 'black' },
    align && { textAlign: 'center' },
    // props.semibold && { fontFamily: FONTS.SEMIBOLD },
    // props.medium && { fontFamily: FONTS.MEDIUM },
    // props.regular && { fontFamily: FONTS.REGULAR },
    // props.light && { fontFamily: FONTS.LIGHT },
    props.semibold && { fontWeight: '600' },
    props.medium && { fontWeight: '500' },
    props.regular && { fontWeight: '400' },
    props.light && { fontWeight: '300' },
    style,
  ];

  return (
    <Text
      suppressHighlighting={true}
      allowFontScaling={false}
      style={[handler]}
      {...rest}>
      {title}
    </Text>
  );
};
