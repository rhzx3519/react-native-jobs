import { useState } from 'react';
import {
  ScrollView
} from 'react-native';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {
  Nearbyjobs, Popularjobs, Welcome,
} from '../components';

import { SIZES } from '../constants';

import styles from './app.style';

const HomeScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={{...styles.container(insets), flex: 1, padding: SIZES.medium}}>
      <Welcome
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleClick={() => {
          if (searchTerm) {
            navigation.push('Search', { searchTerm })
          }
        }}
      />
      <Popularjobs />
      <Nearbyjobs />
    </ScrollView>
  )
}

export default HomeScreen;