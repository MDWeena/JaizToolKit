import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton, Header } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tab';
import { Text } from 'react-native';

export default function LienScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('lien');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleVerify = async () => {
    setIsLoading(true);

    // Simulate API call with delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <BackButton />
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <Header title="View Lien / Restrictions" />
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
        >
          <TabsList className="flex-row w-full">
            <TabsTrigger value="lien" className="flex-1">
              <Text>Lien</Text>
            </TabsTrigger>
            <TabsTrigger value="restrictions" className="flex-1">
              <Text>Restrictions</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="lien">
            <TextField
              className="!mt-5 w-full"
              InputProps={{
                placeholder: 'Account Number',
              }}
            />
            <TextField
              className="!mt-5 w-full"
              InputProps={{
                placeholder: 'Account Name',
                editable: false,
              }}
            />
            <Button
              onPress={handleVerify}
              className="mt-12 !min-w-full"
              disabled={isLoading}
            >
              Search
            </Button>
          </TabsContent>
          <TabsContent value="restrictions">
            <TextField
              className="!mt-5 w-full"
              InputProps={{
                placeholder: 'Account Number',
              }}
            />
            <TextField
              className="!mt-5 w-full"
              InputProps={{
                placeholder: 'Account Name',
                editable: false,
              }}
            />
            <Button
              onPress={handleVerify}
              className="mt-12 !min-w-full"
              disabled={isLoading}
            >
              Search
            </Button>
          </TabsContent>
        </Tabs>
      </ScrollView>
    </SafeAreaView>
  );
}
