import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFE',
    paddingHorizontal: 30,
  },
  emailContainerStyle: {
    backgroundColor: '#fff',
    paddingVertical: 25,
    paddingLeft: 66,
    borderRadius: 10,
    borderColor: colors.green,
    borderWidth: 1,
    fontSize: 17,
    fontWeight: '400',
  },
  passwordTextStyle: {
    marginBottom: 15,
    marginTop: 30,
    color: '#8489A3',
    fontWeight: '500',
  },
});
