import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { CustomText } from '../App';

const CalendarDay = ({ 
  item, 
  dayWidth, 
  dayHeight, 
  onImagePress 
}) => {
  const sizeStyle = { width: dayWidth, height: dayHeight };

  switch (item.type) {
    case 'blank':
      return <View style={sizeStyle} />;
    
    case 'header':
      return (
        <View style={styles.headerContainer}>
          <CustomText style={styles.headerText}>{item.data}</CustomText>
        </View>
      );
    
    case 'day': {
      const { dateString, day } = item.data;
      const { image } = item.data;

      return (
        <View style={[styles.dayContainer, sizeStyle]}>
          {image ? (
            <TouchableOpacity 
              onPress={() => onImagePress(image.uri, dateString)}
              style={styles.imageWrapper}
            >
              <Image
                source={{ uri: image.uri }}
                style={[styles.image, { width: dayWidth, height: dayHeight }]}
                resizeMode="cover"
              />
              <CustomText style={styles.dayNumber}>{day}</CustomText>
            </TouchableOpacity>
          ) : (
            <View style={styles.emptyDay}>
              <CustomText style={styles.dayNumber}>{day}</CustomText>
            </View>
          )}
        </View>
      );
    }
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  image: {
    borderRadius: 8,
  },
  dayNumber: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  emptyDay: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
  },
});

export default memo(CalendarDay);