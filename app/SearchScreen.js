import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import axios from 'axios'

import { NearbyJobCard } from '../components'
import { COLORS, icons, SIZES } from '../constants'
import styles from '../styles/search'

const rapidApiKey = process.env.EXPO_PUBLIC_RAPID_API_KEY

const SearchScreen = ({ navigation, route }) => {
  const params = route.params

  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    setSearchLoader(true);
    setSearchResult([])

    try {
      const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/search`,
        headers: {
          "X-RapidAPI-Key": rapidApiKey,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        params: {
          query: params.searchTerm + ', Australia',
          page: page.toString(),
          employment_types: params.activeJobType,
        },
      };

      const response = await axios.request(options);
      setSearchResult(response.data.data);
    } catch (error) {
      setSearchError(error);
      console.log(error);
    } finally {
      setSearchLoader(false);
    }
  };

  const handlePagination = (direction) => {
    if (direction === 'left' && page > 1) {
      setPage(page - 1)
      handleSearch()
    } else if (direction === 'right') {
      setPage(page + 1)
      handleSearch()
    }
  }

  useEffect(() => {
    handleSearch()
  }, [])

  return (
    <FlatList
      data={searchResult}
      renderItem={({ item }) => (
        <NearbyJobCard
          job={item}
          handleNavigate={() => {
            navigation.navigate('JobDetail', { id: job?.job_id })
          }}
        />
      )}
      keyExtractor={(item) => item.job_id}
      contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
      ListHeaderComponent={() => (
        <>
          <View style={styles.container}>
            <Text style={styles.searchTitle}>{params.id}</Text>
            <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
          </View>
          <View style={styles.loaderContainer}>
            {searchLoader ? (
              <ActivityIndicator size='large' color={COLORS.primary} />
            ) : searchError && (
              <Text>Oops something went wrong</Text>
            )}
          </View>
        </>
      )}
      ListFooterComponent={() => (
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.paginationButton}
            onPress={() => handlePagination('left')}
          >
            <Image
              source={icons.chevronLeft}
              style={styles.paginationImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.paginationTextBox}>
            <Text style={styles.paginationText}>{page}</Text>
          </View>
          <TouchableOpacity
            style={styles.paginationButton}
            onPress={() => handlePagination('right')}
          >
            <Image
              source={icons.chevronRight}
              style={styles.paginationImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      )}
    />
  )
}

export default SearchScreen