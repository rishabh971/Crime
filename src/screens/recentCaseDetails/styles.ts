import { StyleSheet } from 'react-native';

export default StyleSheet.create({
      header: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 15,
      },
      card: {
        margin: 20,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      desc: {
        fontSize: 18,
      },
      imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
      },
      image: {
        width: '48%',
        height: 150,
        borderRadius: 8,
        marginBottom: 10,
      },
  });