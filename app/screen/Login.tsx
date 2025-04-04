import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import {RootStackParamList} from '../navigation/RootStackParamList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
const Login: React.FC<LoginScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  // Function to validate email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleProceed = async () => {
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await AsyncStorage.setItem('userEmail', email);

      navigation.replace('BottomTab');
    } catch (error) {
      console.error('Failed to save email:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Image
          source={{uri: 'https://rsssc.org/assest/img/Login.jpg'}}
          style={styles.image_}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={value => {
            setEmail(value);
            setError('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={[styles.button]} onPress={handleProceed}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.skipButton]}
          onPress={() => navigation.replace('BottomTab')}>
          <Text style={styles.buttonTextSkip}>Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 46,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#170c34',
    paddingLeft: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 46,
    backgroundColor: '#170c34',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 10,
  },
  skipButton: {
    backgroundColor: '#6c757d',
    position: 'absolute',
    top: responsiveHeight(4),
    right: responsiveWidth(3),
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(0.7),
    borderRadius: 30,
  },
  buttonTextSkip: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image_: {
    height: responsiveHeight(30),
    width: responsiveWidth(70),
    resizeMode: 'contain',
    zIndex:2,
    alignSelf: 'center',
    marginBottom: responsiveHeight(14),
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginTop: -15,
    marginBottom: 10,
    marginLeft: 10,
  },
});
