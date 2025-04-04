import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, height } = Dimensions.get('window'); 


type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;


const Welcome:React.FC<WelcomeScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const checkAndRedirect = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
  
        setTimeout(() => {
          if (storedEmail) {
            navigation.replace('BottomTab'); 
          } else {
            navigation.replace('Login'); 
          }
        }, 5000);
      } catch (error) {
        console.error('AsyncStorage error:', error);
        navigation.replace('Login');
      }
    };
  
    checkAndRedirect();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FastImage
        style={styles.image}
        source={{
          uri: 'https://i.pinimg.com/originals/86/c0/25/86c025297e8b557da4522d2b48cd1757.gif',
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    width: width,  
    height: height, 
  },
});

export default Welcome;
