// import ProductsScreen from '@/components/ui/products';
// import React from 'react';

// const page = () => <ProductsScreen />;

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