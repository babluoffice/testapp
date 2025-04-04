import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from './BottomTabs';
import Welcome from '../screen/Welcome';
import Login from '../screen/Login';
import { RootStackParamList } from './RootStackParamList';


const Stack = createStackNavigator<RootStackParamList>();

function AppStack() {
  return (
    <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <Stack.Screen options={{ headerShown: false }} name="BottomTab" component={BottomTab} />
    </Stack.Navigator>
  );
}

export default AppStack