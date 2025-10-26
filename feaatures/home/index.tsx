import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  ListRenderItem,
  ScrollView,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/common/text";
import { Card, Header, SearchBar } from "@/components/ui";
import { categoriesData, slidersData } from "@/constants/data";
import Images from "@/constants/Images";
import { useSearch } from "@/hooks/useSearch";
import {
  AnimatedIndicatorProps,
  Category,
  CategoryCardProps,
  IndicatorData,
  RouteType,
  ScrollEvent,
  Slider,
  SliderItemProps,
} from "@/types";
import { SearchNotFound } from "../../SearchNotFound";

const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width - 35;

const CategoryCard = React.memo<CategoryCardProps>(({ category, onPress }) => (
  < Card
    icon={category.icon}
    text={category.text}
    direction='row'
    onPress={() => onPress(category.route)}
  />
));
CategoryCard.displayName = "CategoryCard";

const SliderItem = React.memo<SliderItemProps>(({ slider }) => (
  <View
    style={{ width: SLIDER_WIDTH }}
    className='h-56 overflow-hidden rounded-lg'
  >
    <ImageBackground
      source={slider.backgroundImage}
      className='justify-end flex-1'
      resizeMode='cover'
    >
      <View className='p-4'>
        <ThemedText type='subtitle' className='mb-2 !text-white'>
          {slider.title}
        </ThemedText>
        <ThemedText className='text-[11px] font-medium !text-white'>
          {slider.subtitle}
        </ThemedText>
      </View>
    </ImageBackground>
  </View>
));
SliderItem.displayName = "SliderItem";

const AnimatedIndicator = React.memo<AnimatedIndicatorProps>(
  ({ animatedValue }) => {
    const animatedStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          animatedValue.value,
          [0, 1],
          ["#D9D9D9", "#D94E05"]
        ),
        width: interpolate(
          animatedValue.value,
          [0, 1],
          [10, 20],
          Extrapolation.CLAMP
        ),
        height: interpolate(
          animatedValue.value,
          [0, 1],
          [10, 10],
          Extrapolation.CLAMP
        ),
      };
    });

    return (
      <Animated.View className='mx-1 rounded-full' style={[animatedStyle]} />
    );
  }
);
AnimatedIndicator.displayName = "AnimatedIndicator";

export function HomeScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList<Slider>>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Create shared values for each slider - must be at component top level
  const indicator0 = useSharedValue(0);
  const indicator1 = useSharedValue(0);
  const indicator2 = useSharedValue(0);
  const animatedValues = useMemo(
    () => [indicator0, indicator1, indicator2],
    [indicator0, indicator1, indicator2]
  );

  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredCategories,
    hasQuery,
    hasResults,
  } = useSearch(categoriesData);

  const handleCategoryPress = useCallback(
    (route: RouteType) => {
      router.push(route as any);
    },
    [router]
  );

  const renderCategoryItem: ListRenderItem<Category> = useCallback(
    ({ item }) => (
      <CategoryCard category={item} onPress={handleCategoryPress} />
    ),
    [handleCategoryPress]
  );

  const renderSliderItem: ListRenderItem<Slider> = useCallback(
    ({ item }) => <SliderItem slider={item} />,
    []
  );

  const renderIndicator: ListRenderItem<IndicatorData> = useCallback(
    ({ index }) => <AnimatedIndicator animatedValue={animatedValues[index]} />,
    [animatedValues]
  );

  const indicatorData = useMemo<IndicatorData[]>(
    () => slidersData.map((_, index) => ({ id: index })),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % slidersData.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Animate indicators
  useEffect(() => {
    animatedValues.forEach((animValue, index) => {
      animValue.value = withTiming(index === currentIndex ? 1 : 0, {
        duration: 100,
      });
    });
  }, [currentIndex, animatedValues]);

  const handleScroll = useCallback(
    (event: ScrollEvent) => {
      const scrollPosition = event.nativeEvent.contentOffset.x;
      const index = Math.round(scrollPosition / SLIDER_WIDTH);
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    },
    [currentIndex]
  );

  return (
    <SafeAreaView style={{ paddingTop: 20 }} className='flex-1 bg-gray-100'>
      <StatusBar style='auto' />
      <ScrollView className='flex-1 px-5'>
        {/* Header Section */}
        <Header
          profileImage={Images.profileImagePlaceholder}
          userName='Michel'
          finacleId='64bhfhfb'
          showNotification
        />

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder='Search'
        />

        <FlatList<Category>
          data={filteredCategories}
          ListHeaderComponent={
            hasQuery && !hasResults ? (
              <></>
            ) : (
              <ThemedText type='subtitle' className='mb-5 !leading-tight'>
                Categories
              </ThemedText>
            )
          }
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={6}
          ListEmptyComponent={
            hasQuery && !hasResults ? (
              <SearchNotFound searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            ) : null
          }
        />

        {hasQuery ? null : (
          <>
            <ThemedText type='subtitle' className='mb-5 !leading-tight'>
              Updates
            </ThemedText>
            <View className='mb-5'>
              <FlatList<Slider>
                ref={flatListRef}
                data={slidersData}
                renderItem={renderSliderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScroll}
                scrollEventThrottle={16}
                getItemLayout={(data, index) => ({
                  length: SLIDER_WIDTH,
                  offset: SLIDER_WIDTH * index,
                  index,
                })}
                removeClippedSubviews={true}
                maxToRenderPerBatch={3}
                windowSize={5}
                initialNumToRender={3}
                contentContainerStyle={{ paddingHorizontal: 0 }}
                className='mb-3'
              />

              <FlatList<IndicatorData>
                data={indicatorData}
                renderItem={renderIndicator}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexGrow: 1,
                }}
                style={{ alignSelf: "center" }}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
