import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, Image, View, ViewToken, useWindowDimensions } from "react-native";
import Images from "@/constants/Images";

type SliderItem = {
  id: string;
  src: any;
};

interface AutoSliderProps {
  items?: SliderItem[];
  autoIntervalMs?: number;
  height?: number;
  borderRadius?: number;
}

export const AutoSlider: React.FC<AutoSliderProps> = ({
  items,
  autoIntervalMs = 3500,
  height,
  borderRadius = 12,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const data: SliderItem[] = items && items.length > 0 ? items : [{ id: "placeholder", src: Images.slider }, { id: "placeholder2", src: Images.slider }];

  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList<SliderItem>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index != null) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  useEffect(() => {
    if (data.length <= 1) return; // no auto-scroll if single item
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % data.length;
      listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, autoIntervalMs);
    return () => clearInterval(interval);
  }, [activeIndex, autoIntervalMs, data.length]);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const itemWidth = screenWidth - 40; // matches horizontal padding of parent (px-5 => 20 left + 20 right)
  const sliderHeight = height ?? Math.round(itemWidth * 0.45);

  return (
    <View>
      <Animated.FlatList
        ref={listRef}
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({ item }) => (
          <View style={{ width: itemWidth }} className="mr-3">
            <Image
              source={item.src}
              style={{ width: "100%", height: sliderHeight, borderRadius }}
              resizeMode="cover"
            />
          </View>
        )}
      />

      {/* Dots */}
      <View className="flex-row items-center justify-center mt-3">
        {data.map((_, index) => {
          const isActive = index === activeIndex;
          return (
            <View
              key={index}
              style={{ opacity: isActive ? 1 : 0.4 }}
              className={`mx-1 h-2 rounded-full ${isActive ? "w-5 bg-primary" : "w-2 bg-grey-900"}`}
            />
          );
        })}
      </View>
    </View>
  );
};

export default AutoSlider;


