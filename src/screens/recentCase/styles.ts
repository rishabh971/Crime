import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
      },
      searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
      },
      card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      caseNo: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      crimeType: {
        fontSize: 14,
        marginTop: 4,
      },
      dateTime: {
        fontSize: 14,
        marginTop: 4,
      },
      location: {
        fontSize: 14,
        marginTop: 4,
      },
      noResultsText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
      },
  });