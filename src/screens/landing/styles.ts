import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';
import { normalize } from '../../utils/dimensions';

export default StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
  registerButton: {
    marginTop: 80,
    backgroundColor: colors.green,
    borderWidth: 0,
  },
  registerTitleStyle: {
    color: '#fff',
    fontSize: normalize(22),
    fontWeight: '500',
  },
  orButtonStyle: {
    borderRadius: 50,
    borderWidth: 1,
    width: 50,
    height: 50,
    marginVertical: 30,
    borderColor: '#F3F3F3',
  },
  loginButtonStyle: {
    color: colors.green,
    fontSize: normalize(22),
    fontWeight: '500',
  }
});
