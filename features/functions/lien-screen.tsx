import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tab';
import { cn } from '@/lib/utils';
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
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <Header title="View Lien / Restrictions" />
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
        >
          <TabsList className="flex-row w-full bg-white">
            <TabsTrigger value="lien" className="flex-1">
              <Text
                className={cn(
                  '!text-primary !font-medium',
                  activeTab === 'lien' ? '!text-primary' : '!text-darkGray'
                )}
              >
                Lien
              </Text>
            </TabsTrigger>
            <TabsTrigger value="freeze" className="flex-1">
              <Text
                className={cn(
                  '!text-primary !font-medium',
                  activeTab === 'freeze' ? '!text-primary' : '!text-darkGray'
                )}
              >
                Freeze
              </Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="lien">
            <TextField
              className="!mt-5 w-full"
              label="Account Number"
              InputProps={{
                placeholder: 'Enter NUBAN',
              }}
            />
            <TextField
              className="!mt-5 w-full"
              label="Account Name"
              InputProps={{
                placeholder: 'MICHAEL GWENDOLYN',
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
          <TabsContent value="freeze">
            <TextField
              className="!mt-5 w-full"
              label="Account Number"
              InputProps={{
                placeholder: 'Enter NUBAN',
              }}
            />
            <TextField
              className="!mt-5 w-full"
              label="Account Name"
              InputProps={{
                placeholder: 'MICHAEL GWENDOLYN',
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
