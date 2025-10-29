// import ResourcesScreen from '@/components/ui/resources';
// import React from 'react';

// const page = () => <ResourcesScreen />;

// export default page;


import { View, Text } from 'react-native'
import React from 'react'

const starred = () => {
  return (
    <View>
      <Text className='text-red-900' style={{ textTransform: 'uppercase' }}>starred</Text>
    </View>
  )
}

export default starred