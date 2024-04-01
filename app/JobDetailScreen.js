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
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { COLORS, icons, images, SIZES } from '../constants';
import {
  Company, JobAbout, JobFooter, JobTabs, Specifics
} from '../components';
import useFetch from '../hook/useFetch';
import styles from './app.style';

const tabs = ['About', 'Qualifications', 'Responsibilities'];

const JobDetailScreen = ({ navigation, route }) => {
  const { data, isLoading, error, refetch } = useFetch('job-details', {
    job_id: route.params?.id,
  })

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return <Specifics
          title="Qualifications"
          points={data[0].job_highlights?.Qualifications ?? ['N/A']}
        />
      case "About":
        return <JobAbout
          info={data[0].job_description ?? "No data provided"}
        />
      case "Responsibilities":
        return <Specifics
          title="Responsibilities"
          points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
        />
      default:
        break;
    }
  }

  const insets = useSafeAreaInsets();
  return (
    <>
      <ScrollView
        style={styles.container(insets)}
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
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {displayTabContent()}
          </View>
        )}

      </ScrollView>

      <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'} />
    </>
  )

}

export default JobDetailScreen;