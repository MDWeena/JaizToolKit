import { UnitUserIcon } from '@/assets/images/svgs/ressources';
import { BackButton, Header, ListTile, SearchBar } from '@/components/shared';
import { Text } from '@/components/ui';
import { useSearch } from '@/hooks/useSearch';
import { cn } from '@/lib/utils';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useRef, useState } from 'react';
import { SectionList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const units = [
  { text: 'Alpha' },
  { text: 'Apple' },
  { text: 'Apex' },
  { text: 'Beta' },
  { text: 'Charlie' },
  { text: 'Cobra' },
  { text: 'Cyclone' },
  { text: 'Delta' },
  { text: 'Dynamo' },
  { text: 'Echo' },
  { text: 'Eagle' },
  { text: 'Element' },
  { text: 'Falcon' },
  { text: 'Fusion' },
  { text: 'Gamma' },
  { text: 'Galaxy' },
  { text: 'Giga' },
  { text: 'Helix' },
  { text: 'Horizon' },
  { text: 'Hunter' },
  { text: 'Indigo' },
  { text: 'Icon' },
  { text: 'Ion' },
  { text: 'Jupiter' },
  { text: 'Jaguar' },
  { text: 'Jet' },
  { text: 'Krypton' },
  { text: 'Kilo' },
  { text: 'Knight' },
  { text: 'Lunar' },
  { text: 'Legacy' },
  { text: 'Liberty' },
  { text: 'Matrix' },
  { text: 'Magnet' },
  { text: 'Mercury' },
  { text: 'Nova' },
  { text: 'Nimbus' },
  { text: 'Neon' },
  { text: 'Orion' },
  { text: 'Omega' },
  { text: 'Optimus' },
  { text: 'Phantom' },
  { text: 'Phoenix' },
  { text: 'Prime' },
  { text: 'Quantum' },
  { text: 'Quest' },
  { text: 'Quasar' },
  { text: 'Raptor' },
  { text: 'Raven' },
  { text: 'Rogue' },
  { text: 'Solar' },
  { text: 'Shadow' },
  { text: 'Stellar' },
  { text: 'Titan' },
  { text: 'Thunder' },
  { text: 'Turbo' },
  { text: 'Umbra' },
  { text: 'Unity' },
  { text: 'Ultra' },
  { text: 'Viper' },
  { text: 'Vector' },
  { text: 'Venus' },
  { text: 'Wolf' },
  { text: 'Warden' },
  { text: 'Wave' },
  { text: 'Xeno' },
  { text: 'Xray' },
  { text: 'Xplore' },
  { text: 'Yankee' },
  { text: 'Yield' },
  { text: 'Zephyr' },
  { text: 'Zebra' },
  { text: 'Zenith' },
  { text: 'Zodiac' },
  { text: 'Zero' },
  { text: 'Zest' },
  { text: 'Zing' },
  { text: 'Zoom' },
  { text: 'Zypher' },
  { text: 'Zylo' },
  { text: 'Zyra' },
  { text: 'Zygo' },
  { text: 'Zydeco' },
  { text: 'Zymurgy' },
];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');

export default function UnitDirectoriesScreen() {
  const router = useRouter();
  const sectionListRef = useRef<SectionList>(null);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredDirectories,
    hasQuery,
  } = useSearch(units);

  const sections = useMemo(
    () =>
      alphabet.map((letter) => ({
        title: letter,
        data: filteredDirectories.filter(
          (u) => u.text[0].toUpperCase() === letter
        ),
      })),
    [filteredDirectories]
  );

  const scrollToLetter = (letter: string) => {
    const index = sections.findIndex(
      (s) => s.title === letter && s.data.length > 0
    );
    if (index !== -1 && sectionListRef.current) {
      setActiveLetter(letter);
      sectionListRef.current.scrollToLocation({
        sectionIndex: index,
        itemIndex: 0,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <BackButton />
      <StatusBar style="auto" />

      <View className="px-5 flex-1">
        <Header title="Unit Directories" />
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search..."
        />

        <View className="flex-1 mt-4">
          <SectionList
            ref={sectionListRef}
            sections={sections?.filter((section) =>
              filteredDirectories.find((unit) =>
                unit.text
                  .toLowerCase()
                  .startsWith(section.title.toLocaleLowerCase())
              )
            )}
            keyExtractor={(item, index) => item.text + index}
            initialNumToRender={30}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50,
            }}
            renderSectionHeader={({ section }) =>
              section.data.length > 0 ? (
                <View className="px-2 pb-6">
                  <Text className="font-semibold text-xl !text-background-foreground">
                    {section.title}
                  </Text>

                  <View className="bg-white mt-2 rounded-lg shadow-sm shadow-black/5">
                    {section.data.map((item, index) => (
                      <ListTile
                        onPress={() =>
                          router.push(
                            `/(app)/resources/directories/unit/${item.text}`
                          )
                        }
                        leading={<UnitUserIcon />}
                        key={index}
                        title={item.text}
                        containerClassName="pb-0 pt-4"
                      />
                    ))}
                  </View>
                </View>
              ) : null
            }
            stickySectionHeadersEnabled={false}
            renderItem={({ item }) => <></>}
            onViewableItemsChanged={({ viewableItems }) => {
              const visibleSection = viewableItems.find((i) => i.section)
                ?.section?.title;
              if (visibleSection) setActiveLetter(visibleSection);
            }}
          />

          {/* Alphabet Sidebar */}
          <View className="absolute items-center justify-center -right-[5px] top-12 bottom-12">
            {alphabet.map((letter) => (
              <TouchableOpacity
                key={letter}
                onPress={() => scrollToLetter(letter)}
              >
                <Text
                  className={cn(
                    `py-[2px] text-xs text-darkGray font-bold !text-primary`,
                    activeLetter === letter ? '!text-lg' : ''
                  )}
                >
                  {letter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
