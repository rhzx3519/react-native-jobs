import { StatusBar } from 'expo-status-bar';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useState, useCallback } from 'react';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import { COLORS, icons, images, SIZES } from './constants';
import {
  Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome,
  Company, JobAbout, JobFooter, JobTabs
} from './components';
import useFetch from './hook/useFetch';


const JobDetailScreen = ({ navigation, route }) => {

  const { data, isLoading, error, refetch } = useFetch('job-details', {
    job_id: route.param?.id,
  })

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {

  }

  const insets = useSafeAreaInsets();
  <ScrollView
    style={{ ...styles.container(insets), backgroundColor: COLORS.lightWhite }}
    showsVerticalScrollIndicator={false}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
  >
    {isLoading ? (
      <ActivityIndicator size='large' color={COLORS.primary} />
    ) : error ? (
      <Text>Something went wrong</Text>
    ) : data.length === 0 ? (
      <Text>No data</Text>
    ) : (
      <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
        <Company
          companyLogo={data[0].employer_logo}
          jobTitle={data[0].job_title}
          companyName={data[0].employer_name}
          location={data[0].job_country}
        />

        <JobTabs

        />
      </View>
    )}

  </ScrollView>
}


const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.container(insets)}>
      <Welcome

      />

      <Popularjobs

      />

      <Nearbyjobs

      />
    </ScrollView>
  )
}

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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: (insets) => ({
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  }),
});
