import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '@/components/shared/header';
import Images from '@/constants/Images';
import { SearchBar } from '@/components/shared/search-bar';


const HomeScreen = () => {
  return (
    <SafeAreaView style={{ paddingTop: 20 }} className='flex-1 bg-background'>
      <StatusBar style='auto' />
      <ScrollView className='flex-1 px-5'>
        {/* Header Section */}
        <Header
          profileImage={Images.profileImagePlaceholder}
          userName='Michel'
          userId='64bhfhfb'
          showNotification
        />
        <SearchBar />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen