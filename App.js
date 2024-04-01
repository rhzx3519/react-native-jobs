import {
  StyleSheet,
} from 'react-native';
import { useCallback } from 'react';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import { COLORS, icons, images, SIZES } from './constants';
import {
   ScreenHeaderBtn
} from './components';
import HomeScreen from './app/HomeScreen';
import JobDetailScreen from './app/JobDetailScreen';
import SearchScreen from './app/SearchScreen';


const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded] = useFonts({
    DMBold: require('./assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('./assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('./assets/fonts/DMSans-Regular.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded])
  onLayoutRootView()

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{
              headerStyle: { backgroundColor: COLORS.lightWhite },
              headerShadowVisible: false,
              headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
              ),
              headerRight: () => (
                <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
              ),
              headerTitle: ""
            }}
          />

          <Stack.Screen
            name='JobDetail'
            component={JobDetailScreen}
            options={({ navigation }) => ({
              headerStyle: { backgroundColor: COLORS.lightWhite },
              headerShadowVisible: false,
              headerBackVisible: false,
              headerLeft: () => (
                <ScreenHeaderBtn
                  iconUrl={icons.left}
                  dimension="60%"
                  handlePress={() => { navigation.goBack() }}
                />
              ),
              headerRight: () => (
                <ScreenHeaderBtn
                  iconUrl={icons.share}
                  dimension="60%"
                  handlePress={() => { navigation.goBack() }}
                />
              ),
              headerTitle: '',
            })}
          />

          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={({ navigation }) => ({
              headerStyle: { backgroundColor: COLORS.lightWhite },
              headerShadowVisible: false,
              headerLeft: () => (
                <ScreenHeaderBtn
                    iconUrl={icons.left}
                    dimension='60%'
                    handlePress={() => navigation.goBack()}
                />
              ),
              headerTitle: '',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
