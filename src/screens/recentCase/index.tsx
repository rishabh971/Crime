import React, { useState } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import styles from './styles';
import { CustomHeader } from '../../components/customHeader';
import { goBack } from '../../utils/navigationService';

const caseData = [
  {
    id: '1',
    caseNo: 'C12345',
    crimeType: 'Robbery',
    dateTime: '20-10-2024 14:30',
    location: 'Downtown Street',
  },
  {
    id: '2',
    caseNo: 'B13465',
    crimeType: 'Burglary',
    dateTime: '10-06-2024 09:15',
    location: 'Maple Avenue',
  },
  {
    id: '3',
    caseNo: 'A21348',
    crimeType: 'Assault',
    dateTime: '12-08-2024 18:45',
    location: 'Elm Street',
  },
  {
    id: '4',
    caseNo: 'C62189',
    crimeType: 'Robbery',
    dateTime: '22-01-2025 16:00',
    location: 'Bento Cafe',
  },
  {
    id: '5',
    caseNo: 'B43981',
    crimeType: 'Fraud',
    dateTime: '19-03-2024 11:00',
    location: 'Pine Road',
  },
];

export const RecentCase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(caseData);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredData(caseData);
    } else {
      const filtered = caseData.filter(
        (item) =>
          item.caseNo.toLowerCase().includes(text.toLowerCase()) ||
          item.crimeType.toLowerCase().includes(text.toLowerCase()) ||
          item.location.toLowerCase().includes(text.toLowerCase()) ||
          item.dateTime.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const renderCaseItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.caseNo}>Case No: {item.caseNo}</Text>
      <Text style={styles.crimeType}>Crime Type: {item.crimeType}</Text>
      <Text style={styles.dateTime}>Date & Time: {item.dateTime}</Text>
      <Text style={styles.location}>Location: {item.location}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader screenName="Recent Cases" onLeftIconPress={() => goBack()}/>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        renderItem={renderCaseItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.noResultsText}>No cases found</Text>
        }
      />
    </View>
  );
};
