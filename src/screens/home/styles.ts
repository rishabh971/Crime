import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';

export default StyleSheet.create({
  mainContainer: {
    height: 75,
    width: '90%',
    borderRadius: 50,
    marginVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: colors.lightGreen,
  },
  container: {flex: 1, backgroundColor: '#F9FAFE'},
  recentCaseText: {fontWeight: '500', color: colors.green},
  newCaseContainer: {
    height: 75,
    width: '90%',
    borderRadius: 50,
    paddingHorizontal: 30,
    backgroundColor: colors.lightOrange,
  },
  newCaseText: {fontWeight: '500', color: colors.orange},
  viewCase: {fontWeight: '700', color: '#000000', marginVertical: 30},
  scannerText: {fontWeight: '400', color: '#000000'},
});
