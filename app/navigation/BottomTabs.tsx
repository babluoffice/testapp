import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screen/Home';
import Profile from '../screen/Profile';
import {Home as HomeIcon, User as UserIcon} from 'react-native-feather';
import {View} from 'react-native';
import {Fonts} from '../asset/style/typo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootStackParamList';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();



  const handleProfilePress = async (e: any) => {
    e.preventDefault();
    const userEmail = await AsyncStorage.getItem('userEmail');
    if (userEmail) {
      navigation.navigate('BottomTab', {
        screen: 'Profile',
      });
    } else {
      navigation.navigate('Login');
    }
  };



  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 50,
          paddingBottom: 5, 
          position: 'absolute',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: Fonts.Medium,
        },
        tabBarIcon: ({focused, color, size}) => {
          let IconComponent = route.name === 'Home' ? HomeIcon : UserIcon;
          return (
            <View>
              <IconComponent
                width={size}
                height={size}
                stroke={focused ? '#170c34' : 'lightgray'}
              />
            </View>
          );
        },
        tabBarActiveTintColor: '#170c34',
        tabBarInactiveTintColor: 'lightgray',
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" listeners={{
          tabPress: handleProfilePress,
        }} component={Profile} />
    </Tab.Navigator>
  );
}

export default BottomTabs;
