import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions, 
  Modal, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { CustomText } from '../App';
import CalendarDay from './CalendarDay';
import { formatISO } from 'date-fns';
import { transformImagesToCalendarData } from '../CalendarUtils';

// Dummy data - replace with your actual image data
const dummyImages = [
  { 
    creationTime: new Date('2024-03-15').getTime(), 
    id: 'image1', 
    uri: 'https://commons.wikimedia.org/wiki/File:Sunflower_from_Silesia2.jpg' 
  },
  // Add more dummy images
];

const Calendar = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const screenWidth = Dimensions.get('window').width;
  const dayWidth = Math.floor((screenWidth - 2) / 7);
  const dayHeight = Math.floor((dayWidth * 4) / 3);

  const listRef = useRef(null);

  // Convert images to date-indexed object
  const imagesByDateString = dummyImages.reduce(
    (acc, cur) => ({
      ...acc,
      [new Date(cur.creationTime).toISOString().split('T')[0]]: cur,
    }),
    {}
  );

  const calendarData = transformImagesToCalendarData(imagesByDateString);

  const handleImagePress = (uri, dateString) => {
    setSelectedImage({ uri, dateString });
  };

  const renderItem = ({ item }) => (
    <CalendarDay 
      item={item} 
      dayWidth={dayWidth} 
      dayHeight={dayHeight} 
      onImagePress={handleImagePress} 
    />
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={calendarData}
        renderItem={renderItem}
        estimatedItemSize={dayHeight}
        numColumns={7}
        ref={listRef}
        initialScrollIndex={calendarData.length - 1}
        contentContainerStyle={styles.listContainer}
      />

      <Modal 
        visible={!!selectedImage} 
        transparent={true}
        onRequestClose={() => setSelectedImage(null)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            style={styles.modalBackground} 
            onPress={() => setSelectedImage(null)}
          />
          <View style={styles.modalImageContainer}>
            <Image 
              source={{ uri: selectedImage?.uri }} 
              style={styles.modalImage}
              resizeMode="contain"
            />
            <CustomText style={styles.modalDateText}>
              {selectedImage?.dateString}
            </CustomText>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingHorizontal: 600,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalImageContainer: {
    width: '90%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '90%',
    borderRadius: 10,
  },
  modalDateText: {
    marginTop: 10,
    color: 'white',
    fontSize: 16,
  },
});

export default Calendar;