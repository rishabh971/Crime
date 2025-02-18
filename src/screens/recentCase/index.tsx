import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles';
import {CustomHeader} from '../../components/customHeader';
import {goBack, navigate} from '../../utils/navigationService';
import screens from '../../utils/screens';
import axios from 'axios';
import Device from '../../utils/device';
import {showErrorToast, showSuccessToast} from '../../components/toast';

export const RecentCase = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const getRecentCases = () => {
    axios({
      method: 'get',
      url: 'https://api.vedicon.in/get-all-case?page=1&limit=100',
      headers: {
        'Content-Type': 'application/json',
        timeZone: new Date().getTimezoneOffset(),
        appVersion: Device?.getVersion(),
      },
      timeout: 30000,
    })
      .then(response => {
        const res = response?.data;
        console.log('res.data', res);
        if (res?.statusCode == 200) {
          showSuccessToast(res?.message);
          setData(res?.data);
          setFilteredData(res?.data);
        }
      })
      .catch(error => {
        showErrorToast(error?.message);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getRecentCases();
  }, []);

  const handleSearch = text => {
    setSearchQuery(text);

    if (!text) {
      setFilteredData(data); // Reset list if search is empty
      return;
    }

    const filtered = data.filter(item => {
      return (
        (item?.caseNo?.toLowerCase() || '').includes(text.toLowerCase()) ||
        (item?.crimeType?.toLowerCase() || '').includes(text.toLowerCase()) ||
        (item?.city?.toLowerCase() || '').includes(text.toLowerCase()) ||
        (item?.pincode?.toLowerCase() || '').includes(text.toLowerCase())
      );
    });

    console.log('Filtered Cases:', filtered); // Debugging
    setFilteredData(filtered);
  };

  const renderCaseItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigate(screens.RECENTCASEDETAILS, {item})}>
      <Text style={styles.caseNo}>Case ID: {item.caseNo}</Text>
      <Text style={styles.crimeType}>Crime Type: {item.crimeType}</Text>
      <Text style={styles.dateTime}>Date: {item.date}</Text>
      <Text style={styles.dateTime}>Time: {item.time}</Text>
      <Text style={styles.location}>City: {item?.city}</Text>
      <Text style={styles.location}>Pincode: {item?.pincode}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomHeader
        screenName="Recent Cases"
        onLeftIconPress={() => goBack()}
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        renderItem={renderCaseItem}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        ListEmptyComponent={
          <Text style={styles.noResultsText}>No cases found</Text>
        }
      />
    </View>
  );
};
