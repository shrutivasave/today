import React from 'react';
import { CustomText } from "../App"; // Import from App.js
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';

const Today = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomText style={{ fontSize: 18, color: "blue" }}>
        Welcome to User Day Screen!
      </CustomText>
      <TouchableOpacity style={styles.imageContainer}>
        <Icon name="plus" size={50} color="#ccc" />
      </TouchableOpacity>
      <CustomText>journal entry</CustomText>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexShrink:1,
    justifyContent: '',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 10,
    marginTop:150,
    marginBottom: 50,
  },
  imageContainer: {
    width: 192, // 12 * 16px
    height: 256, // 16 * 16px
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    marginBottom:20
  },
});

export default Today;
