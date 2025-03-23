import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image, PanResponder } from 'react-native';
import { CustomText } from "../App"; // Import from App.js

const sampleImages = [
  require('../assets/matcha.jpg'),
  require('../assets/phone.jpg'),
  require('../assets/projects.jpg')
];

const UserDayScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPan = useRef(new Animated.ValueXY()).current;
  const cardsStackedAnim = useRef(new Animated.Value(0)).current;

  const cardsPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      cardsPan.setValue({ x: gestureState.dx, y: 0 });
    },
    onPanResponderRelease: () => {
      Animated.timing(cardsPan, {
        toValue: { x: 0, y: 0 },
        duration: 300,
        useNativeDriver: false,
      }).start();
      
      Animated.timing(cardsStackedAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        cardsStackedAnim.setValue(0);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      });
    },
  });

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Monday</CustomText>
      <CustomText style={styles.title}>03.23.2025</CustomText>
      <View style={styles.imageWrapper}>
        {[2, 1, 0].map((offset) => {
          const index = (currentIndex + offset) % sampleImages.length;
          return (
            <Animated.Image
              key={index}
              source={sampleImages[index]}
              {...(offset === 0 ? cardsPanResponder.panHandlers : {})}
              style={[
                styles.image,
                {
                  zIndex: 3 - offset,
                  bottom: cardsStackedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [offset * 20, (offset - 1) * 20],
                  }),
                  opacity: cardsStackedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1 - offset * 0.3, 1 - (offset - 1) * 0.3],
                  }),
                  transform: [
                    { translateX: offset === 0 ? cardsPan.x : 0 },
                    {
                      scale: cardsStackedAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1 - offset * 0.1, 1 - (offset - 1) * 0.1],
                      }),
                    },
                    
                  ],
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  imageWrapper: {
    width: 192,
    height: 256,
    position: 'relative',
  },
  image: {
    width: 192,
    height: 256,
    position: 'absolute',
    borderRadius: 0,
  },
});

export default UserDayScreen;
