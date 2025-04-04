import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { LogOut, Settings } from 'react-native-feather';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'BottomTab'
>;

const Profile = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        if (storedEmail) {
          setEmail(storedEmail);
        } else {
          setEmail('Some Error');
        }
      } catch (error) {
        console.error('Error reading AsyncStorage:', error);
      }
    };
    checkEmail();
  }, []);

  const username = email?.split('@')[0];

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Error', 'Failed to logout.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Hi, {username ? username : 'User'}</Text>
        <Text style={styles.profileEmail}>{email}</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Settings stroke="#170c34" width={20} height={20} />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem]} onPress={handleLogout}>
          <LogOut stroke="red" width={20} height={20} />
          <Text style={[styles.menuText, { color: 'red' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 22,
    textTransform:'capitalize',
    fontWeight: '600',
    color: '#170c34',
  },
  profileEmail: {
    fontSize: 16,
    color: '#888',
  },
  menuContainer: {
    marginTop: responsiveHeight(8),
    paddingHorizontal: 14,
    gap: 14,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: .5,
    marginBottom: 8,
    gap: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#170c34',
    fontWeight: '500',
  },
});
